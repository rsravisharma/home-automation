import { createSlice } from '@reduxjs/toolkit'
const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        update(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        reset() {
            return {
                accessToken: null,
                refreshToken: null
            }
        }
    },
})
const { actions, reducer } = AuthSlice;
export const AuthActions = actions;
export default reducer;