import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-videoCall',
  templateUrl: './videoCall.component.html',
  styleUrls: ['./videoCall.component.css']
})
export class VideoCallComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VideoCallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
