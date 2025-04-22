import React, { useEffect, useRef, useState } from "react";
import useAppStore from "../../store/index";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE,
  HOST,
  REMOVE_PROFILE_IMAGE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profImage, setProfImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }

    if (userInfo.profImage) {
      setProfImage(`${HOST}/${userInfo.profImage}`);
    }
  }, [userInfo]);

  const saveChanges = async () => {
    try {
      const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {
        firstName,
        lastName,
        color: selectedColor,
      });

      if (response.data.success) {
        setUserInfo(response.data.user);
        toast.success(response.data.message);
        navigate("/chat");
      }
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0];
      console.log({ file });
      if (file) {
        const formData = new FormData();
        // console.log(formData);
        formData.append("profile-image", file);
        console.log(formData);
        const response = await apiClient.post(ADD_PROFILE_IMAGE, formData);
        console.log(response);
        if (response.data.success) {
          setUserInfo({ ...userInfo, profImage: response.data.profImage });
          console.log(userInfo);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // console.log(file);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE);
      if (response.data.success) {
        setUserInfo({ ...userInfo, profImage: null });
        toast.success(response.data.message);
        setProfImage(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    // whole page
    <div className="bg-[#1b1c24] h-[100vh] flex justify-center items-center flex-col gap-10">
      {/* profile box */}
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        {/* back arrow  */}
        <button onClick={() => navigate("/chat")}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </button>
        {/* photo + detail + */}
        <div className="grid grid-cols-2">
          {/* profile photo circle */}
          <div
            className="h-full w-full md:w-60 md:h-60 relative flex items-center justify-center  "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="overflow-hidden  h-32 w-32 md:w-48 md:h-48 rounded-full ">
              {profImage ? (
                <AvatarImage
                  src={profImage}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 border-[1px] text-5xl flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.userName.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute text-white text-2xl  flex  justify-center items-center bg-black/50  ring-fuchsia-50 rounded-full h-32 w-32 md:w-48 md:h-48"
                onClick={profImage ? handleDeleteImage : handleFileInputClick}
              >
                {profImage ? <FaTrash /> : <FaPlus />}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpeg, .jpg, .svg, .webp"
            />
          </div>
          {/* unser detail side */}
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white/50 outline-2"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
