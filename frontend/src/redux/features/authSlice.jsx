import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosConfig"

const storedToken = localStorage.getItem("token")

const initialState = {
    isLoggedIn: !!storedToken,
    user: null,
    token: storedToken || null,
    status: "idle",
    error: null
}


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (registerData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/auth/register", registerData)
            const token = res.data.token
            localStorage.setItem("token", token)
            return token
        } catch (error) {
            return rejectWithValue(error.res?.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/auth/login", loginData)

            const token = res.data.token

            localStorage.setItem("token", token)

            return token;
        } catch (error) {
            return rejectWithValue(error.res?.data)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false,
                state.user = null,
                state.status = "idle",
                state.error = null

            localStorage.removeItem("token")
        }
    },

    extraReducers: (builder) => {
        builder


            .addCase(registerUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.isLoggedIn = true
                state.token = action.payload
                state.error = null
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                state.isLoggedIn = false
                state.error = action.payload
            })

            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.isLoggedIn = true
                state.token = action.payload
                state.error = null
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.isLoggedIn = false
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer