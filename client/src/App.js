import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

// import pages
import Checkout from './pages/Checkout.page';
import GoogleAuth from './pages/GoogleAuth.page';
import Home from './pages/Home.page';
import Restaurant from './pages/Restaurant.page';

// import components
import Menu from './components/Restaurant/Menu';
import OrderOnline from './components/Restaurant/OrderOnline';
import Overview from './components/Restaurant/Overview';
import Photos from './components/Restaurant/Photos';
import Reviews from './components/Restaurant/Reviews';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/delivery' />} />
        <Route path='/:type' element={<Home />} />
        <Route path='/restaurant/:id' element={<Restaurant />} />
        <Route path='/google/token' element={<GoogleAuth />} />
        <Route path='/restaurant/:id/overview' element={<Overview />} />
        <Route path='/restaurant/:id/order-online' element={<OrderOnline />} />
        <Route path='/restaurant/:id/reviews' element={<Reviews />} />
        <Route path='/restaurant/:id/menu' element={<Menu />} />
        <Route path='/restaurant/:id/photos' element={<Photos />} />
        <Route path='/checkout/orders' element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
