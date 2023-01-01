import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Protected from './components/Routes/Protected';
import { SearchResult } from './pages/SearchResult';
import { Notifications } from './pages/Notifications';
import Error from './pages/Error';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import User from './pages/Profile/User';
import Verifiedemail from './pages/Authentication/Verifiedemail';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import Userpage from './pages/Admin page/Userpage';
import Pageadmin from './pages/Admin page/Pageadmin';
import Transaction from './pages/Transaction/Transaction';
import CreateTicket from './pages/Admin page/Ticket/CreateTicket';
import ListTicket from './pages/Admin page/Ticket/ListTicket';
import UpdateTicket from './pages/Admin page/Ticket/UpdateTicket';
import { Booking } from './pages/Booking';
import Payment from './pages/Booking/Payment';
import { History } from './pages/History';
import Detail from './pages/detail/Detail';
import Cart from './pages/Booking/Cart';
import ETicket from './pages/Booking/ETicket';
import { Dashboard } from './pages/Dashboard';
import { Reset } from './pages/Reset';
import DetailTransaction from './pages/Transaction/DetailTransaction';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user"
            element={
              <Protected>
                <User />
              </Protected>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/verified-email" element={<Verifiedemail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/:id" element={<DetailTransaction />} />
          <Route path="/admin-page" element={<Pageadmin />} />
          <Route path="/user-page" element={<Userpage />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/ticket" element={<ListTicket />} />
          <Route path="/ticket/:id" element={<UpdateTicket />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/payment/:paymentId" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/detail-user/:id" element={<Detail />} />
          <Route path="/eticket/:paymentId" element={<ETicket />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
