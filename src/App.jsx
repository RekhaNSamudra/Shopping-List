import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import List from "./Components/Home";
import AddItem from "./Components/AddItem";
import Update from "./Components/Edit";

function App() {
  return (
    <>
      <div>
        <div className="fs-1 text-center mb-3 p-5" >Shopping List App</div>
        <Router>
          <Routes>
            <Route exact path="/" element={<AddItem />} />
            <Route path="/list" element={<List />} />
            <Route exact path="/edit/:id" element={<Update />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
