import { configureStore } from "@reduxjs/toolkit";
import capitalReducer from "./capitals";

export default configureStore({
    reducer: {
        capitals: capitalReducer,
    },
})

