import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewDialogComponent } from './post-new-dialog.component';

describe('PostNewDialogComponent', () => {
  let component: PostNewDialogComponent;
  let fixture: ComponentFixture<PostNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
