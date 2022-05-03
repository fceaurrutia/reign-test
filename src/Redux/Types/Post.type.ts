export interface IPost {
	id: number;
	title: string;
	author: string;
	url: string;
	created_at: string;
}

export interface Response {
	page: number;
	maxPages: number;
	posts: IPost[];
}

export interface IPostState {
	posts: IPost[];
	page: number;
	maxPages: number;
	error: string | null;
	loading: boolean;
}
