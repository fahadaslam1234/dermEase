/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarosuelComponent } from './carosuel.component';

describe('CarosuelComponent', () => {
  let component: CarosuelComponent;
  let fixture: ComponentFixture<CarosuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarosuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarosuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
