import {Action} from '@ngrx/store';
import {Post} from 'src/app/dao/blog/post';


export enum PostActions {
  SELECT_POST = '[POST] selectPost',
  ADD_POST = '[POST] addPost',
  DELETE_POST = '[POST] deletePost'
}


export class SelectPost implements Action {
  readonly type = PostActions.SELECT_POST;

  constructor(public payload: string) {
  }
}

export class AddPost implements Action {
  readonly type = PostActions.ADD_POST;


  constructor(public payload: { post: Post }) {

  }
}

export class DeletePost implements Action {
  readonly type = PostActions.DELETE_POST;

  constructor(public payload: Post) {
  }
}

export type PostAction = AddPost | SelectPost | DeletePost;


