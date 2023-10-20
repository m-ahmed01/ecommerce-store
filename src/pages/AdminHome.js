
import AdminProductList from "../features/admin/components/AdminProductList";
import NavBar from "../features/navbar/Navbar";
// import TopBar from "./TopBarTitle";
// import TopBar from "./TopBarTitle";

function AdminHome () {
    return ( 
        <div>
            {/* <TopBar/> */}
            <NavBar>
          
                  {/* <header className="bg-blue-200 shadow">
            <div className="mx-auto flex justify-center px-4 py-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 ">Happy Shopping!! Team Shopland 😊</h1>
            </div>
          </header> */}
          
          <br></br>
                <AdminProductList>  </AdminProductList>  {/*putting ProductList as children to NavBar*/}
            </NavBar>

        </div>
     );
}

export default AdminHome ;