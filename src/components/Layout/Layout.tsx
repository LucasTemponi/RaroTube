import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout = () => (
  <>
    <Navbar />
    <Sidebar>
    <main>
      <Outlet />
    </main>
    </Sidebar>
  </>
);