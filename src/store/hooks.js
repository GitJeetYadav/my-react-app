import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'data',
    initialState: {
        isLoggedIn: false,
        user: null,
        userRole: "admin",
        userDataList: [],
        loggedInData: {}
    },
    reducers: {
        setIsLoggedIn: (state, { payload }) => {
            state.isLoggedIn = payload;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setUserRole: (state, { payload }) => {
            state.userRole = payload;
        },
        setLoggedInData: (state, { payload }) => {
            state.loggedInData = payload;
        },
        setUserDataList: (state, { payload }) => {
            state.userDataList = payload;
        },
        addUserData: (state, { payload }) => {
            const temp = [...state.userDataList, payload]
            state.userDataList = temp;
        },
        editUserData: (state, { payload }) => {
            const temp = [...state.userDataList];
            const index = temp.findIndex(x => x.id === payload.id);
            if (index !== -1) {
                temp[index] = payload
            }
            state.userDataList = temp;
        }
    }
})

//Export actions
export const { setIsLoggedIn, setUser, setUserRole, setLoggedInData, setUserDataList, addUserData, editUserData } = slice.actions;

//Export selectors
export const getIsLoggedIn = (state) => state.data.isLoggedIn;
export const getUser = (state) => state.data.user;
export const getUserRole = (state) => state.data.userRole;
export const getUserDataList = (state) => state.data?.userDataList;
export const getLoggedInData = (state) => state.data.loggedInData;



export default slice;