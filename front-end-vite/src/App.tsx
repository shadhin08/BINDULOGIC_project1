import { HomeComponent } from 'Components/Home/home.component';
import { LoginComponent } from 'Components/Login/login.component';
import { NavbarComponent } from 'Components/Navbar/navbar.component';
import { OthersProfileComponent } from 'Components/OthersProfile/others-profile.component';
import { PrivateProfileComponent } from 'Components/Profile/private-profile.component';
import { CreateRentPostComponent } from 'Components/Rentpost/create-rent-post.component';
import { RentPostDetailsComponent } from 'Components/Rentpost/rent-post-details.component';
import { SignupComponent } from 'Components/SignUp/signup.component';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/profile" element={<PrivateProfileComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/profile/:username" element={<OthersProfileComponent />} />
        <Route path="/create-rent-post" element={<CreateRentPostComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/rent-post/:id" element={<RentPostDetailsComponent />} />
      </Routes>
    </>
  );
}

export default App;
