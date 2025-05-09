// import CandyBox from 'pages/candy-box';
import { Login } from '../pages/login';
// import { Logout } from 'pages/logout';
// import { Register } from 'pages/register';
import { Route } from '../types/route';
import { Logout } from '../pages/logout';

export const publicRoutes: Route[] = [
  {
    key: 'router-login',
    title: 'Login',
    description: 'Login',
    component: Login,
    path: '/login',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'router-dashboard',
    title: 'Logout',
    description: 'Logout',
    component: Logout,
    path: '/logout',
    isEnabled: true,
    appendDivider: true,
  },
//   {
//     key: 'router-register',
//     title: 'Register',
//     description: 'Register',
//     component: Register,
//     path: '/Register',
//     isEnabled: true,
//     appendDivider: true,
//   },
//   {
//     key: 'router-logout',
//     title: 'Logout',
//     description: 'Logout',
//     component: Logout,
//     path: '/logout',
//     isEnabled: true,
//     appendDivider: true,
//   },
//   {
//     key: 'router-candy-box',
//     title: 'Candy Box',
//     description: 'Candy Box',
//     component: CandyBox,
//     path: '/candy-box',
//     isEnabled: true,
//     noLayout: true,
//   },
];
