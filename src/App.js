import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import './App.css';
import Home from './features/pages/Home';
import LoginPage from './features/pages/LoginPage';
import SignupPage from './features/pages/SignupPage';
import Cartpage from './features/pages/Cartpage';
import Checkoutpage from './features/pages/Checkoutpage';
import ProductDetailPage from './features/pages/ProductDetailPage';
import { Protected } from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectloggedInUser } from './features/auth/authSlice';
import PageNotFound from './features/pages/404';
import OrderSucessPage from './features/pages/OrderSucessPage';
import UserOrderPage from './features/pages/UserOrderPage';
import { UserProfilePage } from './features/pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { LogOut } from './features/auth/components/LogOut';
import ForgotPasswordPage from './features/pages/ForgotPasswordPage'
import AdminHome from './features/pages/AdminHome';
import { ProtectedAdmin } from './features/auth/components/ProtectedAdmin';
import AdminProductDetailPage from './features/pages/AdminProductDetailPage';
import AdminProductFormPage from './features/pages/AdminProductFormPage';
import AdminOrderPage from './features/pages/AdminOrderPage';



const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};


const router=createBrowserRouter([
  {
    path:'/',
    element:<Protected>
      <Home></Home>
      </Protected>
  },
  {
    path:'/admin',
    element:<ProtectedAdmin>
           <AdminHome></AdminHome>
       </ProtectedAdmin>      
  },
  {
    path:'/login',
    element:<LoginPage></LoginPage>,
  },
  {
    path:'/logout',
    element:<LogOut></LogOut>,
  },
  {
    path:'/singup',
    element:<SignupPage></SignupPage>,
  },
  {
    path:'/forgot-password',
    element:<ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path:'/cart',
    element:<Protected>
    <Cartpage></Cartpage>
    </Protected>
    },
  {
    path:'/checkout',
    element:<Protected>
    <Checkoutpage></Checkoutpage>
    </Protected>
  },
  {
    path:'/productdetail/:id',
    element:<Protected>
      <ProductDetailPage></ProductDetailPage>
      </Protected>
  },
  {
    path:'/admin/productdetail/:id',
    element:<ProtectedAdmin>
          <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
  },
  {
    path:'/admin/product-form',
    element:<ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
  },
  {
    path:'/admin/product-form/edit/:id',
    element:<ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
  },
  {
    path:'/admin/orders',
    element:<ProtectedAdmin>
         <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
  },
  {
    path:'/order-success/:id',
    element:
      <OrderSucessPage></OrderSucessPage>
    
  },
  {
    path:'/orders',
    element:<UserOrderPage></UserOrderPage>   
           //we will add page later right now using component directly 
  },
  {
    path:'/profile',
    element:<UserProfilePage ></UserProfilePage>  
           //we will add page later right now using component directly 
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
    
  }




])

function App() {
  const user=useSelector(selectloggedInUser)
//   console.log('--',user.id);
  
  const dispatch=useDispatch()
  useEffect(()=>{
     if(user){
      
      dispatch(fetchItemsByUserIdAsync(user.id))
       dispatch(fetchLoggedInUserAsync(user.id))
   //  dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div >
    <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router}>
       {/* Link must be inside the Provider */}
      </RouterProvider> 
    </Provider>
    </div> 
  );
}

export default App;
