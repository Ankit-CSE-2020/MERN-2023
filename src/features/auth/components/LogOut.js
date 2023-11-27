import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectloggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";


export function LogOut() {
    const dispatch=useDispatch()
   const user=useSelector(selectloggedInUser)

    useEffect(()=>{
        dispatch(signOutAsync())
    })

    //but useEffect runs after render ,so we have to delay navigate part
      
    return(
        <>
        {!user &&
        < Navigate to='/login' replace={true} ></Navigate>
         }
        </>
    )
}