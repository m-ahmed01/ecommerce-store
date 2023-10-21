


// import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
import TopBar from "./TopBarTitle";

function ProductDetailPage () {
    return ( 
        <div>
            <TopBar/>
            <NavBar>
                <ProductDetail>  </ProductDetail>  {/*putting ProductList as children to NavBar*/}
            </NavBar>
            {/* <Footer></Footer> */}
        </div>
     );
}

export default ProductDetailPage;