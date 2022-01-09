import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PostService} from 'src/app/services/post.service';
import {PostListComponent} from './post-list.component';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {metaReducers, reducers} from '../../../store/reducers';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [PostService],
      imports: [StoreModule.forRoot(reducers, {
        metaReducers
      }), RouterTestingModule, MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
