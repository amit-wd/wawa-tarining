import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { interval } from 'rxjs/observable/interval';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/operators';

import { API_HOST } from './Config';

export const get = <T>(url: string) =>
  ajax(`${API_HOST}${url}`).pipe(map(({ response }) => response as T));

// Takes an observable and delays each response by 1000 seconds
// This is done with the http requests to allow more time to see loading
// behavior
export const mockDelay = <T>(observable: Observable<T>) =>
  zip(observable, interval(1000)).pipe(map(([val]) => val));
