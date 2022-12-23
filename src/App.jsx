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
import Transaction from './pages/transaction page/Transaction';
import Ticket from './pages/Admin page/Ticket/Ticket';
import ListTicket from './pages/Admin page/Ticket/ListTicket';
import UpdateTicket from './pages/Admin page/Ticket/UpdateTicket';
import { Booking } from './pages/Booking';
import Detail from './pages/detail/Detail';

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
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/admin-page" element={<Pageadmin />} />
          <Route path="/user-page" element={<Userpage />} />
          <Route path="/create-ticket" element={<Ticket />} />
          <Route path="/ticket" element={<ListTicket />} />
          <Route path="/ticket/:id" element={<UpdateTicket />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/detail-user" element={<Detail />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
