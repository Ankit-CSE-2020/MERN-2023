import { useSelector } from "react-redux";
import { selectloggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export function ProtectedAdmin({children}) {
    const user=useSelector(selectloggedInUser)
    
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && user.role!=='admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }

    return children
}