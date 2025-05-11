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

  selectedSkinTone!: string;
  selectedSkinType!: string;
  selectedSkinBrand!: string;
  selectedSkinCategory!: string;

  recommendation: any;

  skinTones: string[] = [
 "Medium", "Fair", "Porcelain", "Tan", "Light",
    "Olive", "Deep", "Dark", "Ebony"
  ];

  skinTypes: string[] = ['Dry', 'Oily', 'Combination','Normal'];
  brands: string[] = [
    "YOUTH TO THE PEOPLE", "SEPHORA COLLECTION", "PHILOSOPHY", "DRUNK ELEPHANT",
    "TATCHA", "FRESH", "CLINIQUE", "LANCÔME", "OLEHENRIKSEN", "CAUDALIE",
    "SHISEIDO", "KATE SOMERVILLE", "ORIGINS", "KIEHL'S SINCE 1851", "KORRES",
    "INDIE LEE", "BELIF", "LA MER", "BAREMINERALS", "FIRST AID BEAUTY",
    "BOBBI BROWN", "TARTE", "DR. JART+", "BIOSSANCE", "PETER THOMAS ROTH",
    "JOSIE MARAN", "PERRICONE MD", "GLAMGLOW", "AMOREPACIFIC", "LANEIGE",
    "REN CLEAN SKINCARE", "MURAD", "HERBIVORE", "CHARLOTTE TILBURY", "SMASHBOX",
    "ESTÉE LAUDER", "MILK MAKEUP", "DR. DENNIS GROSS SKINCARE", "KOPARI",
    "SATURDAY SKIN", "ALGENIST", "BOSCIA", "SK-II", "GLOW RECIPE",
    "MAKE UP FOR EVER", "EVE LOM", "FARMACY", "JACK BLACK", "SUNDAY RILEY",
    "KOH GEN DO", "CLARINS", "LANCER", "NUFACE", "VOLITION BEAUTY", "DIOR",
    "PEACE OUT", "FARSÁLI", "BECCA", "IT COSMETICS", "GUERLAIN"
  ];
  category:string[] = [
    "Cleanser","Moisturizer","Face Mask","Treatment",

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
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  startStepper() {
    this.isIntro = false;
  }
  selectSkinTone(skinTone: string) {
    this.selectedSkinTone = skinTone;
    this.firstFormGroup.controls['firstCtrl'].setValue(this.selectedSkinTone);
  }
  selectSkinType(skinType: string) {
    this.selectedSkinType = skinType;
    this.secondFormGroup.controls['secondCtrl'].setValue(this.selectedSkinType);
  }
  selectSkinBrand(skinBrand: string) {
    this.selectedSkinBrand = skinBrand;
    this.thirdFormGroup.controls['thirdCtrl'].setValue(this.selectedSkinBrand);
  }
  selectSkinCategory(skinCatgeory: string) {
    this.selectedSkinCategory = skinCatgeory;
    this.fourthFormGroup.controls['fourthCtrl'].setValue(this.selectedSkinCategory);
  }
  showResults() {
    const data = {
      skin_tone: this.selectedSkinTone,
      skin_type: this.selectedSkinType,
      brand:  this.selectedSkinBrand,
      category: this.selectedSkinCategory
    };
    console.log(data)
    this.spinner.show();

    this.service.getRecommendation(data).subscribe(
      response => {
        this.spinner.hide();
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
  goBackToIntro(): void {
  this.isIntro = true;
  this.showStepper = false;
  this.recommendation = null;
}

}
