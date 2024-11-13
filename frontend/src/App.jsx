import Home from './containers/Home'
import {CreateBusiness } from './containers/CreateBusiness';
import Business from './containers/Business'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css' // You can change the theme if desired
import 'primereact/resources/primereact.min.css' // Core CSS for PrimeReact components



import 'primeicons/primeicons.css';         
import '/src/assets/css/style.css';
import Testimonials from './containers/Testimonials';
import 'primeicons/primeicons.css'
import '/src/assets/css/style.css'
import Template from './containers/Template'
import PremiumTemplate from './containers/PremiumTemplate'
import TermsAndConditions from './components/Business/TermsAndConditions'
import BusinessTermsAndConditions from './components/Business/BusinessTermsAndConditions'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const htmlContent = `
  <p>Welcome to Our Web Application!</p>
  <h2>1. Introduction</h2>
  <p>
    By accessing this website, you agree to comply with these terms and
    conditions. If you disagree with any part of these terms, please do not
    use our website.
  </p>
  <h2>2. License</h2>
  <p>
    Unless otherwise stated, we own the intellectual property rights for all
    material on our site. You may access this material for personal use
    only, subject to restrictions set in these terms.
  </p>
  <h2>3. User Comments</h2>
  <p>
    Certain parts of this website offer users the ability to post and
    exchange opinions. We do not filter, edit, publish, or review comments
    before their presence on the website.
  </p>
  <p class="footer-note">
    For any questions regarding these terms, please contact us at
    support@example.com.
  </p>
`;
  return (
    <Router>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-business" element={<CreateBusiness />} />
        <Route path="/reviews" element={<Testimonials />} />
        <Route path="/business/" element={<Business />} />
        <Route path="/business/:id" element={<Business />} />
        <Route path="/template/:id" element={<Template />} />
        <Route path="/template/premium/:id" element={<PremiumTemplate />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path='/terms-and-conditions/:id' element={<BusinessTermsAndConditions />} />
      </Routes>
    </Router>
  )
}

export default App
