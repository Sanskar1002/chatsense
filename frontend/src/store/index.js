import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createChatSlice } from "./slices/chatSlice";

const useAppStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));

export default useAppStore;
