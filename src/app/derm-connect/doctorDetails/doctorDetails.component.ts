import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoCallComponent } from '../videoCall/videoCall.component';
import { ChatComponent } from '../chat/chat.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctorDetails',
  templateUrl: './doctorDetails.component.html',
  styleUrls: ['./doctorDetails.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: any;

  doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Dermatology',
      availability: 'Available Now',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Experienced dermatologist with over 15 years of practice.',
      education: 'MBBS (University of Wyoming). M.D. of Medicine (Netherland Medical College).',
      contact: '+1 (700) 230-0035',
      email: 'example@gmail.com',
    },
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Dermatology',
      availability: 'Available Now',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Experienced dermatologist with over 15 years of practice.',
      education: 'MBBS (University of Wyoming). M.D. of Medicine (Netherland Medical College).',
      contact: '+1 (700) 230-0035',
      email: 'example@gmail.com',
    },
    {
      id: 2,
      name: 'Dr. John Doe',
      specialty: 'Dermatology',
      availability: 'Available Now',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Experienced dermatologist with over 15 years of practice.',
      education: 'MBBS (University of Wyoming). M.D. of Medicine (Netherland Medical College).',
      contact: '+1 (700) 230-0035',
      email: 'example@gmail.com',
    },    {
      id: 3,
      name: 'Dr. John Doe',
      specialty: 'Dermatology',
      availability: 'Available Now',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Experienced dermatologist with over 15 years of practice.',
      education: 'MBBS (University of Wyoming). M.D. of Medicine (Netherland Medical College).',
      contact: '+1 (700) 230-0035',
      email: 'example@gmail.com',
    },
    {
      id: 4,
      name: 'Dr. John Doe',
      specialty: 'Dermatology',
      availability: 'Available Now',
      image: '../../../assets/images/doctor.jpg',
      bio: 'Experienced dermatologist with over 15 years of practice.',
      education: 'MBBS (University of Wyoming). M.D. of Medicine (Netherland Medical College).',
      contact: '+1 (700) 230-0035',
      email: 'example@gmail.com',
    },
    // More doctor objects here
  ];

  constructor(private route: ActivatedRoute, private dialog : MatDialog) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.doctor = this.doctors.find(doctor => doctor.id === id);
  }

  startVideoCall() {
    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '90%', // Adjust the width as needed
      maxWidth: '600px', // Maximum width for larger screens
      data: { doctor: this.doctor }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Video call dialog was closed');
    });
  }

  startChat() {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '90%', // Adjust the width as needed
      maxWidth: '600px', // Maximum width for larger screens
      data: { doctor: this.doctor }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Chat dialog was closed');
    });
  }

}
