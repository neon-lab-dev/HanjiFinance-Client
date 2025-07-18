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
    ],
  },
]);