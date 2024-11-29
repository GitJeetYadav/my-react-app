import { configureStore } from "@reduxjs/toolkit";
import slice from "./hooks";
const store = configureStore({
    reducer: {
        'data': slice.reducer
    }
});

export default store;
