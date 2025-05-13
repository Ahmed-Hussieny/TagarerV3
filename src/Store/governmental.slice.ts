import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { IGovernmental } from "../Interfaces/governmental";

export const handleGetAllGovernmentals = createAsyncThunk("governmental/handleGetAllGovernmentals", async ({
    page,
    name = "",
    classification = ""
}: { page: number, name?: string, classification?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/governmental/getGovernmentalsForClient?page=${page}&classification=${classification}&name=${name}`, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});
export const handleGetMoreGovernmentals = createAsyncThunk("governmental/handleGetMoreGovernmentals", async ({
    page,
    name = "",
    classification = ""
}: { page: number, name?: string, classification?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/governmental/getGovernmentalsForClient?page=${page}&classification=${classification}&name=${name}`, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});
const guideSlice = createSlice({
    name: "governmental",
    initialState: {
        governmentals: [] as IGovernmental[],
        classifications: [] as string[],
        numberOfPages: 0,
        totalGovernmentals:0,
        loading: false,
        error: null,
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetAllGovernmentals.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            state.governmentals = action.payload?.governmentals.data;
            state.classifications = action.payload.governmentals.filterData?.classifications
            state.numberOfPages = action.payload.governmentals.totalPages;
            state.totalGovernmentals = action.payload.governmentals.totalGovernmentals
        });
        builder.addCase(handleGetAllGovernmentals.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleGetMoreGovernmentals.fulfilled, (state, action) => {
            state.loading = false;
            state.governmentals = [...state.governmentals, ...(action.payload?.governmentals ?? [])];
            state.numberOfPages = action.payload.governmentals?.numberOfPages;
        });
        builder.addCase(handleGetMoreGovernmentals.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default guideSlice.reducer;