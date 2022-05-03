import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import {
	getPosts,
	selectPosts,
	getPostsWithoutFilter,
} from "../Redux/Reducers/PostSlice";

function Main() {
	const dispatch = useAppDispatch();
	const { posts } = useAppSelector((state) => state.posts);
	const dispatchPosts = () => {
		dispatch(getPostsWithoutFilter());
	};
	console.log(posts);
	return (
		<div className="App">
			Main
			<button
				onClick={() => {
					console.log("Pressed");
					dispatchPosts();
				}}
				type="button">
				Botón
			</button>
		</div>
	);
}

export default Main;
