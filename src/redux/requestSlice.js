import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => null,
        removeRequest: (state, action) => {
            let newState = state.filter(elm => elm._id !== action.payload)
            return newState
        }
    }
})

export default requestSlice.reducer
export const { addRequests, removeRequests, removeRequest } = requestSlice.actions