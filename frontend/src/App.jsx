import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-blue/theme.css"; // You can change the theme if desired
import "primereact/resources/primereact.min.css"; // Core CSS for PrimeReact components
import "primeicons/primeicons.css";
import "/src/assets/css/style.css";

// Import the necessary components
import CreateBusiness from "./containers/CreateBusiness";
import Business from "./containers/Business";
import Testimonials from "./containers/Testimonials";
import Template from "./containers/Template";
import PremiumTemplate from "./containers/PremiumTemplate";
import TermsAndConditions from "./components/Business/TermsAndConditions";
import BusinessTermsAndConditions from "./components/Business/BusinessTermsAndConditions";

// Lazy loading components
const Home = lazy(() => import("./containers/Home"));

// const CreateBusiness = lazy(() => import("./containers/CreateBusiness"));
// const Business = lazy(() => import("./containers/Business"));
// const Testimonials = lazy(() => import("./containers/Testimonials"));
// const Template = lazy(() => import("./containers/Template"));
// const PremiumTemplate = lazy(() => import("./containers/PremiumTemplate"));
// const TermsAndConditions = lazy(() =>
//   import("./components/Business/TermsAndConditions")
// );
// const BusinessTermsAndConditions = lazy(() =>
//   import("./components/Business/BusinessTermsAndConditions")
// );

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/create-business", element: <CreateBusiness /> },
  { path: "/reviews", element: <Testimonials /> },
  { path: "/business", element: <Business /> },
  { path: "/business/:id", element: <Business /> },
  { path: "/template/:id", element: <Template /> },
  { path: "/template/premium/:id", element: <PremiumTemplate /> },
  { path: "/terms-and-conditions", element: <TermsAndConditions /> },
  {
    path: "/terms-and-conditions/:id",
    element: <BusinessTermsAndConditions />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
