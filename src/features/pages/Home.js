import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import ProductList from "../product/component/ProductList";
import Footer from "../common/Footer";


export default function Home({children}) {
    
    return(
        <div>
            <NavBar>
               <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
    )
}