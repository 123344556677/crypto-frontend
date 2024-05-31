import "./App.css";

import routes from "./Routes/routes";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthorizeLayout from "./Layout/Authorize.Layout";
import WebsiteLayout from "./Layout/website.layout";

import { Auth } from "./context/Auth.Context";
// import Navbar from "./Components/Navbar";
// import CustomNavbar from "./Components/Navbar";

function App() {
  const { isAuthenticated } = Auth();

  return (
    <div>
      <Router>
        <Routes>
          <Route
            element={
              <AuthorizeLayout>
                <Outlet />
              </AuthorizeLayout>
            }
          >
            {routes.map(
              (featu) =>
                featu.type == "public" && (
                  <Route
                    element={featu.element}
                    path={featu.path}
                    exact={featu}
                  />
                )
            )}
          </Route>

          <Route
            element={
              <WebsiteLayout>
                <Outlet />
              </WebsiteLayout>
            }
          >
            {isAuthenticated &&
              routes.map(
                (featu) =>
                  featu.type == "private" && (
                    <Route
                      element={featu.element}
                      path={featu.path}
                      exact={featu}
                    />
                  )
              )}
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
