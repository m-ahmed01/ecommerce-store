
// import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import TopBar from "./TopBarTitle";
import Footer from "../features/common/Footer";
// import TopBar from "./TopBarTitle";

function Home () {
    return ( 
        <div>
            <TopBar/>
            <NavBar>
          
                  <header className="bg-blue-200 shadow">
            <div className="mx-auto flex justify-center px-4 py-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 ">Happy Shopping!! Team Shopland 😊</h1>
            </div>
          </header>
          
          <br></br>
                <ProductList>  </ProductList>  {/*putting ProductList as children to NavBar*/}
            </NavBar>
          <Footer></Footer>

        </div>
     );
}

export default Home ;