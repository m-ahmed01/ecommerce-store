
import Signup from "../features/auth/components/Signup";
import NavBar from "../features/navbar/Navbar";
// import Signup from "../features/auth/Signup";

function SignupPage () {
    return ( 
        <div>
            <NavBar>
            <Signup></Signup>
            </NavBar>
        </div>
     );
}

export default SignupPage;