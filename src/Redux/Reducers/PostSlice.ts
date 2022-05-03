import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IPostState, Response } from "../Types/Post.type";
import type { RootState, AppThunk } from "../Store";

const defaultState: IPostState = {
	loading: false,
	posts: [],
	page: 0,
	maxPages: 0,
	error: "",
};

export interface IFilter {
	query: string;
	page: number;
}

export const postSlice = createSlice({
	name: "posts",
	initialState: defaultState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.loading = payload;
		},
		getPosts: (state, { payload }: PayloadAction<Response>) => {
			state.page = payload.page;
			state.maxPages = payload.maxPages;
			state.posts = payload.posts;
		},
	},
});

export const { getPosts, setLoading } = postSlice.actions;

export const getPostsWithoutFilter = (): AppThunk => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const { data } = await axios.get(
			"https://hn.algolia.com/api/v1/search_by_date",
			{
				params: {
					hitsPerPage: 8,
				},
			},
		);
		const formattedResponse: Response = {
			page: data.page,
			posts: data.hits.map((x: any) => ({
				id: x.objectID,
				title: x.story_title,
				body: x.comment_text,
				author: x.author,
			})),
			maxPages: data.nbPages,
		};
		dispatch(getPosts(formattedResponse));
	} catch (error) {
		dispatch(setLoading(false));
	} finally {
		dispatch(setLoading(false));
	}
};

export const getPostsWithFilter =
	(filters: IFilter): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data } = await axios.get(
				"https://hn.algolia.com/api/v1/search_by_date",
				{
					params: {
						query: filters.query,
						page: filters.page,
						hitsPerPage: 8,
					},
				},
			);
			const formattedResponse: Response = {
				page: data.page,
				posts: data.hits.map((x: any) => ({
					id: x.objectID,
					title: x.story_title,
					body: x.comment_text,
					author: x.author,
				})),
				maxPages: data.nbPages,
			};
			dispatch(getPosts(formattedResponse));
		} catch (error) {
			dispatch(setLoading(false));
		} finally {
			dispatch(setLoading(false));
		}
	};

export const selectPosts = (state: RootState) => state.posts.posts;

export default postSlice.reducer;
