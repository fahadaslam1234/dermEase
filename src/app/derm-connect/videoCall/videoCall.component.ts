import { Component, ElementRef, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as Video from 'twilio-video';

@Component({
  selector: 'app-video-call',
  templateUrl: './videoCall.component.html',
  styleUrls: ['./videoCall.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  room!: Video.Room;
  isMicOn: boolean = true;
  isVideoOn: boolean = true;
  remoteUserLeft: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      roomId: string,
      localUser: string,
      remoteUser: string
    },
    private dialogRef: MatDialogRef<VideoCallComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.joinTwilioRoom();
  }

  joinTwilioRoom() {
    const { roomId, localUser } = this.data;

    this.http.post<any>('http://localhost:3002/token', {
      identity: localUser,
      room: roomId
    }).subscribe(async res => {
      this.room = await Video.connect(res.token, {
        name: roomId,
        audio: true,
        video: { width: 640 }
      });

      // Attach local video
      this.room.localParticipant.videoTracks.forEach(pub => {
        const track = pub.track;
        if (track.kind === 'video') {
          const videoTrack = track as Video.LocalVideoTrack;
          this.localVideo.nativeElement.append(videoTrack.attach());
        }
      });

      // Existing participants
      this.room.participants.forEach(participant => {
        this.subscribeToParticipantTracks(participant);
      });

      // New participant connects
      this.room.on('participantConnected', participant => {
        this.remoteUserLeft = false;
        this.subscribeToParticipantTracks(participant);
      });

      // Participant disconnects
      this.room.on('participantDisconnected', participant => {
        console.log(`${participant.identity} disconnected`);
        this.remoteUserLeft = true;

        participant.tracks.forEach(publication => {
          if (publication.track && publication.track.kind === 'video') {
            publication.track.detach().forEach(el => el.remove());
          }
        });
      });

      // Cleanup
      this.room.on('disconnected', () => {
        this.room.localParticipant.videoTracks.forEach(pub => {
          const track = pub.track;
          if (track.kind === 'video' || track.kind === 'audio') {
            (track as Video.LocalVideoTrack | Video.LocalAudioTrack).stop();
            track.detach().forEach(el => el.remove());
          }
        });
      });
    });
  }

  subscribeToParticipantTracks(participant: Video.RemoteParticipant) {
    participant.tracks.forEach(publication => {
      if (publication.track && publication.track.kind === 'video') {
        const videoTrack = publication.track as Video.VideoTrack;
        const element = videoTrack.attach();
        this.remoteVideo.nativeElement.appendChild(element);

        videoTrack.on('disabled', () => {
          videoTrack.detach().forEach(el => el.remove());
        });

        videoTrack.on('enabled', () => {
          const newElement = videoTrack.attach();
          this.remoteVideo.nativeElement.appendChild(newElement);
        });
      }

      publication.on('subscribed', track => {
        if (track.kind === 'video') {
          const videoTrack = track as Video.VideoTrack;
          const element = videoTrack.attach();
          this.remoteVideo.nativeElement.appendChild(element);

          videoTrack.on('disabled', () => {
            videoTrack.detach().forEach(el => el.remove());
          });

          videoTrack.on('enabled', () => {
            const newElement = videoTrack.attach();
            this.remoteVideo.nativeElement.appendChild(newElement);
          });
        }
      });
    });
  }

  toggleMic() {
    this.room.localParticipant.audioTracks.forEach(publication => {
      const track = publication.track;
      this.isMicOn ? track.disable() : track.enable();
    });
    this.isMicOn = !this.isMicOn;
  }

  toggleVideo() {
    this.room.localParticipant.videoTracks.forEach(publication => {
      const track = publication.track;
      if (this.isVideoOn) {
        track.disable();
        track.detach().forEach(el => el.remove());
      } else {
        const element = track.attach();
        this.localVideo.nativeElement.appendChild(element);
        track.enable();
      }
    });
    this.isVideoOn = !this.isVideoOn;
  }

  endCall() {
    if (this.room) {
      this.room.disconnect();
    }
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.endCall();
  }
}
