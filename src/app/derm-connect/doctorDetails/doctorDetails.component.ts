import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DermConnectService } from 'src/app/services/dermConnect.service';
import { VideoCallComponent } from '../videoCall/videoCall.component';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctorDetails',
  templateUrl: './doctorDetails.component.html',
  styleUrls: ['./doctorDetails.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: any;
  doctors: any[] = [];
  loggedInUser: any;
  private ws!: WebSocket;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dcService: DermConnectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getAllDerms(id);
    }
    this.setupWebSocket();
  }

  getAllDerms(id: string) {
    this.dcService.getAllDerms().subscribe({
      next: (response: any[]) => {
        this.doctors = response;
        this.doctor = this.doctors.find(doc => doc._id === id);
        console.log('Selected doctor:', this.doctor);
      },
      error: (error) => {
        console.log('Error fetching doctors:', error);
      }
    });
  }

  setupWebSocket() {
    this.ws = new WebSocket('ws://localhost:8081');

    this.ws.onopen = () => {
      if (this.loggedInUser?.user_name) {
        this.ws.send(JSON.stringify({ type: 'register', userId: this.loggedInUser.user_name }));
        console.log('🔗 WebSocket registered as:', this.loggedInUser.user_name);
      }
    };

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === 'acceptCall') {
        // The doctor accepted the call, no need to reopen dialog since already opened for patient
        console.log(`✅ Doctor ${data.by} accepted call`);
      }
    };

    this.ws.onerror = (err) => {
      console.error('❌ WebSocket error in DoctorDetailsComponent:', err);
    };
  }

  openVideoCall() {
    const roomId = `room-${Date.now()}`;

    // Open video call dialog immediately for patient
    this.dialog.open(VideoCallComponent, {
      width: '90%',
      maxWidth: '600px',
      data: {
        roomId,
        isCaller: true,
        localUser: this.loggedInUser?.user_name,
        remoteUser: this.doctor?.user_name,
        showRemote : false
      },
    });

    // Notify doctor about the call request
    this.ws?.send(JSON.stringify({
      type: 'callRequest',
      from: this.loggedInUser?.user_name || 'Unknown',
      target: this.doctor?.user_name || 'Doctor',
      roomId
    }));
  }

  openChat() {
    this.dialog.open(ChatComponent, {
      width: '600px',
      maxWidth: '600px',
      data: {
        localUser: this.loggedInUser?.user_name,
        remoteUser: this.doctor?.user_name
      }
    });
  }
}
