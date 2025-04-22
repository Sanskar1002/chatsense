export const createChatSlice = (set, get) => ({
  selectedChatType: undefined, // channel / contact
  selectedChatData: undefined, // selected contact data
  selectedChatMessages: [], // chat between them
  directMessagesContactList: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setDirectMessagesContactList: (directMessagesContactList) =>
    set({ directMessagesContactList }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient // when channel whole data of sender
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  unreadMessages: {},
  setUnreadMessages: (newUnread) =>
    set((state) => ({
      unreadMessages: { ...state.unreadMessages, ...newUnread },
    })),
  updateLastMessage: (contactId, message) =>
    set((state) => {
      const newUnread = { ...state.unreadMessages };
      if (!state.selectedChatData || state.selectedChatData._id !== contactId) {
        newUnread[contactId] = message;
      }
      return {
        unreadMessages: newUnread,
      };
    }),
  clearUnreadMessage: (contactId) =>
    set((state) => {
      const newUnread = { ...state.unreadMessages };
      delete newUnread[contactId];
      return { unreadMessages: newUnread };
    }),

  // updated part
});
