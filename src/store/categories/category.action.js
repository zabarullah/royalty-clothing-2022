import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";


export const fetchCategoriesStart = () => {                                                       // will set isloading to true
     return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
}

export const fetchCategoriesSuccess = (categoriesArray) => {                                      // This will now be replacing the setCategories action from before thunk, will pass on the categoriesArray
     return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
}

export const fetchCategoriesFailed = (error) => {                                                 // will passing on the error
     return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
}

export const fetchCategoriesAsync = () => async (dispatch) =>{                                    // Thunk, an Async function is returned in a thunk which will now be used in the shop component
     dispatch(fetchCategoriesStart());
     
     try {
          const categoriesArray = await getCategoriesAndDocuments();  
          dispatch(fetchCategoriesSuccess(categoriesArray));
     } catch (error) {
          dispatch(fetchCategoriesFailed(error));
     }
}