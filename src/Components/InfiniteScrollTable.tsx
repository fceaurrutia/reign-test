import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";
import {
	Container,
	BackToTop,
} from "../Assets/Components/InfiniteScrollStyled";
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
	const [showScrollButton, setShowScrollButton] = useState<number>(0);
	const { posts, loading, maxPages } = useAppSelector((state) => state.posts);

	const addMorePosts = () => {
		if (currentPage >= maxPages - 1) return;
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

	const scrollBackToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
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
			setShowScrollButton(current.scrollY > 50 ? 1 : 0);
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
				{currentPage >= maxPages - 1 ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<h3
							style={{
								fontWeight: 800,
								fontFamily: "Baskerville",
								textTransform: "uppercase",
							}}>
							You just reached the end
						</h3>
					</div>
				) : null}
				<BackToTop scrollPosition={showScrollButton} onClick={scrollBackToTop}>
					<KeyboardArrowUp />
				</BackToTop>
			</Container>
		</div>
	);
}
