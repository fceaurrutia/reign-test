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
	const options = [
		{
			value: "angular",
			label: "Angular",
			icon: "NoIcon",
		},
		{
			value: "reactjs",
			label: "React",
			icon: "NoIcon",
		},
		{
			value: "vuejs",
			label: "Vue",
			icon: "NoIcon",
		},
	];
	const dispatch = useAppDispatch();
	const { posts } = useAppSelector((state) => state.posts);
	const dispatchPosts = () => {
		dispatch(
			query != null
				? getPostsWithFilter({ query, page: currentPage })
				: getPostsWithoutFilter(),
		);
	};

	const handleChangeSelectFilter = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const {
			target: { value },
		} = e;
		localStorage.setItem("query", value);
	};

	useEffect(() => {
		dispatchPosts();
	}, []);

	return (
		<div>
			<div>
				<label htmlFor="filterSelect">
					<select id="filterSelect" onChange={handleChangeSelectFilter}>
						{options.map((x) => (
							<option key={x.value} value={x.value}>
								{x.label}
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="table-container">
				{posts.map((x) => (
					<Item post={x} />
				))}
			</div>
		</div>
	);
}

export default Table;
