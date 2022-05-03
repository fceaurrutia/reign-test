import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import {
	selectPosts,
	getPostsWithoutFilter,
	getPostsWithFilter,
} from "../Redux/Reducers/PostSlice";

function Table() {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const query = localStorage.getItem("query");

	const dispatch = useAppDispatch();
	const { posts } = useAppSelector((state) => state.posts);
	const dispatchPosts = () => {
		dispatch(
			query != null
				? getPostsWithFilter({ query, page: currentPage })
				: getPostsWithoutFilter(),
		);
	};

	useEffect(() => {
		dispatchPosts();
	}, []);

	return (
		<div className="table-container">
			{posts.map((x) => (
				<Item post={x} />
			))}
		</div>
	);
}

export default Table;
