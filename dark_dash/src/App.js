import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import { useContext, useEffect, useState } from "react";
import LoadingBar from "react-loading-bar";
import { notecontext } from "./components/notecontext";
import { useTheme } from "./components/ThemeContext";

const AuthGuard = ({ children }) => {
  const { Auth } = useContext(notecontext);
  const { islogin, setislogin } = Auth;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      setislogin(true);
    } else {
      navigate("/login");
    }
  }, [setislogin, navigate]);

  if (!islogin) {
    // return null;
    navigate("/login");
  }

  return children;
};

function App() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <LoadingBar progress={progress} height={3} color="#f11946" />
                <div
                  className="container-screen"
                  style={{
                    userSelect: "none",
                    backgroundColor: theme === "light" ? "floralwhite" : "",
                  }}
                >
                  <SideBar />
                  <div className="container-fluid">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/complaints" element={<ComplaintsTable />} />
                    </Routes>
                  </div>
                </div>
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
