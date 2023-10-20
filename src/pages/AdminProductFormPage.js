


import ProductForm from "../features/admin/components/ProductForm";
import NavBar from "../features/navbar/Navbar";


function AdminProductFormPage () {
    return ( 
        <div>
           
            <NavBar>
                <ProductForm>  </ProductForm>  {/*putting ProductList as children to NavBar*/}
            </NavBar>
        </div>
     );
}

export default AdminProductFormPage;