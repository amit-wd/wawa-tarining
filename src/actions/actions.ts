export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export interface LOAD_FOOD_ACTION {
  type: typeof FETCHING_DATA;
}

export interface LOAD_FOOD_SUCCESS_ACTION {
  type: typeof FETCHING_DATA_SUCCESS;
  data: string;
}

export interface LOAD_FOOD_FAILURE_ACTION {
  type: typeof FETCHING_DATA_FAILURE;
  error: string;
}

export const getFoodData = (): LOAD_FOOD_ACTION => ({
  type: FETCHING_DATA,
});

export const getDataSuccess = (data): LOAD_FOOD_SUCCESS_ACTION => ({
  data,
  type: FETCHING_DATA_SUCCESS,
});

export const getDataFailure = (err): LOAD_FOOD_FAILURE_ACTION => ({
  type: FETCHING_DATA_FAILURE,
  error: err,
});
