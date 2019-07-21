import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookOrdersComponent } from './cook-orders.component';

describe('CookOrdersComponent', () => {
  let component: CookOrdersComponent;
  let fixture: ComponentFixture<CookOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
