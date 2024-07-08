// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
// import Home from './Home'; // Import your Home component
import UploadForm from './Upload'; // Import your UploadForm component
// import Services from './Services'; // Import your Services component
// import Submenu1 from './Submenu1'; // Import your Submenu1 component
// import Submenu2 from './Submenu2'; // Import your Submenu2 component
// import Submenu3 from './Submenu3'; // Import your Submenu3 component
// import Portfolio from './Portfolio'; // Import your Portfolio component
import Signin from './Signin'; // Import your Signin component
import Display from './Display';
import Home from './Home';
import Contact from './Contact';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/upload" element={<UploadForm />} />
        {/* <Route path="/services" element={<Services />}>
          <Route path="submenu-1" element={<Submenu1 />} />
          <Route path="submenu-2" element={<Submenu2 />} />
          <Route path="submenu-3" element={<Submenu3 />} />
        </Route> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/display" element={<Display />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
