import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusquestionComponent } from './bonusquestion.component';

describe('BonusquestionComponent', () => {
  let component: BonusquestionComponent;
  let fixture: ComponentFixture<BonusquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
