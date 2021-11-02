import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccouontAchievementsComponent } from './accouont-achievements.component';

describe('AccouontAchievementsComponent', () => {
  let component: AccouontAchievementsComponent;
  let fixture: ComponentFixture<AccouontAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccouontAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccouontAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
