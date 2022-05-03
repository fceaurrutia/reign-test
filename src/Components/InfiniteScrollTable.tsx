import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "../Assets/Components/InfiniteScrollStyled";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import {
	getPostsWithFilterScroll,
	getPostsWithFilter,
} from "../Redux/Reducers/PostSlice";
import Item from "./Item";

interface Props {
	query: string | null;
}

export default function InfiniteScrollTable(props: Props) {
	const dispatch = useAppDispatch();
	const { query } = props;
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { posts, loading, maxPages } = useAppSelector((state) => state.posts);

	const addMorePosts = () => {
		dispatch(
			getPostsWithFilterScroll({
				query: query != null ? query : "angular",
				page: currentPage,
			}),
		);
	};

	const getInitialPosts = () => {
		dispatch(
			getPostsWithFilter({
				query: query != null ? query : "angular",
				page: currentPage,
			}),
		);
	};

	useEffect(() => {
		window.addEventListener("scroll", (e: Event) => {
			if (loading) {
				e.preventDefault();
				return;
			}
			const current = e.currentTarget as Window;
			const documentHeight = document.body.offsetHeight;
			const isBottom = current.scrollY + current.innerHeight === documentHeight;
			if (isBottom) setCurrentPage((x) => x + 1);
		});
	}, []);

	useEffect(() => {
		addMorePosts();
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(0);
		getInitialPosts();
	}, [query]);

	return (
		<div style={{ width: "100%" }}>
			<Container>
				{posts.map((x, index) => (
					<Item key={`post-${index}`} post={x} reload={() => {}} />
				))}
				{loading ? (
					<div
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
						}}>
						<CircularProgress />
					</div>
				) : null}
				{maxPages === currentPage + 1 ? "Llegaste al final " : null}
			</Container>
		</div>
	);
}
