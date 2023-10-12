


import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";

function ProductDetailPage () {
    return ( 
        <div>
            <NavBar>
                <ProductDetail>  </ProductDetail>  {/*putting ProductList as children to NavBar*/}
            </NavBar>
        </div>
     );
}

export default ProductDetailPage ;