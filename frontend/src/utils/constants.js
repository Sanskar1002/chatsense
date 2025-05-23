// use for connectiong with backends and we need to change this only without worring about chnaging it in all places
export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTE = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTE}/update-profile`;
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTE}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTE}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

export const CONTACTS_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-contacts-for-dm`;

export const MESSAGES_ROUTES = "api/messages";
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-file`;
