import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FAQsComponent implements OnInit {

  faqs = [
    {
      question: 'Where are you located?',
      answer: 'We have 5 branches: Saddar Rwp, Golra Mor Rwp, PWD Isb, F10 Isb, & Wah Cantt.',
      expanded: false
    },
    {
      question: 'How can I book an appointment?',
      answer: 'You can book an appointment by calling us or through our website.',
      expanded: false
    },
    {
      question: 'What are Dr. Amna’s consultation hours?',
      answer: 'Dr. Amna is available from 9 AM to 5 PM, Monday to Friday.',
      expanded: false
    },
    {
      question: 'What are your opening times?',
      answer: 'We are open from 9 AM to 9 PM, Monday to Saturday.',
      expanded: false
    },
    {
      question: 'Do you offer online consultation?',
      answer: 'Yes, we offer online consultations through our website.',
      expanded: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
