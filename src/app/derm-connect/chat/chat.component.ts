import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VideoCallComponent } from '../videoCall/videoCall.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  doctor: any;

  conversations = [
    { name: 'John Doe', messages: [{ text: 'Hello, how can I help you?', sentByUser: false }, { text: 'I have a question about my skin condition.', sentByUser: true }] },
    { name: 'Jane Smith', messages: [{ text: 'Hi, any updates on my report?', sentByUser: false }] },
    // Add more conversations here
  ];

  selectedConversation: any = this.conversations[0];
  newMessage: string = '';

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
  }


  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedConversation.messages.push({ text: this.newMessage, sentByUser: true });
      this.newMessage = '';
      // Add logic to send the message to the server or other user
    }
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

}
