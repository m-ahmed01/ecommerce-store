import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return ( 
        <div>
        <NavBar>
     <h1  className="mx-auto flex justify-center text-3xl"> My Profile</h1>
            <UserProfile></UserProfile>
        </NavBar>
    </div>
     );
}

export default UserProfilePage;