export const selectCategoriesMap = (state) => {
    console.log('category.Selector - selector fired');
    return state.categories.categories.reduce((acc, category) => {         // querySnapshot.docs gives us an array of snapshots, we reduce over the querySnapShots.docs inorder to get the array structure of categories with their respected items
     const { title, items } = category;                                // destructuring title and items from the docSnapshot (this grabs the data from the snapshot and grabs title and items from it)
     acc[title.toLowerCase()] = items;                                           // the accumalator at the title value will be equal to the items, where, acc[index of item]
        return acc;                                                                 // returns the accumalator    
 }, {});
}
