import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {POST_KEY, PostReducer, PostState} from './post';


export interface State {
  [POST_KEY]: PostState;

}

export const reducers: ActionReducerMap<State> = {
  [POST_KEY]: PostReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
