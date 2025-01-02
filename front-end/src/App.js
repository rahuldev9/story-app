import React, { useState } from "react";
import './App.css';

import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import Addproduct from './Components/Addproduct';
import ProductList from './Components/ProductList';
import Updateproduct from './Components/Updateproduct';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import First from "./Components/First";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from "./LoadingBar";
function App() {
  const [color, setColor] = useState('white');
  const [text,settext]= useState('black')

  const toggleColor = () => {
    setColor((prevColor) => (prevColor === "white" ? "black" : "white"));

    settext((prevtext)=>(prevtext==='black'?'white':'black'))
  };
  return (
    <>
    <div className="App" class="color-box" style={{backgroundColor:color,color:text, margin: "0 auto",
      transition:"background-color 1s ease",height:'100%'}}>
      <BrowserRouter>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',}}>
      <input type="checkbox" class="theme-checkbox" onClick={toggleColor}></input>
      </div>
      <Nav/>
      <Routes>
        <Route path="/" element={<First/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route element={<PrivateComponent/>}>
        <Route path='/products' element={<ProductList/>}></Route>
        <Route path='/add' element={<Addproduct/>}></Route>
        <Route path='/update/:id' element={<Updateproduct/>}></Route>
        <Route path='/logout' element={<h1>logout</h1>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        </Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
