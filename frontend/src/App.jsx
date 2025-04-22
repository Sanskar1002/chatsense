import React, { useState } from "react";
import { Button } from "./components/ui/button";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/auth/Index";
import Chat from "./pages/chat/Index";
import Profile from "./pages/profile/Index";
import useAppStore from "./store";
import { useEffect } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import { toast } from "react-toastify";
import App2 from "./App2";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthanticated = !!userInfo;
  return isAuthanticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthanticated = !!userInfo;
  return isAuthanticated ? <Navigate to="/chat" /> : children;
};
const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO);
        // console.log(response);
        if (response.status === 200) {
          setUserInfo(response.data.user);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        // toast.error(error.response.data.message);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      } 
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<App2/>
    },
    {
      path: "/auth",
      element: (
        <AuthRoute>
          <Auth />
        </AuthRoute>
      ),
    },
    {
      path: "/chat",
      element: (
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to={"/auth"} />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default App;
