import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AdminAuthProvider } from "./context/adminAuthContext"; 
import { AnimatePresence } from "framer-motion";
import SignIn from "./pages/AuthPages/SignIn";
import ForgotPassword from "./components/auth/forgotPasswordForm";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import UploadPage from "./pages/uploadPage";
import ReferralTreePage from "./pages/userTree";
import UserAnalytics from "./pages/userAnaliticalPage";
import UserTableAnalytical from "./components/tables/UserTabel/userAnaliticalTable";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import { ScrollToTop } from "./components/common/ScrollToTop";
import UserFeedReportTable from "./components/tables/UserTabel/userReportTable";
import ChildAdminForm from "./components/auth/childAdminCreationForm";
import CreatorTable from "./components/tables/UserTabel/creatorTable";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password" element={<ForgotPassword />} />

        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/admin/upload/page" element={<UploadPage />} />
          <Route path="/tree" element={<ReferralTreePage />} />
          <Route path="/user/analitical/page/:userId" element={<UserAnalytics />} />
          <Route path="/user/analitical/table" element={<UserTableAnalytical />} />
          <Route path="/referal/tree/page/:userId" element={<ReferralTreePage />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/creator/trending/table" element={<CreatorTable/>}/>
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="/user-reportinfo" element={<UserFeedReportTable/>}/>
           <Route path="/child/admin/creation" element={<ChildAdminForm/>} />
  
          
        </Route>
           {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </AdminAuthProvider>
  );
}
