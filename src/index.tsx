import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./views/LoginPage";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";
import {AuthorizationStore} from "./redux/authorizationStore";
import MainPage from "./views/MainPage";

const router = createBrowserRouter([
    {children: [{
            index: true,
            element: <LoginPage/>
        },
            {
                path: "mainPage",
                element: <MainPage/>
            }]
    }], {basename: '/~s373317/'});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={AuthorizationStore}>
          <Toaster
              position="top-right"
              reverseOrder={false}
          />
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);
//<App />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
