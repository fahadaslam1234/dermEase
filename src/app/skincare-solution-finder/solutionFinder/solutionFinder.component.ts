import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solutionFinder',
  templateUrl: './solutionFinder.component.html',
  styleUrls: ['./solutionFinder.component.css']
})
export class SolutionFinderComponent implements OnInit {

  firstFormGroup!: FormGroup;
  selectedConcerns: string[] = [];

  concerns: string[] = [
    'Skin Texture/Dullness',
    'Wrinkles and Fine Lines',
    'Active Acne Breakout',
    'Help Prevent New Acne',
    'Dry Skin',
    'Dark Spots',
    'Dark Circles & Puffiness Around Eyes',
    'Post-Acne Marks',
    'General Skincare Routine'
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.selectedConcerns.length !== 2) {
      alert('Please select exactly two concerns.');
    } else {
      console.log('Selected Concerns:', this.selectedConcerns);
      // Handle the selected concerns as needed
    }
  }

}
