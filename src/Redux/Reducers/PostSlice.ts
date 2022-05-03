import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IPost, IPostState, Response } from "../Types/Post.type";
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
			posts: data.hits
				.map((x: any) => {
					if (
						x.story_title === null ||
						x.story_url === null ||
						x.author === null ||
						x.created_at === null
					)
						return null;
					return {
						id: x.objectID,
						title: x.story_title,
						url: x.story_url,
						author: x.author,
						created_at: x.created_at,
					};
				})
				.filter((x: any) => x != null),
			maxPages: data.nbPages,
		};
		dispatch(getPosts(formattedResponse));
	} catch (error) {
		dispatch(setLoading(false));
	} finally {
		dispatch(setLoading(false));
	}
};

export const setPostsFromLocal =
	(posts: IPost[], page: number): AppThunk =>
	(dispatch) => {
		dispatch(setLoading(true));
		let maxPages = Math.floor(posts.length / 8);
		maxPages += posts.length % 8 === 0 ? 0 : 1;
		const formattedResponse: Response = {
			page,
			posts: posts.slice(page * 8, (page + 1) * 8),
			maxPages,
		};
		dispatch(getPosts(formattedResponse));
		dispatch(setLoading(false));
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
				posts: data.hits
					.map((x: any) => {
						if (
							x.story_title === null ||
							x.story_url === null ||
							x.author === null ||
							x.created_at === null
						)
							return null;
						return {
							id: x.objectID,
							title: x.story_title,
							url: x.story_url,
							author: x.author,
							created_at: x.created_at,
						};
					})
					.filter((x: any) => x != null),
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
