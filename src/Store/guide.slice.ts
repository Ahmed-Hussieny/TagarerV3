import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Guide } from "../Interfaces/guide";
export const handleGetAllGuides = createAsyncThunk("guide/handleGetAllGuides", async ({
    page,
    classification = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, classification?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/guide/GetALLGuidesClient?page=${page}&custom=${custom}&classification=${classification}&source=${source}&year=${year}`, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handelLoadMoreGuides = createAsyncThunk("guide/handelLoadMoreGuides", async ({
    page,
    classification = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, classification?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/guide/GetALLGuidesClient?page=${page}&custom=${custom}&classification=${classification}&source=${source}&year=${year}`, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    }
    catch (error) {

        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});

export const handleDownloadGuide = createAsyncThunk(
    "guide/handleDownloadGuide",
    async (id: string, { dispatch }) => {
        console.log(id);
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL_WS_RECONNECT}/uploads/Original_PDFs/Guides/${id}`, {
                headers: {
                    accesstoken: `Bearer_${localStorage.getItem("userToken")}`,
                },
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {

                    const percentCompleted = Math.round(
                        progressEvent.total ? (progressEvent.loaded * 100) / progressEvent.total : 0
                    );
                    dispatch(setDownloadProgress(percentCompleted)); // Dispatch progress update
                },
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `report-${id}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            return { success: true };
        } catch (error) {
            const err = error as ApiErrorResponse;
            return err.response?.data || { success: false, message: "Unknown error" };
        }
    }
);

const guideSlice = createSlice({
    name: "guide",
    initialState: {
        guides: [] as Guide[],
        classifications: [] as string[],
        sourceFilters: [] as string[],
        yearFilters: [] as string[],
        numberOfPages: 0,
        numberOfGuides:0,
        loading: false,
        error: null,
        progress: 0
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        },
        setDownloadProgress: (state, action) => {
            state.progress = action.payload;
        },
        resetDownloadProgress: (state) => {
            state.progress = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetAllGuides.fulfilled, (state, action) => {
            state.loading = false;
            console.log("action.payload", action.payload);
            if (action.payload.guides?.filterData?.classifications) {
                state.classifications = action.payload.guides.filterData.classifications;
            }
            if (action.payload.guides.filterData?.sources) {
                state.sourceFilters = action.payload.guides.filterData.sources;
            }
            if (action.payload.guides.filterData?.years) {
                state.yearFilters = action.payload.guides.filterData.years;
            }
            state.guides = action.payload.guides.data;
            state.numberOfPages = action.payload.guides.totalPages;
            state.numberOfGuides = action.payload.guides.totalGuides;
        });
        builder.addCase(handleGetAllGuides.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleDownloadGuide.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleDownloadGuide.rejected, (state) => {
            state.loading = false;
        });

        //^ handelLoadMoreGuides
        builder.addCase(handelLoadMoreGuides.fulfilled, (state, action) => {
            state.loading = false;
            state.guides = [...state.guides, ...action.payload.guides.data];
            state.numberOfPages = action.payload.totalPages;
        });
        builder.addCase(handelLoadMoreGuides.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default guideSlice.reducer;
export const { getClincsRequest, setDownloadProgress, resetDownloadProgress } = guideSlice.actions;