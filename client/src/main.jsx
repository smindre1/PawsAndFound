import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import App from './App.jsx';
import About from './pages/AboutUs';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Post from './pages/SpecificPost';
import Profile from './pages/Profile';
// import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/aboutus',
        element: <About />
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