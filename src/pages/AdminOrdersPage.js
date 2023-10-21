

import AdminOrders from "../features/admin/components/AdminOrders";
import NavBar from "../features/navbar/Navbar";

function AdminOrdersPage () {
    return ( 
        <div>
      
            <NavBar>
          
          <br></br>
                <AdminOrders>  </AdminOrders>  {/*putting ProductList as children to NavBar*/}
            </NavBar>

        </div>
     );
}

export default AdminOrdersPage ;