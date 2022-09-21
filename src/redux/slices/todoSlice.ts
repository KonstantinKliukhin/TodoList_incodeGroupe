import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import githubApi from "../../api/githubApi";
import { IIssue, IssueType } from "../../common/types/issue";

interface ITodosState {
  todos: IIssue[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ITodosState = {
	todos: [],
	loading: 'idle'
};

const fetchAllTodos = createAsyncThunk<IIssue[], {owner: string, repo: string}>(
	'todos/fetchAllTodos',
	async ({owner, repo}, {rejectWithValue}) => {
			return await githubApi.getIssues({
				owner: 'facebook',
				repo: 'react',
				state: IssueType.ALL
			});
	})

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		
	}
});


