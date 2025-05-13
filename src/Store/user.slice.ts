import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { LoginFormValues, RegisterFormValues } from "../Interfaces/auth";
import { ApiErrorResponse } from "../Interfaces/error";
import { Seo } from '../Interfaces/seo';
export const handleLogin = createAsyncThunk("auth/handleLogin", async (data: LoginFormValues) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/signin`, data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleRegister = createAsyncThunk("auth/handleRegister", async (data: RegisterFormValues) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/signup`, data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelVerifyEmail = createAsyncThunk("auth/HandelVerifyEmail", async (token: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/verifyEmail?userToken=${token}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelresendVerificationEmail = createAsyncThunk("auth/HandelresendVerificationEmail", async (token: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/resendVerificationEmail`, { token });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelForgotPassword = createAsyncThunk("auth/HandelForgotPassword", async (email: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/forgotPassword`, { email });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelResetPassword = createAsyncThunk("auth/HandelResetPassword", async ({ token, newPassword }: { token: string, newPassword: string }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/resetPassword`, { token, newPassword });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelVerifyResetCode = createAsyncThunk("auth/HandelVerifyResetCode", async ({ token }: { token: string}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/verifyResetToken?token=${token}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandleUpdateLoggedInUser = createAsyncThunk("auth/HandleUpdateLoggedInUser", async (data: {username:string, email:string}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/client-user/updateLoggedInUser`, data,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandleUpdateLoggedInPassword = createAsyncThunk("auth/HandleUpdateLoggedInPassword", async (data: {oldPassword:string, newPassword:string}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/client-user/updateLoggedInUserPassword`, data,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const checkIfUserSubscribed = createAsyncThunk("auth/checkIfUserSubscribed", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/client-user/checkUserSubscription`,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});

export const HandleDeleteLoggedInUser = createAsyncThunk("auth/HandleDeleteLoggedInUser", async () => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/client-user/deleteLoggedInUser`,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});

export const handleGetLoggedInUser = createAsyncThunk("auth/handleGetLoggedInUser", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/client-user/getLoggedInUser`,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});

export const handleGetSeo = createAsyncThunk("auth/handleGetSeo", async ({id}:{
    id:string
}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/seo/getSeo/${id}`);
        return response.data;

    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});

export const handleSubscribe = createAsyncThunk("auth/handleSubscribe", async ({
    email,
    reportSources,
    geographicalScope,
    reportCategories,
    aiSummaries,
    userType,
    additionalPreferences,
    subscriptionFrequency
}:{
    email: string,
    reportSources?: string,
    geographicalScope?: string,
    reportCategories?: string[],
    aiSummaries?: boolean,
    userType?: string,
    additionalPreferences?: string,
    subscriptionFrequency?: string
}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/news-email/createNewsEmail`, { email,
            reportSources,
            geographicalScope,
            reportCategories,
            aiSummaries,
            userType,
            additionalPreferences,
            subscriptionFrequency });
        console.log(response)
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        loading: false,
        SeoData :{} as Seo,
        error: null,
        currentPath : "",
        activeNumber: 1,
        maxNumberOfReports: 0,
    },
    reducers: {
        changeCurrentPath(state, action) {
            state.loading = true;
            state.currentPath = action.payload; 
        },
        changeActiveNav(state, action) {
            state.activeNumber = action.payload;
        },
        setMaxNumberOfReports(state, action) {
            state.maxNumberOfReports = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(handleLogin.rejected, (state) => {
            state.loading = false;
        });

        //^ handleRegister
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(handleRegister.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelVerifyEmail
        builder.addCase(HandelVerifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelVerifyEmail.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelresendVerificationEmail
        builder.addCase(HandelresendVerificationEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelresendVerificationEmail.rejected, (state) => {
            state.loading = false
        });

        //^ HandelForgotPassword
        builder.addCase(HandelForgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelForgotPassword.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelResetPassword
        builder.addCase(HandelResetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelResetPassword.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelVerifyResetCode
        builder.addCase(HandelVerifyResetCode.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelVerifyResetCode.rejected, (state) => {
            state.loading = false;
        });

        //^ HandleUpdateLoggedInUser
        builder.addCase(HandleUpdateLoggedInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandleUpdateLoggedInUser.rejected, (state) => {
            state.loading = false;
        });

        //^ HandleUpdateLoggedInPassword
        builder.addCase(HandleUpdateLoggedInPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandleUpdateLoggedInPassword.rejected, (state) => {
            state.loading = false;
        });

        //^ checkIfUserSubscribed
        builder.addCase(checkIfUserSubscribed.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(checkIfUserSubscribed.rejected, (state) => {
            state.loading = false;
        });

        //^ handleGetLoggedInUser
        builder.addCase(handleGetLoggedInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(handleGetLoggedInUser.rejected, (state) => {
            state.loading = false;
        });

        //^HandleDeleteLoggedInUser
        builder.addCase(HandleDeleteLoggedInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandleDeleteLoggedInUser.rejected, (state) => {
            state.loading = false;
        });

        //^ handleGetSeo
        builder.addCase(handleGetSeo.fulfilled, (state, action) => {
            state.loading = false;
            state.SeoData = action.payload.data;
        });
        builder.addCase(handleGetSeo.rejected, (state) => {
            state.loading = false;
        });

        //^ handleSubscribe
        builder.addCase(handleSubscribe.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
        });
        builder.addCase(handleSubscribe.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default userSlice.reducer;
export const { changeCurrentPath, changeActiveNav, setMaxNumberOfReports } = userSlice.actions;