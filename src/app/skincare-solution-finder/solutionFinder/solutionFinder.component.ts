import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecommendationService } from '../../services/recommendation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../models/productModel';
import { QuickViewProductComponent } from '../../layout/quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toastService';
import { CommonService } from 'src/app/services/common.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-solutionFinder',
  templateUrl: './solutionFinder.component.html',
  styleUrls: ['./solutionFinder.component.css']
})
export class SolutionFinderComponent implements OnInit {


  cartVisible = false;
  cartItems: any[] = [];
  products: Product[] = [];
  filteredProducts = [...this.products];

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
    "Textured Skin",
    "Wrinkles & Fine Lines",
    "Acne Prone Skin",
    "Dark Spots",
    "Itchy Skin",
    "Psoriasis",
    "Sun Damage",
    "Enlarged Pores",
    "Rough & Bumpy Skin",
    "Body Zits",
    "Dullness"
  ];

  skinFeels: string[] = ['Dry', 'Oily', 'Combination'];
  ingredientPreferences: string[] = [
  "Natural",
  "Organic",
  "Hypoallergenic",
  "Vegan",
  "Fragrance Free"
  ];

  constructor(private _formBuilder: FormBuilder,private service : RecommendationService,
    private spinner: NgxSpinnerService,private dialog : MatDialog, private toastService : ToastService,
  private commonService: CommonService,private overlayService: OverlayService,private cartService: CartService) {}

  ngOnInit() {
    this.subscribeToCartUpdates();

    setTimeout(() => {
      this.cartService.syncCartWithProducts(this.products);
    }, 2000);


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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

  selectBodyConcern(bodyConcern: string) {
    this.selectedBodyConcern = bodyConcern;
    this.fifthFormGroup.controls['fifthCtrl'].setValue(this.selectedBodyConcern);
  }

  showResults() {
    this.spinner.show();
    const data = {
      skin_conditions: this.selectedConcerns,
      skin_feel: this.selectedSkinFeel,
      ingredient_preferences:  this.selectedBodyConcern,
    };

    this.service.getRecommendation(data).subscribe(
      response => {
        this.spinner.hide();
        const baseUrl = this.commonService.imageUrl;
        if (response?.data?.matchingProducts?.length > 0) {
          response.data.matchingProducts.forEach(product => {
            // Prepend the base URL and replace '\\' with '/'
            product.product_image = (baseUrl + product.product_image).replace(/\\/g, '/');
          });
        }
        this.recommendation = response;
        console.log(this.recommendation);
        this.showStepper = false;
        this.toastService.showToast("Here's your recommended product.", 'success');
      },
      error => {
        this.toastService.showToast('Something went wrong. Please try again.', 'error');
      }
    );
    this.spinner.hide();
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
    this.cartService.addToCart(product);
    this.cartVisible = true; // Show the cart sidebar when an item is added
    this.subscribeToCartUpdates();
    this.overlayService.openCart();
  }

  subscribeToCartUpdates() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.cartVisible = items.length > 0; // Automatically show cart when items are added
    });
  }
}
