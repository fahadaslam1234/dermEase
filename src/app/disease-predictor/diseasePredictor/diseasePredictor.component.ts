import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { SkinDiseaseService } from 'src/app/services/diseasePredictor.service';

@Component({
  selector: 'app-diseasePredictor',
  templateUrl: './diseasePredictor.component.html',
  styleUrls: ['./diseasePredictor.component.css']
})
export class DiseasePredictorComponent implements OnInit {

  selectedFile: File | null = null;
  disease: string | null = null;
  isIntro = true;
  showStepper = true;
  firstFormGroup!: FormGroup;
  isDisease = false;
  imagePreview: string | null = null;
  errorMessage: string | null = null;
  userId: string | null = null; // Store logged-in user ID
  pastPredictions: any[] = []; // ✅ Fixed initialization
  user: any = null;

  constructor(private service: SkinDiseaseService, private authService: AuthService,private commonService: CommonService,
  private spinner: NgxSpinnerService) {
  }
  imageUrl = this.commonService.imageUrl;

  ngOnInit(): void {
    // ✅ Ensure user data is available before fetching predictions
    this.user = this.authService.getLoggedInUser();
    if (this.user && this.user.user_name) {
      this.userId = this.user.user_name;
      this.getAllPredictions();
    } else {
      console.error("User not found or not logged in.");
      this.userId = "anonymous"; // Fallback to default anonymous user
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpload(): void {
    this.spinner.show();
    if (!this.selectedFile) {
      alert("Please select an image first.");
      return;
    }
    this.isDisease = false;
    this.errorMessage = null;

    // ✅ Ensure userId is sent with FormData
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userId', this.userId || "anonymous");

    this.service.uploadImage(formData).subscribe({
      next: (response) => {
        this.isDisease = true;
        this.disease = response.predictedDisease;
        this.spinner.hide()
        this.getAllPredictions(); // ✅ Refresh past predictions
      },
      error: (error) => {
        this.errorMessage = "Failed to identify the disease. Try again.";
        this.spinner.hide();
      }
    });
  }

  getAllPredictions(): void {
    if (!this.userId) {
      console.error("User ID is null, cannot fetch predictions.");
      return;
    }

    console.log("Fetching past predictions for user:", this.userId);
    this.service.getAllPredictions(this.userId).subscribe({
      next: (response) => {
        this.pastPredictions = response;
        console.log(response);
      },
      error: (error) => {
        console.error("Error fetching past predictions:", error);
      }
    });
  }

  getFullImageUrl(imagePath: string): string {
    // Replace backslashes with forward slashes
    const normalizedPath = imagePath.replace(/\\/g, '/'); // Global replacement of '\'
    const fullImageUrl = this.imageUrl + `${normalizedPath}`;
    console.log(fullImageUrl);
    return fullImageUrl;
  }


  startStepper(): void {
    this.isIntro = false;
  }
}
