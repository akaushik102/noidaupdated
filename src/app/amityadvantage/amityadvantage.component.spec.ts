import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmityadvantageComponent } from './amityadvantage.component';

describe('AmityadvantageComponent', () => {
  let component: AmityadvantageComponent;
  let fixture: ComponentFixture<AmityadvantageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmityadvantageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmityadvantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
