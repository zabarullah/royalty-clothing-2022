import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss'

const Directory = ({categories}) => {
    return (
        <div className="directory-container">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />                   /*When mapping through the categories array it will assign the id for each category to key and category will be the mapped item */ 
  
        ))}
      </div>
    )
}

export default Directory;