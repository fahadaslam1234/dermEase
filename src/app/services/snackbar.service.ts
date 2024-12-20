import { Component, Injectable, OnInit } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
  @Injectable({
    providedIn: 'root'
  })

  export class SnackBarService{

    constructor(private _snackBar: MatSnackBar){}
    
  openSnackBar(message:string, action:string, horizontalPosition:MatSnackBarHorizontalPosition,verticalPosition:MatSnackBarVerticalPosition) {
    const config = new MatSnackBarConfig();
    // config.duration = 5000; // 5 seconds
    // config.panelClass = ['custom-snackbar'];

    this._snackBar.open(message, action, {
      ...config,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
}
  
}
  