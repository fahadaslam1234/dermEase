// toast.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage | null>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string, type: string = 'info', timeout: number = 3333000) {
    this.toastSubject.next({ message, type });

    if (timeout > 0) {
      setTimeout(() => this.clearToast(), timeout);
    }
  }

  clearToast() {
    this.toastSubject.next(null);
  }
}

export interface ToastMessage {
  message: string;
  type: string;
}
