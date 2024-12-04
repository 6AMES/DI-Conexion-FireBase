import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfreceEmpComponent } from './ofrece-emp.component';

describe('OfreceEmpComponent', () => {
  let component: OfreceEmpComponent;
  let fixture: ComponentFixture<OfreceEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfreceEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfreceEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
