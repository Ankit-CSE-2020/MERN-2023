import NavBar from "../NavBar/NavBar";
import Footer from "../common/Footer";
import ProductDetail from "../product/component/ProductDetail";



export default function ProductDetailPage(){

    return(
        <div>
            <NavBar>
                <ProductDetail></ProductDetail>
          </NavBar>
          <Footer></Footer>
        </div>
            
    )
};