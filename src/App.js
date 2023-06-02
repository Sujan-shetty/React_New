import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeInput from './components/Employee';
import AppIn from './components/product';

function App() {
  const handleFormData = (data) => {
    // Handle the form data
    console.log(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/display" element={<AppIn />} />
        <Route path="/" element={<EmployeeInput handleFormData={handleFormData} />} />
      </Routes>
    </Router>
  );
}

export default App;
