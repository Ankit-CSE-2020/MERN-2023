import NavBar from "../NavBar/NavBar";
import AdminProductList from "../admin/components/AdminProductList";


export default function AdminHome({children}) {
    
    return(
        <div>
            <NavBar>
               <AdminProductList></AdminProductList>
            </NavBar>
        </div>
    )
}