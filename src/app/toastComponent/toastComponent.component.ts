import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from '../services/toastService';

@Component({
  selector: 'app-toastComponent',
  templateUrl: './toastComponent.component.html',
  styleUrls: ['./toastComponent.component.css']
})
export class ToastComponentComponent implements OnInit {

  toast: ToastMessage | null = null;
  showToastClass = false; // Add property to track whether to show backdrop filter

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe(toast => {
      this.toast = toast;
      this.showToastClass = !!toast; // Update the property when toast is shown/hidden
      if (this.showToastClass) {
        document.body.classList.add('show-toast');
      } else {
        document.body.classList.remove('show-toast');
      }
    });
  }
}
