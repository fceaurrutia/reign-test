import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import {
	Container,
	Pagination,
	Left,
	Right,
	DoubleLeft,
	DoubleRight,
	Page,
	LoadingContainer,
} from "../Assets/Components/TableStyled";
import Item from "./Item";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import {
	selectPosts,
	getPostsWithoutFilter,
	getPostsWithFilter,
} from "../Redux/Reducers/PostSlice";

interface Props {
	mode: string | null;
	query: string | null;
	view: string | null;
}

function Table(props: Props) {
	const { mode, query, view } = props;
	const [currentPage, setCurrentPage] = useState<number>(0);
	const dispatch = useAppDispatch();
	const { posts, loading, maxPages } = useAppSelector((state) => state.posts);
	const dispatchPosts = () => {
		dispatch(
			query != null
				? getPostsWithFilter({ query, page: currentPage })
				: getPostsWithoutFilter(),
		);
	};

	const checkCurrentPage = (index: number) => {
		if (currentPage > 3) return currentPage === index + (currentPage - 4);
		return currentPage === index;
	};

	const handleClick = (page: number) => {
		if (currentPage > 3) {
			setCurrentPage(page + (currentPage - 4));
			return;
		}
		setCurrentPage(page);
	};

	const handleNext = () => {
		setCurrentPage((x) => x + 1);
	};

	const handleBack = () => {
		setCurrentPage((x) => x - 1);
	};

	const handleTenBack = () => {
		if (currentPage - 10 < 0) {
			setCurrentPage(0);
			return;
		}
		setCurrentPage((x) => x - 10);
	};

	const handleTenNext = () => {
		if (currentPage + 10 > maxPages - 1) {
			setCurrentPage(maxPages - 1);
			return;
		}
		setCurrentPage((x) => x + 10);
	};

	useEffect(() => {
		dispatchPosts();
	}, [query, currentPage]);
	return (
		<div style={{ width: "100%" }}>
			{loading ? (
				<LoadingContainer>
					<CircularProgress style={{ margin: "0 auto" }} />
				</LoadingContainer>
			) : (
				<Container>
					{posts.map((x, index) => (
						<Item key={`post-${index}`} post={x} />
					))}
					{new Array(8 - posts.length).fill("discarded").map((x, index) => (
						<Item key={`${x}-${index}`} post={null} />
					))}
				</Container>
			)}

			<Pagination>
				<DoubleLeft
					active={currentPage !== 0 ? "yes" : null}
					onClick={() => (currentPage !== 0 ? handleTenBack() : null)}
				/>
				<Left
					active={currentPage !== 0 ? "yes" : null}
					onClick={() => (currentPage !== 0 ? handleBack() : null)}
				/>
				{Array.from(Array(7).keys()).map((x, index) => {
					if (index + currentPage - 3 > maxPages) return null;
					return (
						<Page
							key={`${x}-${index}`}
							onClick={() =>
								!checkCurrentPage(index) ? handleClick(index) : null
							}
							active={checkCurrentPage(index) ? "yes" : null}>
							{currentPage > 3 ? index + (currentPage - 3) : index + 1}
						</Page>
					);
				})}
				<Right
					active={currentPage !== maxPages - 1 ? "yes" : null}
					onClick={() => (currentPage !== maxPages - 1 ? handleNext() : null)}
				/>
				<DoubleRight
					active={currentPage !== maxPages - 1 ? "yes" : null}
					onClick={() =>
						currentPage !== maxPages - 1 ? handleTenNext() : null
					}
				/>
			</Pagination>
		</div>
	);
}

export default Table;
