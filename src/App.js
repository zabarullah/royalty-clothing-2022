import { Routes, Route } from 'react-router-dom';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';


const Shop = () => {
  return <h1>I am the shop page</h1>
}

const App = () => {
  return (
    <Routes>  
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Route>                                        { /*All individual Route(s) are rapped inside Routes, where Route has a path and to which element(component) it will load */} 
    </Routes>
  )

}

export default App;
