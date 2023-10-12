
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/ProductList";

function Home () {
    return ( 
        <div>
            <NavBar>
                <ProductList>  </ProductList>  {/*putting ProductList as children to NavBar*/}
            </NavBar>
        </div>
     );
}

export default Home ;