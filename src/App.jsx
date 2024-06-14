import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/Login.jsx"; // Import the Login component
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Add route for login */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/event/:id" element={<EventDetails />} />
              </Routes>
            </ProtectedRoute>
          }
        />
    </Router>
  );
}

export default App;
