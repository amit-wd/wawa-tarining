export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export interface LOADFOODACTION {
  type: typeof FETCHING_DATA;
}

export interface LOADFOODACTIONSUCCESS {
  type: typeof FETCHING_DATA_SUCCESS;
  data: string;
}

export interface LOADFOODACTIONFAILURE {
  type: typeof FETCHING_DATA_FAILURE;
  error: string;
}

export const getFoodData = (): LOADFOODACTION => ({
  type: FETCHING_DATA,
});

export const getDataSuccess = (data): LOADFOODACTIONSUCCESS => ({
  data,
  type: FETCHING_DATA_SUCCESS,
});

export const getDataFailure = (err): LOADFOODACTIONFAILURE => ({
  type: FETCHING_DATA_FAILURE,
  error: err,
});
