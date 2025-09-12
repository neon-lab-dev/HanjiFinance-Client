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
import Portfolio from "./../pages/Portfolio/Portfolio";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import RecentActivities from "../pages/Dashboard/RecentActivities/RecentActivities";
import Consultations from "../pages/Dashboard/Consultations/Consultations";
import BookConsultation from "../pages/Dashboard/BookConsultation/BookConsultation";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyCourses from "../pages/Dashboard/MyCourses/MyCourses/MyCourses";
import CoursesDetails from "../pages/Dashboard/MyCourses/MyCourses/[id]/Page";
import MySubscription from "../pages/Dashboard/MySubscription/MySubscription/MySubscription";
import PauseSubsrciption from "../pages/Dashboard/MySubscription/PauseSubsrciption/PauseSubsrciption";
import ReactivateSubscription from "../pages/Dashboard/MySubscription/ReactivateSubscription/ReactivateSubscription";
import CancelSubscription from "../pages/Dashboard/MySubscription/CancelSubsrciption/CancelSubsrciption";
import UpdateSubscription from "../pages/Dashboard/MySubscription/UpdateSubscription/UpdateSubscription";
import Courses from "../pages/Courses/Courses";
import ECommerce from "../pages/ECommerce/ECommerce";
import ProductDetails from "../pages/ProductsDetails/ProductsDetails";
import Login from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard/AdminDashboard";
import AdminProducts from "../pages/AdminDashboard/AdminProducts/AdminProducts";
import AdminOrders from "../pages/AdminDashboard/AdminOrders/AdminOrders";
import CourseDashboard from "../pages/AdminDashboard/CourseDashboard/CourseDashboard";
import UpdateLectures from "../components/AdminDashboard/Courses/UpdateLectures";
import ResetPassword from "../components/Auth/ResetPassword/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Newsletter from "../pages/AdminDashboard/Newsletter/Newsletter";
import AddOrEditProduct from "../pages/AdminDashboard/AddOrEditProduct/AddOrEditProduct";
import ManageCourseForm from "../pages/AdminDashboard/ManageCourseForm/ManageCourseForm";

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
        element: <Portfolio />,
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
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/fashion-and-apparels",
        element: <ECommerce />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "recent-activities",
        element: <RecentActivities />,
      },
      {
        path: "consultations",
        element: <Consultations />,
      },
      {
        path: "book-new-session",
        element: <BookConsultation />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "my-courses/:id",
        element: <CoursesDetails />,
      },
      {
        path: "my-subscriptions",
        element: <MySubscription />,
      },
      {
        path: "pause-subscription",
        element: <PauseSubsrciption />,
      },
      {
        path: "reactivate-subscription",
        element: <ReactivateSubscription />,
      },
      {
        path: "cancel-subscription",
        element: <CancelSubscription />,
      },
      {
        path: "update-subscription",
        element: <UpdateSubscription />,
      },
    ],
  },
  {
    path: "dashboard/admin",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "add-or-edit-product",
        element: <AddOrEditProduct />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "manage-course",
        element: <ManageCourseForm />,
      },
      {
        path: "courses",
        element: <CourseDashboard />,
      },
      {
        path: "update-lecture",
        element: <UpdateLectures />,
      },
    ],
  },
  {
    path: "admin",
    element: <Login />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
]);
