import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Protected from './components/Routes/Protected';
import { Home } from './pages/Home';
import User from './pages/Profile/User';
import routes from './routes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/user"
            element={
              <Protected>
                <User />
              </Protected>
            }
          />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Router>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
