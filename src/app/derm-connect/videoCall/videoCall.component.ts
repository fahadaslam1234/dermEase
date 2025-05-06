import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-call',
  templateUrl: './videoCall.component.html',
  styleUrls: ['./videoCall.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  ws!: WebSocket;
  peerConnection!: RTCPeerConnection;
  localStream!: MediaStream;
  isCaller!: boolean;
  roomId!: string;
  localUser!: string;
  remoteUser!: string;
  peerReady = false;
  pendingCandidates: RTCIceCandidate[] = [];
  showRemote = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VideoCallComponent>
  ) {
    if (!data?.roomId || !data?.localUser || !data?.remoteUser) {
      console.error("🚫 Invalid dialog data!", data);
      this.dialogRef.close();
      return;
    }

    this.roomId = data.roomId;
    this.isCaller = data.isCaller;
    this.localUser = data.localUser;
    this.remoteUser = data.remoteUser;
    this.showRemote = data.showRemote || false;
    console.log("🎯 Constructor data:", data);
  }

  ngOnInit(): void {
    this.setupWebSocket();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setupMedia();
    this.setupPeerConnection();
    this.peerReady = true;
    this.flushPendingCandidates();

    if (this.isCaller) {
      await this.makeOffer();
    }
  }

  async setupMedia() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideo.nativeElement.srcObject = this.localStream;

    if (this.showRemote && this.remoteVideo) {
      this.remoteVideo.nativeElement.srcObject = this.localStream;
      console.log("🧪 Showing local stream as remote (initial)");
    }
  }

  setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    this.peerConnection.oniceconnectionstatechange = () => {
      console.log("🔄 ICE connection state:", this.peerConnection.iceConnectionState);
    };

    this.peerConnection.ontrack = (event) => {
      if (this.showRemote) {
        console.log("🧪 Skipping ontrack (demo mode)");
        return;
      }

      const stream = event.streams[0];
      if (stream && this.remoteVideo) {
        this.remoteVideo.nativeElement.srcObject = stream;
        console.log("✅ Remote stream attached");
      }
    };

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendMessage('candidate', { candidate: event.candidate });
      }
    };
  }

  async makeOffer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.sendMessage('offer', { offer });
  }

  setupWebSocket() {
    this.ws = new WebSocket('ws://localhost:8081');

    this.ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    this.ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.roomId !== this.roomId) return;

      switch (data.type) {
        case 'offer':
          this.showRemote = true;
          await this.setupMedia();
          this.setupPeerConnection();
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          this.sendMessage('answer', { answer });
          this.peerReady = true;
          this.flushPendingCandidates();
          if (this.remoteVideo && this.localStream) {
            this.remoteVideo.nativeElement.srcObject = this.localStream;
          }
          break;

        case 'answer':
          this.showRemote = true;
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
          this.peerReady = true;
          this.flushPendingCandidates();
          if (this.remoteVideo && this.localStream) {
            this.remoteVideo.nativeElement.srcObject = this.localStream;
          }
          break;

        case 'candidate':
          if (this.peerReady && this.peerConnection.remoteDescription) {
            try {
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            } catch (err) {
              console.error('🚫 ICE error:', err);
            }
          } else {
            this.pendingCandidates.push(data.candidate);
          }
          break;

        case 'leave':
          this.closeCall();
          break;

        case 'enableRemote':
          this.enableRemotePreviewWithLocal();
          break;
      }
    };

    this.ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }

  flushPendingCandidates() {
    this.pendingCandidates.forEach(async candidate => {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("✅ Flushed ICE candidate");
      } catch (err) {
        console.warn("⚠️ Error flushing ICE:", err);
      }
    });
    this.pendingCandidates = [];
  }

  sendMessage(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type,
        roomId: this.roomId,
        from: this.localUser,
        to: this.remoteUser,
        ...payload
      }));
    }
  }

  endCall() {
    this.sendMessage('leave', {});
    this.closeCall();
  }

  closeCall() {
    if (this.peerConnection) this.peerConnection.close();
    if (this.localStream) this.localStream.getTracks().forEach(track => track.stop());
    if (this.ws) this.ws.close();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.endCall();
  }

  enableRemotePreviewWithLocal() {
    this.showRemote = true;
    if (this.remoteVideo && this.localStream) {
      this.remoteVideo.nativeElement.srcObject = this.localStream;
      console.log('🧪 Remote preview updated manually (enableRemotePreviewWithLocal)');
    }
  }
}
