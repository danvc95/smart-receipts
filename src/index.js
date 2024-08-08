import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Outlet, Link } from "react-router-dom";

import {
  ListView,
  ItemView,
  UploadView,
  CategoryView,
  StoryView,
} from "./views";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import CategoryTotals from './views/categoryTotals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListView />,
  },
  {
    path: "/receipt/:id",
    element: <ItemView />,
  },
  {
    path: "/upload",
    element: <UploadView />,
  },
  {
    path: "/category",
    element: <CategoryView />,
  },
  {
    path: "/story/:id",
    element: <StoryView />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
