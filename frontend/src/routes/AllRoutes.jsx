import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Products from '../pages/Products';
import FourOFour from '../pages/FourOFour';

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/products' element={<Products/>}></Route>
            <Route path='*' element={<FourOFour/>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes