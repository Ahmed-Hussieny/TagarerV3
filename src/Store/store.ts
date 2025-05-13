
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from '../../node_modules/react-redux/src/hooks/useDispatch';
import userReducer from './user.slice'
import reportReducer from './report.slice'
import guideReducer from './guide.slice'
import governmentalReducer from './governmental.slice'
import articleReducer from './article.slice'
import pakageReducer from './pakage.slice'
export  const configStore = configureStore({
    reducer: {
        user: userReducer,
        reports: reportReducer,
        guides: guideReducer,
        governmentals: governmentalReducer,
        articles: articleReducer,
        pakages: pakageReducer
    },
})

export type AppDispatch = typeof configStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();