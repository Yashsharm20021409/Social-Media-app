import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/Leftbar"
import RightBar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {

  const { currentUser } = useContext(AuthContext)
  const { darkMode } = useContext(DarkModeContext)
  const queryClient = new QueryClient();


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };


  // till now we have used other way for react-router-dom but the problem is for everypage we have to write diff path
  // here we can use outlet by using that we can use children path also and reuse components efficiently and if we
  // want to make some change it become easy using this way for eaxmple dark theme we used here only we have to 
  // maintain it on one page otherwise we have to write same code on different components


  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    // if logged in return children which is layout here
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        // anything written inside protectedRoute will get checked by protectedRoute function here layout act as an children
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      // this is the attribute though which we can navigate on diff pages without extra code
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
      ]
    },
    {
      path: '/login',
      element: (currentUser === null ? <Login /> : "already logged in")
    },
    {
      path: '/register',
      element: (currentUser === null ? <Register /> : "already logged in")
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
