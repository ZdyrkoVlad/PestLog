import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPostComponent} from './new-post.component';
import {StoreModule} from '@ngrx/store';

import { RouterTestingModule } from '@angular/router/testing';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [NewPostComponent],
      imports: [StoreModule.forRoot({}), RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
