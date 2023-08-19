import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

const store = configureStore({
    reducer : {
        todosState : todoReducer
    },
});

export default store;