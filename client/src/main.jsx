import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import About from './pages/AboutUs';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import Post from './pages/SpecificPost';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <About />
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/newpost',
        element: <NewPost />
      }, {
        path: '/post/:postId',
        element: <Post />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)