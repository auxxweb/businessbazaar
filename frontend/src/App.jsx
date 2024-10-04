
import Home from './containers/Home';
import CreateBusiness from './containers/CreateBusiness';
import Business from './containers/Business';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';  // You can change the theme if desired
import 'primereact/resources/primereact.min.css';          // Core CSS for PrimeReact components

// PrimeIcons CSS
import 'primeicons/primeicons.css';         
import '/src/assets/css/style.css';
import Template from './containers/Template';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-business" element={<CreateBusiness />} />
        <Route path="/business" element={<Business />} />
        <Route path="/template/:id" element={<Template />} />
      </Routes>
    </Router>
  );
}

export default App;
