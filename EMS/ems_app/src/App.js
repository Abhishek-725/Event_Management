import React from 'react';
import Logger from './Components/Logger';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage'
import ErrorPage from './Components/ErrorPage';
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element = {<Logger/>}></Route>
            <Route path='LoginPage' element = {<LoginPage/>}></Route>
            <Route path='RegisterPage' element = {<RegisterPage/>}></Route>
            <Route path='*' element = {<ErrorPage/>}></Route>
          </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
