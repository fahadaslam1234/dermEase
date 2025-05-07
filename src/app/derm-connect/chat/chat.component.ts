import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  localUser: string = '';
  remoteUser: string = '';
  ws!: WebSocket;
  newMessage: string = '';
  attachmentFile?: File;
  messages: { text?: string, sentByUser: boolean, attachment?: string, attachmentName?: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.localUser = this.data.localUser;
    this.remoteUser = this.data.remoteUser;
    this.connectWebSocket();
  }

  connectWebSocket(): void {
    this.ws = new WebSocket('ws://localhost:8081');

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({ type: 'register', userId: this.localUser }));
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chat') {
        const isSentByMe = data.from === this.localUser;
        const isChatBetweenUsers =
          (data.from === this.localUser && data.to === this.remoteUser) ||
          (data.from === this.remoteUser && data.to === this.localUser);

        if (isChatBetweenUsers) {
          // ✅ Construct URL to GET from uploads folder
          const fileUrl = data.attachment
            ? `${this.common.imageUrl}uploads/${data.attachment}`
            : undefined;

          this.messages.push({
            text: data.message,
            sentByUser: isSentByMe,
            attachment: fileUrl,
            attachmentName: data.attachmentName
          });
        }
      }
    };
  }

  async sendMessage(): Promise<void> {
    if (!this.newMessage.trim() && !this.attachmentFile) return;

    let uploadedFileName: string | undefined;

    if (this.attachmentFile) {
      const formData = new FormData();
      formData.append('file', this.attachmentFile);

      // ✅ Upload to server (POST request)
      const response: any = await this.http.post(`${this.common.API_URL}upload`, formData).toPromise();
      uploadedFileName = response.filename;
    }

    const msgPayload = {
      type: 'chat',
      from: this.localUser,
      to: this.remoteUser,
      message: this.newMessage || '',
      attachment: uploadedFileName,
      attachmentName: this.attachmentFile?.name
    };

    this.ws.send(JSON.stringify(msgPayload));

    // ✅ Also show immediately for sender
    this.messages.push({
      text: this.newMessage || '',
      sentByUser: true,
      attachment: uploadedFileName ? `${this.common.imageUrl}uploads/${uploadedFileName}` : undefined,
      attachmentName: this.attachmentFile?.name
    });

    this.newMessage = '';
    this.attachmentFile = undefined;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.attachmentFile = file;
  }

  closeDialog(): void {
    if (this.ws) this.ws.close();
    this.dialogRef.close();
  }
}
