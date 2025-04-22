import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import useAppStore from "../../store/index";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPwMatched, setIsPwMatched] = useState(true);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      if (user.password !== confirmPassword) {
        setIsPwMatched(false);
        toast.error("password and confirm password not matched", {
          autoClose: 700,
        });
      } else {
        setIsPwMatched(true);
        // console.log(SIGNUP_ROUTE);
        // console.log(user);
        const response = await apiClient.post(SIGNUP_ROUTE, user);
        if (response.data.success) {
          toast.success(response.data.message);
          setUser({
            userName: "",
            email: "",
            password: "",
          });
          setConfirmPassword("");
          setUserInfo(response.data.user);
          // console.log(response);
          navigate("/profile");
        }
        // console.log(response);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message, { autoClose: 1000 });
    }
  };
  const handleLogin = async () => {
    try {
      const response = await apiClient.post(LOGIN_ROUTE, user);
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setUser({
          userName: "",
          email: "",
          password: "",
        });
        console.log(response);
        setUserInfo(response.data.user);
      }
      if (response.data.user._id) {
        if (!response.data.user.profileSetup) {
          navigate("/profile");
        } else {
          navigate("/chat");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
    }
  };
  return (
    <div className="bg-[#121212] text-white">
      <Navbar />
      <section className=" h-screen bg-[#121212] text-white flex flex-col gap-4 items-center justify-center">
        <div className=" md:hidden flex flex-col items-center justify-center">
          <img src={Logo} alt="" className="w-[100px]" />
          <h1 className="font-bold text-3xl">Chatsense</h1>
        </div>
        <Tabs
          defaultValue="signup"
          className="flex flex-col items-center justify-center border-2 border-purple-500 p-12"
        >
          <TabsList className="bg-[#121212] border-2 border-purple-500 flex justify-around py-6">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex items-start flex-col w-full mt-2">
                <label htmlFor="userName">Username</label>
                <input
                  value={user.userName}
                  type="text"
                  id="userName"
                  className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full bg-[#121212]"
                  name="userName"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-start flex-col w-full">
                <label htmlFor="email">Email</label>
                <input
                  value={user.email}
                  type="email"
                  id="email"
                  className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full bg-[#121212]"
                  name="email"
                  placeholder="chatsense@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-start flex-col justify-center w-full">
                <label htmlFor="password">Password</label>
                <div className="flex items-center justify-between w-full">
                  <input
                    value={user.password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full bg-[#121212]"
                    placeholder="*********"
                    onChange={handleChange}
                  />
                  <button
                    className="border-b-2 py-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="flex items-start flex-col justify-center w-full">
                <label htmlFor="cpassword">Confirm Password</label>
                <div className="flex items-center justify-between w-full">
                  <input
                    value={confirmPassword}
                    type={showPassword ? "text" : "password"}
                    id="cpassword"
                    className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full bg-[#121212]"
                    placeholder="*********"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />

                  <button
                    className="border-b-2 py-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              {!isPwMatched && <p>Password not matched</p>}
              <button
                className="border-4 rounded-4xl px-16 py-2 hover:bg-blue-950 hover:text-white"
                onClick={handleSignup}
              >
                Signup
              </button>
            </div>
          </TabsContent>
          <TabsContent value="login">
            <div className="flex flex-col items-center justify-center gap-6">
              
              <div className="flex items-start mt-4 flex-col w-full">
                <label htmlFor="email">Email/Username</label>
                <input
                  value={user.email}
                  type="text"
                  id="email"
                  className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full bg-[#121212]"
                  name="email"
                  placeholder="chatsense"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-start flex-col justify-center w-full">
                <label htmlFor="password">Password</label>
                <div className="flex items-center justify-between w-full">
                  <input
                    value={user.password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full bg-[#121212]"
                    placeholder="*******"
                    onChange={handleChange}
                  />
                  <button
                    className="border-b-2 py-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <button
                className="border-4 rounded-4xl px-16 py-2 hover:bg-blue-950 hover:text-white"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Auth;
