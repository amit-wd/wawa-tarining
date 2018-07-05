import { ofType, combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import { getData } from './services';

import {
  FETCHING_DATA,
  getDataSuccess,
  LOAD_FOOD_ACTION,
  LOAD_FOOD_SUCCESS_ACTION,
  LOAD_FOOD_FAILURE_ACTION,
  getDataFailure,
} from '../actions/actions';

export const foodDataLoadEpic: Epic<
  LOAD_FOOD_ACTION | LOAD_FOOD_SUCCESS_ACTION | LOAD_FOOD_FAILURE_ACTION,
  never
> = action$ =>
  action$.pipe(
    ofType<LOAD_FOOD_ACTION>(FETCHING_DATA),
    switchMap(() =>
      getData().pipe(
        map(data => getDataSuccess(data)),
        catchError(() => of(getDataFailure('User not found'))),
      ),
    ),
  );

export const foodDataEpic = combineEpics(foodDataLoadEpic);
