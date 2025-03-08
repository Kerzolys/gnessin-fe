import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Admin } from "./modules/admin/admin";

import "./App.css";
import { MainEvent } from "./modules/admin/mainEvent/mainEvent";
import { Videos } from "./modules/admin/videos/videos";
import { Social } from "./modules/admin/social/social";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/hero" element={<MainEvent />}></Route>
        <Route path="/admin/videos" element={<Videos />}></Route>
        <Route path="/admin/social" element={<Social />}></Route>


      </Routes>
    </>
  );
}

export default App;
