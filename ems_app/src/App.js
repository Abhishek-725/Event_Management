import React from 'react';
import Logger from './Components/Logger';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage'
import ErrorPage from './Components/ErrorPage';
import AdminHomePage from './Admin/AdminHomePage';
import AddEvent from './Admin/AddEvent';
import HomePage from './Components/HomePage';
import About from './Components/About';
import EventServices from './Components/Services/EventServices';
import VenueServices from './Components/Services/VenueServices';
import AddVenue from './Admin/Services/AddVenue';
import AddDecoration from './Admin/Services/AddDecoration';
import DecorationServices from './Components/Services/DecorationServices';
import VenueBookServices from './Components/Services/VenueBookService';
import AddMenuServices from './Admin/Services/AddMenuServices';
import AddRefreshment from './Admin/Services/AddRefreshment';
import AddStarter from './Admin/Services/AddStarter';
import AddMainCourse from './Admin/Services/AddMainCourse';
import AddDessert from './Admin/Services/AddDessert';
import ForgetPassword from './Components/ForgetPassword';
import PasswordChanged from './Components/PasswordChanged';
import RefreshmentServices from './Components/Services/RefreshmentServices';
import ContactUs from './Components/ContactUs';
import MenuServices from './Components/Services/MenuServices';
import LoadingPage from './Components/UserSubComponent/LoadingPage';
import StarterServices from './Components/Services/StarterServices';
import DessertServices from './Components/Services/DesertServices';
import VegServices from './Components/Services/VegServices';
import NonVegServices from './Components/Services/NonVegServices';
import UserEventDetail from './Components/Services/UserEventDetail';
import StatusPage from './Components/StatusPage';
import ViewBookingServices from './Admin/Services/ViewBookingServices';
import ViewDetails from './Admin/Services/ViewDetails';
import Stripe from './Components/Payment/Stripe';
import StripeCheckOut from './Components/Payment/StripeCheckOut';
import DecoModal from './Components/Modal_3/DecoModal';
function App() {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  console.log(isLogin);
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route exact path='Logger' element = {<Logger/>}></Route>
            <Route path='LoadingPage' element = {<LoadingPage/>} ></Route>
            <Route path='ForgetPassword' element = {<ForgetPassword/>}></Route>
            <Route path='PasswordChanged' element = {<PasswordChanged/>}></Route>
            <Route path='/' element = {isLogin ? <>{isAdmin ? <AdminHomePage/>:<HomePage/> }</>: <LoginPage/>}></Route>
            <Route path='RegisterPage' element = {<RegisterPage/>}></Route>
            <Route path='HomePage' element = {<HomePage/>}></Route>
            <Route path='About' element = {<About/>}></Route>
            <Route path='ContactUs' element = {<ContactUs/>}></Route>
            <Route path='EventServices' element = {<EventServices/>}></Route>
            <Route path='DecorationServices' element = {<DecorationServices/>}></Route>
            <Route path='VenueServices' element = {<VenueServices/>}></Route>
            <Route path='VenueBookServices' element = {<VenueBookServices/>}></Route>
            <Route path='RefreshmentServices' element = {<RefreshmentServices/>}></Route>
            <Route path='MenuServices' element = {<MenuServices/>} ></Route>
            <Route path='StarterServices' element = {<StarterServices/>}></Route>
            <Route path='Dessertservices' element = {<DessertServices/>}></Route>
            <Route path='vegServices' element = {<VegServices/>}></Route>
            <Route path='NonVegServices' element = {<NonVegServices/>}></Route>
            <Route path='UserEventDetail' element = {<UserEventDetail/>}></Route>
            <Route path='Status' element = {<StatusPage/>}></Route>
            <Route path='Stripe' element = {<Stripe/>}></Route>
            <Route path='StripeCheckOut' element = {<StripeCheckOut/>}></Route>
            <Route path='DecoModal' element = {<DecoModal/>}></Route>
                      {/* Admin Routes */}
            <Route path='AdminHomePage' element = {<AdminHomePage/>}></Route>
            <Route path='AddEvent' element = { <AddEvent/>}></Route>
            <Route path='AddVENUE' element = { <AddVenue/>}></Route>
            <Route path='AddDecoration' element = {<AddDecoration/>}></Route>
            <Route path='AddMenuServices' element = {<AddMenuServices/>}></Route>
            <Route path='AddRefreshment' element = {<AddRefreshment/>}></Route>
            <Route path='AddStarter' element = {<AddStarter/>}></Route>
            <Route path='AddMainCourse' element = {<AddMainCourse/>}></Route>
            <Route path='AddDessert' element = {<AddDessert/>}></Route>
            <Route path='ViewBookingServices' element = {<ViewBookingServices/>}></Route>
            <Route path='ViewDetails' element = {<ViewDetails/>}></Route>
            <Route path='*' element = {<ErrorPage/>}></Route>
          </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
