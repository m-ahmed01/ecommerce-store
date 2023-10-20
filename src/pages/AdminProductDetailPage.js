


import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import NavBar from "../features/navbar/Navbar";
import TopBar from "./TopBarTitle";

function AdminProductDetailPage () {
    return ( 
        <div>
            <TopBar/>
            <NavBar>
                <AdminProductDetail>  </AdminProductDetail>  {/*putting ProductList as children to NavBar*/}
            </NavBar>
        </div>
     );
}

export default AdminProductDetailPage;