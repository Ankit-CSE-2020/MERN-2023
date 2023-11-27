import UserOrders  from "../user/component/UserOrder";
import NavBar from "../NavBar/NavBar";


  
export default function UserOrderPage() {
    return(
        <>
        <NavBar>
            <h1 className="mx-auto text-2xl">My Orders</h1>
            <UserOrders ></UserOrders>
        </NavBar>
        </>
    )
}