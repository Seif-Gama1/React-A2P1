
import { useEffect, useState } from 'react';
import './App.css';
import NavBar from "./components/NavBar.jsx"
import Home from './pages/Home/home.jsx';
import {Routes, Route, Link, Outlet} from "react-router-dom"
import Cart from './pages/Home/components/Cart.jsx';
import ProductDetails from './pages/Home/components/ProductDetails.jsx';

//mt-5 -> 20 px
export const localKey = "CartItems";

export function setLocalStorage(data){
  localStorage.setItem(localKey,JSON.stringify(data));
}
export function getLocalStorage(){
  return JSON.parse(localStorage.getItem(localKey));
}

function App() {
  return (
  <>
    <NavBar/>
    <Cart/>
    <Outlet/>
  </>
  );
}

export default App;

{/* To have inner routes within a route:

    {/* Route checks if the current URL contains (baseURL + /blog) or not 
      if it exists then call element inside and remove all other elements inside <Routes> tag}
    <Routes>
      {/* It's as if routes contains an inner state .. which gets updated using <Link to...> }
      <Route path={""} element={<Home/>}>
          <Route path={""} element={<ProductList/>}/>
          <Route path={"/services"} element={<ServicesList/>}/> }
      <Route/>
*/}
