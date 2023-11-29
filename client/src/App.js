import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/Leftbar"
import RightBar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";


function App() {

  const currentUser = true;


  const Layout = () => {
    return (
      <div >
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div >
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };


  // till now we have used other way for react-router-dom but the problem is for everypage we have to write diff path
  // here we can use outlet by using that we can use children path also and reuse components efficiently and if we
  // want to make some change it become easy using this way for eaxmple dark theme we used here only we have to 
  // maintain it on one page otherwise we have to write same code on different components


  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
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
          path: "/profile/:id",
          element: <Profile />,
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
