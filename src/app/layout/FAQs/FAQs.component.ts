import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FAQsComponent implements OnInit {

  faqs = [
    {
      question: 'How do I upload a skin image for analysis?',
      answer: 'To upload a skin image, simply log in to your DermEase account and click on the "Upload Image" button. Follow the prompts to take or select a photo of the affected area.',
      expanded: false
    },
    
    {
      question: 'How accurate are the diagnoses provided by DermEase?',
      answer: 'DermEase uses advanced AI algorithms to analyze images and provide precise diagnoses. However, it is always recommended to consult with a dermatologist for a confirmed diagnosis.',
      expanded: false
    },
    {
      question: 'Can I consult with a dermatologist through DermEase?',
      answer: 'Yes, DermEase offers online consultations with dermatologists via chat or video call. You can book an appointment through our DermConnect.',
      expanded: false
    },
    {
      question: 'What types of skin conditions can DermEase diagnose?',
      answer: 'DermEase can diagnose a wide range of common skin conditions, including acne, eczema, psoriasis, rosacea, and more.',
      expanded: false
    },
    {
      question: 'How do I receive skincare product recommendations?',
      answer: 'You can use our Skincare Solution Finder by completing an interactive quiz. The system will analyze your responses and provide personalized product recommendations.',
      expanded: false
    },
    {
      question: 'How do I purchase skincare products on DermEase?',
      answer: 'Browse our E-Skincare Store, add products to your cart, and proceed to checkout. We support various payment methods, including easypaisa, stripe and cash on delivery.',
      expanded: false
    },
    {
      question: 'Do you offer prescriptions for diagnosed conditions?',
      answer: 'Yes, during online consultations, dermatologists can provide prescriptions which you can download directly from the chat after the session.',
      expanded: false
    },
    {
      question: 'What should I do if I have a reaction to a recommended product?',
      answer: 'If you experience any adverse reactions, stop using the product immediately and consult with a dermatologist.',
      expanded: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
