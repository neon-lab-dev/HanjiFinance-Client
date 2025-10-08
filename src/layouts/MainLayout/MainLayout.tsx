import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import AuthModal from "../../components/Auth/AuthModal/AuthModal";
import OfferHeader from "../../components/Shared/Navbar/OfferHeader";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div>
      <AuthModal />
      {location.pathname === "/fashion-and-apparels" && <OfferHeader />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
