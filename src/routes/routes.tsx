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
import CourseDashboard from "../pages/AdminDashboard/CourseDashboard/CourseDashboard";
import ResetPassword from "../components/Auth/ResetPassword/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Newsletter from "../pages/AdminDashboard/Newsletter/Newsletter";
import AddOrEditProduct from "../pages/AdminDashboard/AddOrEditProduct/AddOrEditProduct";
import ManageCourseForm from "../pages/AdminDashboard/ManageCourseForm/ManageCourseForm";
import ManageLectures from "../pages/AdminDashboard/CourseDashboard/ManageLectures/ManageLectures";
import ManageConsultations from "../pages/AdminDashboard/ManageConsultations/ManageConsultations";
import ManageSubscriptions from "../pages/AdminDashboard/ManageSubscriptions/ManageSubscriptions";
import Cart from "../pages/Cart/Cart";
import CoursePayment from "../pages/CoursePayment/CoursePayment";
import ProductOrders from "../pages/AdminDashboard/ProductOrders/ProductOrders";
import CourseOrders from "../pages/AdminDashboard/CourseOrders/CourseOrders";
import CouponCode from "../pages/AdminDashboard/CouponCode/CouponCode";
import CourseLectures from "../pages/Dashboard/MyCourses/CourseLectures/CourseLectures";
import ChatAndChillPayment from "../pages/ChatAndChillPayment/ChatAndChillPayment";
import Category from "../pages/AdminDashboard/Category/Category";
import ManageAvailability from "../pages/AdminDashboard/ManageAvailability/ManageAvailability";
import Queries from "../pages/AdminDashboard/Queries/Queries";
import HelpDesk from "../pages/HelpDesk/HelpDesk";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import CourseExam from "../pages/Dashboard/MyCourses/CourseExam/CourseExam";
import ResultPage from "../pages/Dashboard/MyCourses/ResultPage/ResultPage";
import ComingSoon from "../pages/ComingSoon/ComingSoon";
import ContactUs from "../pages/ContactUs/ContactUs";
import ManageExam from "../pages/AdminDashboard/ManageExam/ManageExam";

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
        path: "/coming-soon",
        element: <ComingSoon />,
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
        path: "/advisor-services",
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
        path: "/payment/failed/:id",
        element: <PaymentCancelled />,
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
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/course-payment/:id",
        element: <CoursePayment />,
      },
      {
        path: "/chat-and-chill-payment",
        element: <ChatAndChillPayment />,
      },
      {
        path: "/course-details/:id",
        element: <CourseDetails />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
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
        element: <CourseLectures />,
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
      {
        path: "helpdesk",
        element: <HelpDesk />,
      },
      {
        path: "attend-exam/:id",
        element: <CourseExam />,
      },
      {
        path: "exam-result/:id",
        element: <ResultPage />,
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
        path: "category",
        element: <Category />,
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
        path: "product-orders",
        element: <ProductOrders />,
      },
      {
        path: "course-orders",
        element: <CourseOrders />,
      },
      
      {
        path: "courses",
        element: <CourseDashboard />,
      },
      {
        path: "manage-course",
        element: <ManageCourseForm />,
      },
      {
        path: "manage-lectures/:id",
        element: <ManageLectures />,
      },
      {
        path: "manage-exam/:courseId",
        element: <ManageExam />,
      },
      {
        path: "manage-availability",
        element: <ManageAvailability />,
      },
      {
        path: "manage-consultations",
        element: <ManageConsultations />,
      },
      {
        path: "manage-coupon-codes",
        element: <CouponCode />,
      },
      {
        path: "manage-subscriptions",
        element: <ManageSubscriptions />,
      },
      {
        path: "queries",
        element: <Queries />,
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
