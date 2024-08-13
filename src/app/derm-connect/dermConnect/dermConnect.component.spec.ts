/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DermConnectComponent } from './dermConnect.component';

describe('DermConnectComponent', () => {
  let component: DermConnectComponent;
  let fixture: ComponentFixture<DermConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DermConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DermConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
