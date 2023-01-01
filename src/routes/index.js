import { AboutUs } from '../pages/AboutUs';
import { Booking } from '../pages/Booking';
import Cart from '../pages/Booking/Cart';
import CreateTicket from '../pages/Admin page/Ticket/CreateTicket';
import Detail from '../pages/detail/Detail';
import Error from '../pages/Error';
import ETicket from '../pages/Booking/ETicket';
import { ForgotPassword } from '../pages/ForgotPassword';
import { History } from '../pages/History';
import ListTicket from '../pages/Admin page/Ticket/ListTicket';
import { Login } from '../pages/Login';
import { Notifications } from '../pages/Notifications';
import Pageadmin from '../pages/Admin page/Pageadmin';
import Payment from '../pages/Booking/Payment';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { Register } from '../pages/Register';
import { Reset } from '../pages/Reset';
import { ResetPassword } from '../pages/ResetPassword';
import { SearchResult } from '../pages/SearchResult';
import Transaction from '../pages/transaction page/Transaction';
import UpdateTicket from '../pages/Admin page/Ticket/UpdateTicket';
import Userpage from '../pages/Admin page/Userpage';
import Verifiedemail from '../pages/Authentication/Verifiedemail';

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/forgot-password',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    component: ResetPassword
  },
  {
    path: '/search',
    component: SearchResult
  },
  {
    path: '/notifications',
    component: Notifications
  },
  {
    path: '/verified-email',
    component: Verifiedemail
  },
  {
    path: '/transactions',
    component: Transaction
  },
  {
    path: '/dashboard',
    component: Pageadmin
  },
  {
    path: '/users',
    component: Userpage
  },
  {
    path: '/create-flight',
    component: CreateTicket
  },
  {
    path: '/flights',
    component: ListTicket
  },
  {
    path: '/flights/:id',
    component: UpdateTicket
  },
  {
    path: '/booking/:id',
    component: Booking
  },
  {
    path: '/payment/:paymentId',
    component: Payment
  },
  {
    path: '/history',
    component: History
  },
  {
    path: '/detail-user/:id',
    component: Detail
  },
  {
    path: '/eticket/:paymentId',
    component: ETicket
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/about',
    component: AboutUs
  },
  {
    path: '/policy',
    component: PrivacyPolicy
  },
  {
    path: '/reset',
    component: Reset
  },
  {
    path: '/*',
    component: Error
  }
];

export default routes;
