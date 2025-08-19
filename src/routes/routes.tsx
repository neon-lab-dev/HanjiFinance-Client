import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import RefundAndCancellationPolicy from "../pages/RefundAndCancellationPolicy/RefundAndCancellationPolicy";
import AboutUs from "../pages/AboutUs/AboutUs";
import ClientGrievance from "../pages/ClientGrievance/ClientGrievance";
import BoardroomBanter from "../pages/BoardroomBanter/BoardroomBanter";
import WallStreetWeekly from "../pages/WallStreetWeekly/WallStreetWeekly";
import ChatAndChill from "../pages/ChatAndChill/ChatAndChill";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../pages/PaymentCancelled/PaymentCancelled";
import Portfolio from './../pages/Portfolio/Portfolio';
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import RecentActivities from "../pages/Dashboard/RecentActivities/RecentActivities";
import Consultations from "../pages/Dashboard/Consultations/Consultations";
import BookConsultation from "../pages/Dashboard/BookConsultation/BookConsultation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/refund-cancellation-policy",
        element: <RefundAndCancellationPolicy />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/client-grievance-mechanism",
        element: <ClientGrievance />,
      },
      {
        path: "/services/boardroom-banter",
        element: <BoardroomBanter />,
      },
      {
        path: "/services/wall-street-weekly",
        element: <WallStreetWeekly />,
      },
      {
        path: "/services/chat-and-chill",
        element: <ChatAndChill />,
      },
      {
        path: "/portfolio",
        element: <Portfolio/>,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "recent-activities",
        element: <RecentActivities/>,
      },
      {
        path: "consultations",
        element: <Consultations/>,
      },
      {
        path: "book-new-session",
        element: <BookConsultation/>,
      },
      
    ],
  },
]);