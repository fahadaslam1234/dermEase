import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoCallComponent } from '../videoCall/videoCall.component';
import { ChatComponent } from '../chat/chat.component';
import { MatDialog } from '@angular/material/dialog';
import { DermConnectService } from 'src/app/services/dermConnect.service';

@Component({
  selector: 'app-doctorDetails',
  templateUrl: './doctorDetails.component.html',
  styleUrls: ['./doctorDetails.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: any;
  doctors:[];

  constructor(private route: ActivatedRoute, private dialog : MatDialog,  private dcService : DermConnectService) {}

  getAllDerms(){
    this.dcService.getAllDerms().subscribe({
       next:(response)=>{
           this.doctors = response;
           console.log("doctors",this.doctors)
       },error:(error)=>{
           console.log(error);
       }
    });
   }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('_id')!;
    // this.doctor = this.doctors.find(doctor => doctor._id === id);
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
