import { Outlet } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import AuthModal from "../../components/Auth/AuthModal/AuthModal";

const MainLayout = () => {
  return (
    <div>
      <AuthModal/>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
