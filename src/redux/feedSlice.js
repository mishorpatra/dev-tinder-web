import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: [],
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => null,
        removeUserFromFeed: (state, action) => {
            let newState = state.filter(elm => elm._id !== action.payload)
            return newState
        }
    }
})

export default feedSlice.reducer
export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions