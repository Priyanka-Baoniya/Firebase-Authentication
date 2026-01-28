import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>

     {/* BrowserRouter wraps the entire app It listens to URL changes and renders pages accordingly */}
      <BrowserRouter>
      <Routes> {/* Routes acts as a switch that renders the first matching route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;