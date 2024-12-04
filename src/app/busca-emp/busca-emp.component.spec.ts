import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaEmpComponent } from './busca-emp.component';

describe('BuscaEmpComponent', () => {
  let component: BuscaEmpComponent;
  let fixture: ComponentFixture<BuscaEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
