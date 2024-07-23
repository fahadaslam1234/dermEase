import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecommendationService } from '../../services/recommendation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../models/productModel';
import { QuickViewProductComponent } from '../../layout/quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-solutionFinder',
  templateUrl: './solutionFinder.component.html',
  styleUrls: ['./solutionFinder.component.css']
})
export class SolutionFinderComponent implements OnInit {

  isIntro = true;
  showStepper = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

  selectedConcerns!: string;
  selectedSkinFeel!: string;
  selectedMakeupArea!: string;
  selectedSunscreenPreference!: string;
  selectedBodyConcern!: string;

  recommendation: any;

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

  skinFeels: string[] = ['Dry', 'Oily', 'Combination', 'Normal/Balanced'];
  makeupAreas: string[] = ['I don\'t wear makeup', 'Eye areas only', 'Everywhere (eyes/face)'];
  sunscreenPreferences: string[] = ['Sunscreen applied separately', 'Sunscreen combined with my moisturizer'];
  bodyConcerns: string[] = [
    'Itchy Skin', 'Eczema', 'Psoriasis', 'Cracked, Chafed Skin',
    'Diabetic Skin', 'Rough & Bumpy Skin', 'Dry Skin', 'Very Dry Skin',
    'Body Acne*', 'General Bodycare', 'Prefer Not to Answer'
  ];

  constructor(private _formBuilder: FormBuilder,private service : RecommendationService, 
    private spinner: NgxSpinnerService,private dialog : MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  startStepper() {
    this.isIntro = false;
  }

  selectConcern(concern: string) {
    // Clear the previous selection
    this.selectedConcerns = concern;
    // Update the form control value
    this.firstFormGroup.controls['firstCtrl'].setValue(concern);
  }
  selectSkinFeel(skinFeel: string) {
    this.selectedSkinFeel = skinFeel;
    this.secondFormGroup.controls['secondCtrl'].setValue(this.selectedSkinFeel);
  }

  selectMakeupArea(makeupArea: string) {
    this.selectedMakeupArea = makeupArea;
    this.thirdFormGroup.controls['thirdCtrl'].setValue(this.selectedMakeupArea);
  }

  selectSunscreenPreference(sunscreenPreference: string) {
    this.selectedSunscreenPreference = sunscreenPreference;
    this.fourthFormGroup.controls['fourthCtrl'].setValue(this.selectedSunscreenPreference);
  }

  selectBodyConcern(bodyConcern: string) {
    this.selectedBodyConcern = bodyConcern;
    this.fifthFormGroup.controls['fifthCtrl'].setValue(this.selectedBodyConcern);
  }

  showResults() {
    this.spinner.show();
    const data = {
      condition: this.selectedConcerns,
      skin_feel: this.selectedSkinFeel, 
      makeup_area: this.selectedMakeupArea, 
      sunscreen_preference: this.selectedSunscreenPreference, 
      body_concern:  this.selectedBodyConcern, 
    };

    this.service.getRecommendation(data).subscribe(
      response => {
        this.spinner.hide();
        console.log(response);
        this.recommendation = response;
        this.showStepper = false;
        console.log('Recommendation:', this.recommendation);
      },
      error => {
        console.error('Error fetching recommendation:', error);
      }
    );
  }

  quickView(product: Product) {
    const dialogRef = this.dialog.open(QuickViewProductComponent, {
      width: '80%',
      maxWidth: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addToCart(product: Product) {
    console.log('Add to Cart:', product);
  }
}
