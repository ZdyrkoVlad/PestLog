import {Action} from '@ngrx/store';
import {Post} from 'src/app/dao/blog/post';


export enum PostActions {
  SELECT_POST = '[POST] selectPost',
  ADD_POST = '[POST] addPost',
  DELETE_POST = '[POST] deletePost',
  GET_ALL_POST = '[POST] getAllPost',
  ADD_POST_COMPLETE = '[POST] addPostComplete',
  GET_ALL_POST_COMPLETE = '[POST] getAllPostComplete'
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

export class AddPostComplete implements Action {
  readonly type = PostActions.ADD_POST_COMPLETE;


  constructor(public payload: { post: Post }) {

  }
}

export class DeletePost implements Action {
  readonly type = PostActions.DELETE_POST;

  constructor(public payload: Post) {
  }
}

export class GetAllPost implements Action {
  readonly type = PostActions.GET_ALL_POST;

  constructor() {
  }
}

export class GetAllPostComplete implements Action {
  readonly type = PostActions.GET_ALL_POST_COMPLETE;

  constructor(public payload: { downloadPosts: Post[] }) {
    console.log('GetAllPostComplete', payload.downloadPosts);
  }
}

export type PostAction = AddPost | SelectPost | DeletePost | AddPostComplete | GetAllPost | GetAllPostComplete;


