import React from "react";
import { IPost } from "../Redux/Types/Post.type";

interface Props {
	post: IPost | null;
}

function Item(props: Props) {
	const { post } = props;
	return <div>{post === null ? "Discarded post" : post.title}</div>;
}

export default Item;
