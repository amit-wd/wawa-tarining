import { ofType, combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import { getData } from './services';

import {
  FETCHING_DATA,
  getDataSuccess,
  LOADFOODACTION,
  LOADFOODACTIONSUCCESS,
  LOADFOODACTIONFAILURE,
  getDataFailure,
} from '../actions/actions';

export const githubUserLoadEpic: Epic<
  LOADFOODACTION | LOADFOODACTIONSUCCESS | LOADFOODACTIONFAILURE,
  never
> = action$ =>
  action$.pipe(
    ofType<LOADFOODACTION>(FETCHING_DATA),
    switchMap(() =>
      getData().pipe(
        map(data => getDataSuccess(data)),
        catchError(() => of(getDataFailure('User not found'))),
      ),
    ),
  );

export const githubUserEpic = combineEpics(githubUserLoadEpic);
