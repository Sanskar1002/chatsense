import React, { useEffect } from "react";
import Logo from "../../../../assets/logo.png";
import ProfileInfo from "./components/profile-info/Index";
import NewDM from "./components/new-dm/Index";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import useAppStore from "@/store";
import ContactList from "@/components/ContactList";

const ContactsContainer = () => {
  const {
    setDirectMessagesContactList,
    directMessagesContactList,
    selectedChatMessages,
    addMessage,
  } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_DM_CONTACTS_ROUTES);
        // console.log(response);
        setDirectMessagesContactList(response.data.contacts);
        // console.log(directMessagesContactList);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getContacts();
  }, [selectedChatMessages, addMessage]);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="flex items-center p-6 gap-2">
        <img src={Logo} alt="logo" className="w-16" />
        <h1 className="text-3xl font-semibold">ChatSense</h1>
      </div>

      <div className="my-5 ">
        <div className="flex items-center justify-between pr-10 ">
          <Title text={"Direct Messages"} />
          <NewDM />
        </div>
        <div className="max-h-[24vh] overflow-y-auto scrollbar-hidden">
          <ContactList dmContactList={directMessagesContactList} />
        </div>
      </div>
      <div className="my-5 ">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Channels"} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

// //   export default Logo;
