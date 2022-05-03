import React, { useEffect, useState } from "react";
import { AccessTime } from "@mui/icons-material";
import {
	ItemContainer,
	LeftContainer,
	TimeContainer,
	RightContainer,
	FavoriteOn,
	FavoriteOff,
} from "../Assets/Components/ItemStyled";
import { IPost } from "../Redux/Types/Post.type";

export interface Props {
	post: IPost | null;
	reload: Function;
}

function Item(props: Props) {
	const { post, reload } = props;
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const handleURL = () => {
		window.open(post?.url, "_blank");
	};

	const checkIsFavorite = () => {
		let finalResponse = false;
		const getFavorites = localStorage.getItem("favorites");
		if (getFavorites === null) {
			return false;
		}
		const favoriteArray = JSON.parse(getFavorites);
		favoriteArray.forEach((x: IPost) => {
			if (post != null && x.id === post.id) finalResponse = true;
		});
		return finalResponse;
	};

	const handleFavoriteClick = (add: boolean) => {
		if (post !== null) {
			const getFavorites = localStorage.getItem("favorites");
			let favoriteArray = [];
			if (getFavorites != null) {
				favoriteArray = JSON.parse(getFavorites);
			}
			if (add) {
				favoriteArray.push(post);
				localStorage.setItem("favorites", JSON.stringify(favoriteArray));
				setIsFavorite(true);
			} else {
				const filteredArray = favoriteArray.filter(
					(x: IPost) => x.id !== post.id,
				);
				localStorage.setItem("favorites", JSON.stringify(filteredArray));
				setIsFavorite(false);
			}
			if (localStorage.getItem("view") === "favorites") reload();
		}
	};

	const timeFormat = () => {
		if (post !== null) {
			const time = new Date(post.created_at);
			const now = new Date();
			const hours = Math.floor(
				Math.abs(now.getTime() - time.getTime()) / (60 * 60 * 1000),
			);
			const minutes = Math.floor(
				Math.abs(now.getTime() - time.getTime()) / (60 * 1000),
			);
			return hours > 0
				? `${hours} hour${hours > 1 ? "s" : ""} ago`
				: `${minutes} minute${minutes > 1 ? "s" : ""}  ago`;
		}
		return null;
	};

	useEffect(() => {
		setIsFavorite(checkIsFavorite());
	}, [props]);

	return (
		<ItemContainer>
			{post === null ? (
				<div style={{ padding: "25px", fontWeight: 800 }}>
					{localStorage.getItem("view") === "all"
						? "Discarded post"
						: "Post placeholder"}{" "}
				</div>
			) : (
				<>
					<LeftContainer onClick={handleURL}>
						<TimeContainer>
							<AccessTime />
							<div>{`${timeFormat()} by ${post.author}`}</div>
						</TimeContainer>
						{post.title}
					</LeftContainer>
					<RightContainer>
						{isFavorite ? (
							<FavoriteOn onClick={() => handleFavoriteClick(false)} />
						) : (
							<FavoriteOff onClick={() => handleFavoriteClick(true)} />
						)}
					</RightContainer>
				</>
			)}
		</ItemContainer>
	);
}

export default Item;
