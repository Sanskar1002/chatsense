import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import useAppStore from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo,setUserInfo } = useAppStore();

  const logout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE);
      if (response.data.success) {
        toast.success(response.data.message);
        setUserInfo(null)
        navigate("/auth");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // console.log(userInfo._id)
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-5 gap-5 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative  ">
          <Avatar className="overflow-hidden  h-12 w-12  rounded-full ">
            {userInfo.profImage ? (
              <AvatarImage
                src={`${HOST}/${userInfo.profImage}`}
                alt="profile"
                className="object-cover w-full h-full bg-black rounded-full"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 border-[1px] text-lg flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.userName.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>

        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : " "}
        </div>
      </div>

      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoLogOut
                className="text-red-500 text-xl font-medium"
                onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
