import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from '../actions/actions';

export interface Food {
  name: string;
  image: string;
}

export interface FoodPurchaseHistoryState {
  selectedFoodItems: Food[];
}

const initialState: FoodPurchaseHistoryState = {
  selectedFoodItems: [],
};

export const historyReducer = (
  state: FoodPurchaseHistoryState = initialState,
  { type, foodItem, selectedFoodItems: {} },
) => {
  switch (type) {
    case FETCHING_DATA:
      const selectedFoodItems = [...state.selectedFoodItems];
      if (!selectedFoodItems.find(food => food === foodItem)) {
        selectedFoodItems.push(foodItem);
      }

      return {
        ...state,
        selectedFoodItems,
      };

    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
      };

    case FETCHING_DATA_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
