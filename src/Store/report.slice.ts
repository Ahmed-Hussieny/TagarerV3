import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Report } from "../Interfaces/report";

export const handleGetAllReports = createAsyncThunk("report/handleGetAllReports", async ({
    page,
    classification = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, classification?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsByUser?page=${page}&custom=${custom}&classification=${classification}&source=${source}&year=${year}`,{
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

export const handelLoadMore = createAsyncThunk("report/handelLoadMore", async ({
    page,
    classification = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, classification?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsByUser?page=${page}&custom=${custom}&classification=${classification}&source=${source}&year=${year}`,{
            headers:{
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

export const handleDownloadReport = createAsyncThunk(
    "report/handleDownloadReport",
    async (id: string, { dispatch }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/report/downloadReportForClient/${id}`,
          {
            headers: {
              accesstoken: `Bearer_${localStorage.getItem("userToken")}`,
            },
          }
        );
  
        if (response.data.pdfUrl) {
          const res = await axios.get(response.data.pdfUrl, {
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
        }
  
        return { success: false, message: "No PDF URL found" };
      } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response?.data || { success: false, message: "Unknown error" };
      }
    }
  );
  
  interface ClassificationI {
    classification: string;
    sources: string[];
    years: string[];
  };
const reportSlice = createSlice({
    name: "report",
    initialState: {
        reports: [] as Report[],
        classifications: [] as string[],
        sourceFilters: [] as string[],
        yearFilters: [] as string[],
        orignalSourceFilters: [] as string[],
        orignalYearFilters: [] as string[],
        numberOfPages: 0,
        totalReports: 0,
        loading: false,
        classificationRelationships: [] as ClassificationI[],
        error: null,
        progress: 0,
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        },
        classificationChange(state, action) {
            const foundClassification = state.classificationRelationships.find((classification: ClassificationI) => classification.classification === action.payload) as ClassificationI | undefined;
            state.sourceFilters = foundClassification?.sources || [];
            state.yearFilters = state.classificationRelationships.find((classification: ClassificationI) => classification.classification === action.payload)?.years || [];
        },
        sourceChange(state, action) {
            state.yearFilters = state.classificationRelationships.find((classification: ClassificationI) => classification.sources.includes(action.payload))?.years || [];
        },
        yearChange(state, action) {
            state.sourceFilters = state.classificationRelationships.find((classification: ClassificationI) => classification.years.includes(action.payload))?.sources || [];
        },
        setDownloadProgress: (state, action) => {
            state.progress = action.payload;
          },
          resetDownloadProgress: (state) => {
            state.progress = 0;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetAllReports.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.reports.filterData?.classifications){
                state.classifications = action.payload.reports.filterData.classifications;
            }
            if(action.payload.reports.filterData?.sources){
                state.sourceFilters = action.payload.reports.filterData.sources;
            }
            if(action.payload.reports.filterData?.years){
                state.yearFilters = action.payload.reports.filterData.years;
            }
            state.reports = action.payload.reports.data;
            console.log(action.payload.reports.totalPages);
            state.numberOfPages = action.payload.reports.totalPages;
            state.totalReports = action.payload.reports.totalReports;

        });
        builder.addCase(handleGetAllReports.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleDownloadReport.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleDownloadReport.rejected, (state) => {
            state.loading = false;
        });

        //^ handelLoadMore
        builder.addCase(handelLoadMore.fulfilled, (state, action) => {
            state.loading = false;
            state.reports = state.reports.concat(action.payload.reports.data);
            state.numberOfPages = action.payload.reports.totalPages;
        });
        builder.addCase(handelLoadMore.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default reportSlice.reducer;
export const { getClincsRequest, classificationChange, sourceChange, yearChange, setDownloadProgress, resetDownloadProgress } = reportSlice.actions;