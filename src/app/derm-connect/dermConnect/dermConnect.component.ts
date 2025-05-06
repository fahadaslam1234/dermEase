import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoCallComponent } from '../videoCall/videoCall.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from 'src/app/services/auth.service';
import { DermConnectService } from 'src/app/services/dermConnect.service';
import { ToastService } from 'src/app/services/toastService';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dermConnect',
  templateUrl: './dermConnect.component.html',
  styleUrls: ['./dermConnect.component.css'],
})
export class DermConnectComponent implements OnInit {
  pendingAppointments = [];
  upcomingAppointments = [];
  isDoctor!: boolean;
  incomingCall: any = null;
  currentVideoCall: MatDialogRef<VideoCallComponent> | null = null;
  notifications: { message: string }[] = [];
  user: any = null;
  isDermatologist: boolean = false;
  username: string = '';
  email: string = '';
  appointmentForm: FormGroup;
  departments: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];
  doctors: any[] = [];
  times: string[] = ['3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM'];
  private ws: WebSocket | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private dcService: DermConnectService,
    private toastService: ToastService,
    private spinner: NgxSpinnerService
  ) {
    this.appointmentForm = this.fb.group({
      patientName: [''],
      email: [''],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      message: [''],
    });
  }

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();

    if (this.user && this.user.user_name) {
      this.username = this.user.user_name;
      this.email = this.user.email;
      this.isDermatologist = this.user.role === 'dermatologist';

      this.setupWebSocket();

      this.getAllDerms();
      this.getAppointments();
      this.getUpcomingAppointments();

      this.appointmentForm.setValue({
        patientName: this.username,
        email: this.email,
        phone: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        message: '',
      });
    }
  }

  setupWebSocket() {
    this.ws = new WebSocket('ws://localhost:8081');

    this.ws.onopen = () => {
      if (this.username) {
        this.ws.send(JSON.stringify({ type: 'register', userId: this.username }));
      }
    };

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (!data) return;

      if (data.type === 'callRequest') {
        this.incomingCall = {
          patientName: data.from,
          roomId: data.roomId
        };
        this.notifications.push({ message: `Incoming video call from ${data.from}` });
      }

      if (data.type === 'callAccepted') {
        const dialogRef = this.dialog.open(VideoCallComponent, {
          width: '90%',
          maxWidth: '600px',
          data: {
            roomId: data.roomId,
            isCaller: true,
            localUser: this.username,
            remoteUser: data.by,
            showRemote: false // initially false; will update via enableRemote
          },
        });

        this.currentVideoCall = dialogRef;
      }

      if (data.type === 'enableRemote') {
        console.log('📩 Received enableRemote signal for preview');
        this.currentVideoCall?.componentInstance?.enableRemotePreviewWithLocal();
      }
    };

    this.ws.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };
  }

  toggleUserType() {
    this.isDoctor = !this.isDoctor;
  }

  viewDoctorDetails(doctor: any): void {
    this.router.navigate(['/doctor', doctor._id]);
  }

  getAllDerms() {
    this.dcService.getAllDerms().subscribe({
      next: (response) => { this.doctors = response; },
      error: (error) => { console.log(error); },
    });
  }

  getAppointments() {
    this.dcService.getAllAppointments(this.username).subscribe({
      next: (response) => { this.pendingAppointments = response; },
      error: (error) => { this.toastService.showToast(error, 'danger'); },
    });
  }

  getUpcomingAppointments() {
    this.dcService.getAllApprovedAppointments(this.username).subscribe({
      next: (response) => { this.upcomingAppointments = response; },
      error: (error) => { this.toastService.showToast(error, 'danger'); },
    });
  }

  onSubmit() {
    this.spinner.show();
    this.dcService.createAppointment(this.appointmentForm.value).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastService.showToast('Your appointment has been submitted.', 'success');
        this.appointmentForm.reset();
      },
      error: (error) => {
        this.spinner.hide();
        this.toastService.showToast(error, 'danger');
      },
    });
  }

  isWithinTime(timeRange: string): boolean {
    const [startTime, endTime] = timeRange.split(' - ');
    const now = new Date();
    const start = this.parseTime(startTime, now);
    const end = this.parseTime(endTime, now);
    return now >= start && now <= end;
  }

  parseTime(time: string, referenceDate: Date): Date {
    const [hours, minutes, period] = time.split(/[: ]/);
    const date = new Date(referenceDate);
    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour < 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    date.setHours(hour, parseInt(minutes, 10), 0, 0);
    return date;
  }

  initiateVideoCall(appointment: any) {
    if (this.isWithinTime(appointment.time)) {
      const roomId = `room-${Date.now()}`;
      this.ws?.send(JSON.stringify({
        type: 'callRequest',
        from: this.username,
        target: appointment.doctor.user_name || appointment.doctor,
        roomId
      }));
    } else {
      this.toastService.showToast('Video call not allowed outside scheduled time.', 'warning');
    }
  }

  acceptVideoCall() {
    if (!this.ws || !this.incomingCall || !this.username) {
      console.warn("❌ Missing WebSocket or call details.");
      return;
    }

    const { roomId, patientName } = this.incomingCall;

    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '90%',
      maxWidth: '600px',
      data: {
        roomId,
        isCaller: false,
        localUser: this.username,
        remoteUser: patientName,
        showRemote: true
      },
    });

    dialogRef.afterOpened().subscribe(() => {
      this.ws!.send(JSON.stringify({
        type: 'acceptCall',
        roomId,
        by: this.username,
        to: patientName
      }));

      setTimeout(() => {
        this.ws!.send(JSON.stringify({
          type: 'enableRemote',
          roomId,
          to: patientName,
          from: this.username
        }));
      }, 500); // slight delay to ensure caller dialog is ready
    });

    this.incomingCall = null;
  }

  rejectVideoCall() {
    this.notifications.push({ message: `Call from ${this.incomingCall.patientName} was rejected.` });
    this.incomingCall = null;
  }

  initiateChat(appointment: any) {
    this.dialog.open(ChatComponent, {
      width: '90%',
      maxWidth: '600px',
      data: { patientName: appointment.patientName },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toLogin() {
    this.router.navigate(['login']);
  }
}
