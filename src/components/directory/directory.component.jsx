import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles'

const Directory = ({categories}) => {
    return (
        <DirectoryContainer>
          {categories.map((category) => (
            <DirectoryItem key={category.id} category={category} />                   /*When mapping through the categories array it will assign the id for each category to key and category will be the mapped item */ 
        ))}
        </DirectoryContainer>
    )
}

export default Directory;