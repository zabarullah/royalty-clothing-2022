import { useEffect } from "react";  
import { useDispatch } from "react-redux";

import { Routes, Route } from 'react-router-dom';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component'

import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  },[dispatch]);

  return (
    
    <Routes>  
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />                              { /* * denotes a wildcard where any route with shop/anyRoute will work. i.e. there are routes setup in the shop component */ }
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>                                        { /*All individual Route(s) are rapped inside Routes, where Route has a path and to which element(component) it will load */} 
    </Routes>
  )

}

export default App;
