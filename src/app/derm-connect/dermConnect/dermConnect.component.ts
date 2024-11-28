import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoCallComponent } from '../videoCall/videoCall.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dermConnect',
  templateUrl: './dermConnect.component.html',
  styleUrls: ['./dermConnect.component.css']
})
export class DermConnectComponent implements OnInit {

  doctorsDetails = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Dermatology',
      availability: 'Available Now',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Experienced dermatologist with over 15 years of practice.'
    },
    {
      id:2,
      name: 'Dr. Jane Smith',
      specialty: 'Cosmetic Dermatology',
      availability: 'Available Tomorrow',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Specialist in cosmetic dermatology and skin rejuvenation.'
    },
    {
      id:3,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatric Dermatology',
      availability: 'Available in 2 Days',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Focused on pediatric dermatology with a gentle touch.'
    },
    {
      id:4,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatric Dermatology',
      availability: 'Available in 2 Days',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Focused on pediatric dermatology with a gentle touch.'
    },
  ];

  appointments = [
    { patientName: 'John Doe', date: new Date(), time: '10:00 AM' },
    // Add more appointments here
  ];


  isDoctor!: boolean;
  incomingCall: any = null; // Store details of an incoming call
  currentVideoCall: any = null;
  notifications: { message: string }[] = []; // Notifications array
  user: any = null;
  isDermatologist: boolean = false;

  appointmentForm: FormGroup;
  departments: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];
  doctors: string[] = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. William Johnson'];
  times: string[] = ['3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM'];

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService,private dialog: MatDialog) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit() {

    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.isDermatologist = this.user.role === 'dermatologist';  // Assuming 'role' field in user object
    }
    // Example: Simulate an incoming call after 5 seconds (for testing)
    setTimeout(() => this.simulateIncomingCall(), 5000);
  }

  toggleUserType() {
    this.isDoctor = !this.isDoctor;
  }

  viewDoctorDetails(doctor: any): void {
    this.router.navigate(['/doctor', doctor.id]);
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formValues = this.appointmentForm.value;
      console.log('Appointment booked successfully', formValues);
      // Add logic here to send the form data to a backend API
    } else {
      console.log('Form is not valid');
    }
  }

  // For Doctors

  // Simulate an incoming video call (this would come from a signaling server in a real app)
  simulateIncomingCall() {
    this.incomingCall = { patientName: 'Jane Doe', time: '11:00 AM' };
  }

  acceptVideoCall() {
    this.currentVideoCall = this.incomingCall;
    this.incomingCall = null;
    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '90%',
      maxWidth: '600px',
      data: { patientName: this.currentVideoCall.patientName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentVideoCall = null;
    });
  }

  rejectVideoCall() {
    this.notifications.push({ message: `You rejected a call from ${this.incomingCall.patientName}` });
    this.incomingCall = null;
  }

  initiateVideoCall(appointment: any) {
    this.currentVideoCall = appointment;
    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '90%',
      maxWidth: '600px',
      data: { patientName: appointment.patientName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentVideoCall = null;
    });
  }

  initiateChat(appointment: any) {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '90%',
      maxWidth: '600px',
      data: { patientName: appointment.patientName }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle chat closure
    });
  }

  receiveChatNotification(message: string) {
    this.notifications.push({ message });
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
