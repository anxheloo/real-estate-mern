import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile, SignUp, Home, About, Signin } from "./pages/index";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="sign-in" element={<Signin></Signin>} />
        <Route path="sign-up" element={<SignUp></SignUp>} />
        <Route path="about-us" element={<About></About>} />
        <Route path="profile" element={<Profile></Profile>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
