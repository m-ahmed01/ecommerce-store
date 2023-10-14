
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
// import TopBar from "./TopBarTitle";

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