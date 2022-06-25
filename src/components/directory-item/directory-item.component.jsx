import { useNavigate } from 'react-router-dom';

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles'

const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;                        // we destructure in route from category. category is the prop passed in from the directory components Directory item
    
    const navigate = useNavigate();                                     // use the useNavigate hook to later pass it the route
    const onNavigateHandler = () => navigate(route);                    // event handler created to use the navigate variable passing it route

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>            {/* onclick event added to the Directory container*/}
            <BackgroundImage imageUrl= {imageUrl} />
                <Body> 
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;