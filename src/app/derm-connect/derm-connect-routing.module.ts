import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DermConnectComponent } from './dermConnect/dermConnect.component';
import { DoctorDetailsComponent } from './doctorDetails/doctorDetails.component';
import { VideoCallComponent } from './videoCall/videoCall.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: 'dermConnect',
    component:DermConnectComponent
  },
  {
    path: 'doctor/:id',  // Dynamic route for doctor details
    component: DoctorDetailsComponent
  },

  { path: 'video-call/:id', component: VideoCallComponent },
  { path: 'chat/:id', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DermConnectRoutingModule { }
