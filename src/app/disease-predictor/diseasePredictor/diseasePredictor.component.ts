import { Component, OnInit } from '@angular/core';
import { SkinDiseaseService } from 'src/app/services/skinPredictor.service';

@Component({
  selector: 'app-diseasePredictor',
  templateUrl: './diseasePredictor.component.html',
  styleUrls: ['./diseasePredictor.component.css']
})
export class DiseasePredictorComponent implements OnInit {

  selectedFile: File | null = null;
  disease: string | null = null;

  constructor(private service: SkinDiseaseService) { }

  ngOnInit(): void { }
  identifyDisease(): void {
    alert('Redirecting to disease identification page...');
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.service.predictDisease(this.selectedFile).subscribe(
        (response) => {
          this.disease = response.disease;
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    }
  }
}
