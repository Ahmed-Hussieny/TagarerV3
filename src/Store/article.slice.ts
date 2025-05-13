import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Article } from "../Interfaces/article";

export const handleGetAllArticles = createAsyncThunk("guide/handleGetAllArticles", async ({
    page,
    title = ""
}: { page: number, title?: string}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/article/get-articles?page=${page}&title=${title}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleGetArticle = createAsyncThunk("guide/handleGetArticle", async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/article/get-article/${id}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

const articleSlice = createSlice({
    name: "article",
    initialState: {
        articles: [] as Article[],
        article: {} as Article,
        nameFilters: [] as string[],
        sourceFilters: [] as string[],
        yearFilters: [] as string[],
        numberOfPages: 0,
        loading: false,
        error: null,
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload.articles;
            state.numberOfPages = action.payload.numberOfPages;

        });
        builder.addCase(handleGetAllArticles.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleGetArticle.fulfilled, (state, action) => {
            state.loading = false;
            state.article = action.payload.article;
        });
        builder.addCase(handleGetArticle.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default articleSlice.reducer;