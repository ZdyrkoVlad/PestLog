import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {Post} from 'src/app/dao/blog/post';
import {PostAction, PostActions} from '../actions/post';
import {setTestabilityGetter} from '@angular/core';

export const POST_KEY = 'post';

export interface PostState {
  ids: number[];
  selected: number;
  posts: Post[];
  postsTest: { number: Post };
}


export const initialState: PostState = {
  ids: [2, 3],
  selected: 2,
  postsTest: null,
  posts: [
    {
      id: '3',
      authorId: '123213',
      title: 'Тестовый пост #1',
      content: 'Поскольку возможно не всегда подключение к back-end, я для примера оставляю пару постов которые инитятся в PostState в store',
      commentId: ['123123'],
      createDate: '2021-11-01T14:48:29.023Z',
      imageURL: 'https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png'
    },
    {
      id: '2',
      authorId: '123213',
      title: 'Тестовый пост #2',
      content: 'Тестовое описание 2. Поскольку возможно не всегда подключение к back-end, я для примера оставляю пару постов которые инитятся в PostState в store',
      commentId: ['123123'],
      createDate: '2021-11-01T14:49:45.021Z',
      imageURL: 'https://i2.wp.com/joeabercrombie.com/wp-content/uploads/2019/05/Heroes_Cover-wrap.jpg?fit=4799%2C2762&ssl=1'

    }
  ]
};

// export const postReducer = createReducer(
//   initialState);

export function PostReducer(state = initialState, action: PostAction) {
  switch (action.type) {
    case PostActions.ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload.post]

      }
        ;
    }
    case PostActions.SELECT_POST: {
      return {
        ...state,
        selected: Number(action.payload)
      };
    }
    default:
      return state;
  }
}

export const featureSelector = createFeatureSelector<PostState>(POST_KEY);

export const AllPostSelector = createSelector(featureSelector,
    (state) => {
      return state.ids.map(id => state.posts[id]);
    }
  )
;

export const SelectedSelector = createSelector(
  featureSelector,
  state => state.selected
);


export const TestSelector = createSelector(
  featureSelector,
  state => state.posts.map(testMap)
);

export const SpecificPostSelector = createSelector(
  featureSelector,
  state => {
    console.log('State', state);
    const postState = state.posts.filter(post => post.id === state.selected.toString());
    console.log('SpecificPostSelector', postState[0]);
    if (postState.length > 0) {
      return postState[0];
    } else {
      return null;
    }

  }
);


function testMap(element: any) {
  console.log('testMap', element);
  return element;
}
