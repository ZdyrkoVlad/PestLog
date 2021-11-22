import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AddPost, PostActions, AddPostComplete, GetAllPost, GetAllPostComplete} from '../actions/post';
import {map, tap, switchMap} from 'rxjs/operators';
import {PostService} from 'src/app/services/post';
import {Post} from '../../dao/blog/post';
import {Store} from '@ngrx/store';

@Injectable()
export class PostEffects {


  constructor(private actions$: Actions,
              private postService: PostService,
              private store: Store) {
  }


  addPost$ = createEffect(() => this.actions$.pipe(
    ofType<AddPost>(PostActions.ADD_POST),
    map((action) => {
      console.log('Effect', action.payload.post);
      this.postService.createPost(action.payload.post).pipe(
        map(data => {
          console.log('this.postService.createPost', data.data.createPost);
          this.store.dispatch(new AddPostComplete({post: data.data.createPost}));
          return data.data.createPost;
        })).subscribe();
    })
  ), {dispatch: false});

  allPost$ = createEffect(() => this.actions$.pipe(
    ofType<GetAllPost>(PostActions.GET_ALL_POST),
    map((action) => {
      console.log('Effect', action);
      this.postService.getAllPosts().pipe(
        map(data => {
          console.log('GetAllPost!', data.data.allPosts);
          this.store.dispatch(new GetAllPostComplete({downloadPosts: data.data.allPosts}));
        })
      ).subscribe();
    })
  ), {dispatch: false});

}
