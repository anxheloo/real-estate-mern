import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile, SignUp, Home, About, Signin } from "./pages/index";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="sign-in" element={<Signin></Signin>} />
        <Route path="sign-up" element={<SignUp></SignUp>} />
        <Route path="about-us" element={<About></About>} />
        <Route path="listing/:id" element={<Listing></Listing>} />
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/profile" element={<Profile></Profile>} />
          <Route
            path="/create-listing"
            element={<CreateListing></CreateListing>}
          />
          <Route
            path="/update-listing/:id"
            element={<EditListing></EditListing>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
