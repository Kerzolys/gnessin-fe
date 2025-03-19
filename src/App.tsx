import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Admin } from "./modules/admin/admin";

import "./App.css";
import { MainEvent } from "./modules/admin/mainEvent/mainEvent";
import { Videos } from "./modules/admin/videos/videos";
import { Social } from "./modules/admin/social/social";
import { Photos } from "./modules/admin/photos/photos";
import { News } from "./modules/admin/news/news";
import { Festivals } from "./modules/admin/festivals/festivals";
import { About } from "./pages/about/About";
import { AdminContacts } from "./modules/admin/admin-contacts/admin-contacts";
import { ContactsPage } from "./pages/contacts/Contacts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contacts" element={<ContactsPage />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/hero" element={<MainEvent />}></Route>
        <Route path="/admin/videos" element={<Videos />}></Route>
        <Route path="/admin/festivals" element={<Festivals />}></Route>
        <Route path="/admin/news" element={<News />}></Route>
        <Route path="/admin/photos" element={<Photos />}></Route>
        <Route path="/admin/social" element={<Social />}></Route>
        <Route path="/admin/contacts" element={<AdminContacts />}></Route>
        {/* <Route path="/admin/event" element={<Event />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
