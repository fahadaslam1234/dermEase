// src/app/overlay.service.ts
import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { AddToCartComponent } from '../layout/addToCart/addToCart.component';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  public openCart(): void {
    const positionStrategy = this.overlay.position().global().right().top();
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const cartPortal = new ComponentPortal(AddToCartComponent);
    this.overlayRef.attach(cartPortal);

    this.overlayRef.backdropClick().subscribe(() => this.closeCart());
  }

  public closeCart(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
