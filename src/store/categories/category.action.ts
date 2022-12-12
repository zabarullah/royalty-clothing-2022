import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

// This Union commented out as we are now using withMatcher to match the type from the action
// export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;


export const fetchCategoriesStart = withMatcher(
     (): FetchCategoriesStart =>                                                                                                  // will set isloading to true
     createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher(
     (categoriesArray: Category[]): FetchCategoriesSuccess =>                                                                     // This will now be replacing the setCategories action from before thunk, will pass on the categoriesArray
     createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));


export const fetchCategoriesFailed = withMatcher(
     (error: Error):FetchCategoriesFailed =>                                                                                      // will passing on the error
     createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));


