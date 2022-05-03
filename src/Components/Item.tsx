import React from "react";
import { IPost } from "../Redux/Types/Post.type";

interface Props {
	post: IPost;
}

function Item(props: Props) {
	const { post } = props;
	return <div>{post.title}</div>;
}

export default Item;
