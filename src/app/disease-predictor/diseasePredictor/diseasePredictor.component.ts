import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SkinDiseaseService } from 'src/app/services/skinPredictor.service';

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


  constructor(private service: SkinDiseaseService) { }

  ngOnInit(): void { }

  identifyDisease(): void {
    alert('Redirecting to disease identification page...');
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

  onUpload(selectedFile): void {
    this.isDisease = true;
    if (this.selectedFile && this.imagePreview) {
      // Simulate a dummy result
      setTimeout(() => {
        this.disease = 'Psoriasis'; // Replace 'Psoriasis' with any dummy disease name
      }, 100); // Optional delay for effect
    }
  }

  startStepper() {
    this.isIntro = false;
  }


}
