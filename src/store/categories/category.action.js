import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";


export const fetchCategoriesStart = () => {                                                       // will set isloading to true
     return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
}

export const fetchCategoriesSuccess = (categoriesArray) => {                                      // This will now be replacing the setCategories action from before thunk, will pass on the categoriesArray
     return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
}

export const fetchCategoriesFailed = (error) => {                                                 // will passing on the error
     return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
}

