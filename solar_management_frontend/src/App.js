import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SalesDashboard from "./components/SalesDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
