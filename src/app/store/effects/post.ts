import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AddPost, PostActions} from '../actions/post';
import {map, tap, switchMap} from 'rxjs/operators';


@Injectable()
export class PostEffects {


  constructor(private actions$: Actions) {
  }


  addPost$ = createEffect(() => this.actions$.pipe(
    ofType<AddPost>(PostActions.ADD_POST),
    map((action) => {
      console.log('Effect', action.payload.post);
      return null;
    })
  ), {dispatch: false});

}
