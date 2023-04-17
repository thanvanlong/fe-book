import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import BookingTable from './container/BookingPage';
import Order from './container/OrderPage';
import BillPage from './container/BillPage';
import Login from './container/LoginPage';
import Signup from './container/SignupPage';
import UserPage from './container/UserPage'
import HistoryPage from './container/HistoryPage';
import HistoryBookPage from './container/HistoryBookPage';
import DetailBookCard from './component/DetailBookCard';
import BookCard from './component/BookCard';
import MenuBook from './container/MenuBook';
import OrderCard from './component/OrderCard';
import DetailBill from './container/DetailBill';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MenuBook />} />
        <Route path='/history/bill' element={<HistoryPage />} />
        <Route path='/history/book' element={<HistoryBookPage />} />
        <Route path='/detail' element={<DetailBookCard />}>
          <Route path=':id' element={<DetailBookCard />} />
        </Route>
        <Route path='/detail-bill' element={<DetailBill />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/book' element={<BookingTable />} />
        <Route path='/bill'
          element={<BillPage />} />
        <Route path='/userinfo'
          element={<UserPage /> } />
        <Route path='/order' element={<Order/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
