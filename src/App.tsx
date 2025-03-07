import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Admin } from "./modules/admin/admin";

import "./App.css";
import { MainEvent } from "./modules/admin/mainEvent/mainEvent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/hero" element={<MainEvent />}></Route>
      </Routes>
    </>
  );
}

export default App;
