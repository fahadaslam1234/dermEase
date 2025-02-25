import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoCallComponent } from '../videoCall/videoCall.component';
import { MatDialog } from '@angular/material/dialog';
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
  incomingCall: any = null; // Store details of an incoming call
  currentVideoCall: any = null;
  notifications: { message: string }[] = []; // Notifications array
  user: any = null;
  isDermatologist: boolean = false;
  username: String;
  email: string;
  appointmentForm: FormGroup;
  departments: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];
  doctors: string[] = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. William Johnson'];
  times: string[] = ['3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM'];

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
      patientName: [this.username],
      email: [this.email],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      message: [''],
    });
  }

  ngOnInit() {
    this.getAllDerms();

    this.user = this.authService.getLoggedInUser();
    this.username = this.user.user_name;
    this.getAppointments();
    this.getUpcomingAppointments();
    console.log(this.username);
    this.email = this.user.email;

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

    if (this.user) {
      this.isDermatologist = this.user.role === 'dermatologist'; // Assuming 'role' field in user object
    }
    // Example: Simulate an incoming call after 5 seconds (for testing)
    setTimeout(() => this.simulateIncomingCall(), 5000);
  }

  toggleUserType() {
    this.isDoctor = !this.isDoctor;
  }

  viewDoctorDetails(doctor: any): void {
    this.router.navigate(['/doctor', doctor._id]);
  }

  getAllDerms() {
    this.dcService.getAllDerms().subscribe({
      next: (response) => {
        this.doctors = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAppointments() {
    this.dcService.getAllAppointments(this.username).subscribe({
      next: (response) => {
        this.pendingAppointments = response;
      },
      error: (error) => {
        this.toastService.showToast(error, 'danger');
      },
    });
  }

  getUpcomingAppointments() {
    this.dcService.getAllApprovedAppointments(this.username).subscribe({
      next: (response) => {
        this.upcomingAppointments = response;
      },
      error: (error) => {
        this.toastService.showToast(error, 'danger');
      },
    });
  }

  updateAppointment(id: any, status: any) {
    this.dcService.updateAppointment(id, status).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.showToast(
          `Respected appointment has been ${status} `,
          'success'
        );
        this.getAppointments();
      },
      error: (error) => {
        this.toastService.showToast(error, 'danger');
      },
    });
  }

  onSubmit() {
    this.spinner.show();
    const formValues = this.appointmentForm.value;
    this.dcService.createAppointment(formValues).subscribe({
      next: (response) => {
        console.log(response);
        this.spinner.hide();
        this.toastService.showToast(
          'Your appointment has been pending on the respected dermatologist',
          'success'
        );
        this.appointmentForm.reset();
      },
      error: (error) => {
        this.toastService.showToast(error, 'danger');
      },
    });
  }

  isWithinTime(timeRange: string): boolean {
    const [startTime, endTime] = timeRange.split(' - ');
    const now = new Date();

    // Parse start time
    const start = this.parseTime(startTime, now);
    // Parse end time
    const end = this.parseTime(endTime, now);

    // Check if current time falls within the range
    return now >= start && now <= end;
  }

  parseTime(time: string, referenceDate: Date): Date {
    const [hours, minutes, period] = time.split(/[: ]/);
    const date = new Date(referenceDate);

    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour < 12) {
      hour += 12;
    }
    if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    date.setHours(hour, parseInt(minutes, 10), 0, 0);
    return date;
  }

  simulateIncomingCall() {
    const validAppointment = this.upcomingAppointments.find((appointment) =>
      this.isWithinTime(appointment.time)
    );
    if (validAppointment) {
      this.incomingCall = {
        patientName: validAppointment.patientName,
        time: validAppointment.time,
      };
    } else {
      console.log('No valid appointments for an incoming call at this time.');
    }
  }

  acceptVideoCall() {
    this.currentVideoCall = this.incomingCall;
    this.incomingCall = null;
    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '90%',
      maxWidth: '600px',
      data: { patientName: this.currentVideoCall.patientName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.currentVideoCall = null;
    });
  }

  rejectVideoCall() {
    const timestamp = new Date().toLocaleTimeString();
    this.notifications.push({
      message: `You rejected a call from ${this.incomingCall.patientName} at ${timestamp}`,
    });
    this.incomingCall = null;
  }

  initiateVideoCall(appointment: any) {
    if (this.isWithinTime(appointment.time)) {
      this.currentVideoCall = appointment;
      const dialogRef = this.dialog.open(VideoCallComponent, {
        width: '90%',
        maxWidth: '600px',
        data: { patientName: appointment.patientName },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.currentVideoCall = null;
      });
    } else {
      console.log('Cannot start a video call outside the scheduled time.');
    }
  }

  initiateChat(appointment: any) {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '90%',
      maxWidth: '600px',
      data: { patientName: appointment.patientName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle chat closure
    });
  }

  receiveChatNotification(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.notifications.push({ message: `${message} at ${timestamp}` });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toLogin() {
    this.router.navigate(['login']);
  }
}
