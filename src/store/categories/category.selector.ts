import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";


 const selectCategoryReducer = (state): CategoriesState => {
    return state.categories;
};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categories;
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => {
        return categories.reduce((acc, category) => {         // querySnapshot.docs gives us an array of snapshots, we reduce over the querySnapShots.docs inorder to get the array structure of categories with their respected items
        const { title, items } = category;                                // destructuring title and items from the docSnapshot (this grabs the data from the snapshot and grabs title and items from it)
        acc[title.toLowerCase()] = items;                                           // the accumalator at the title value will be equal to the items, where, acc[index of item]
           return acc;                                                                 // returns the accumalator    
        }, {} as CategoryMap);
    }
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);