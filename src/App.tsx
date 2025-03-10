import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Admin } from "./modules/admin/admin";

import "./App.css";
import { MainEvent } from "./modules/admin/mainEvent/mainEvent";
import { Videos } from "./modules/admin/videos/videos";
import { Social } from "./modules/admin/social/social";
import { Photos } from "./modules/admin/photos/photos";
import { News } from "./modules/admin/news/news";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/hero" element={<MainEvent />}></Route>
        <Route path="/admin/videos" element={<Videos />}></Route>
        <Route path="/admin/photos" element={<Photos />}></Route>
        <Route path="/admin/social" element={<Social />}></Route>
        <Route path="/admin/news" element={<News />}></Route>
      </Routes>
    </>
  );
}

export default App;
