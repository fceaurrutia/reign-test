import { styled } from "@mui/material";
import {
	Favorite as FavoriteOnIcon,
	FavoriteBorderOutlined as FavoriteOffIcon,
} from "@mui/icons-material";

export const ItemContainer = styled("div")(({ theme }) => ({
	userSelect: "none",
	display: "flex",
	width: "100%",
	[theme.breakpoints.up("md")]: {
		height: "120px",
	},
	backgroundColor: "#fff",
	opacity: 0.8,
	borderRadius: "6px",
	border: "solid 1px #979797",
}));

export const LeftContainer = styled("div")(({ theme }) => ({
	cursor: "pointer",
	userSelect: "none",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	padding: "25px",
	[theme.breakpoints.down("sm")]: {
		width: "75%",
	},
	width: "88%",
}));

export const TimeContainer = styled("div")(({ theme }) => ({
	userSelect: "none",
	display: "flex",
	alignItems: "center",
	gridGap: 10,
}));

export const RightContainer = styled("div")(({ theme }) => ({
	userSelect: "none",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// border: "solid 1px rgba(96, 96, 96. 0.06)",
	backgroundColor: "rgba(96, 96, 96, 0.06)",
	[theme.breakpoints.down("sm")]: {
		width: "25%",
	},
	width: "12%",
}));

export const FavoriteOn = styled(FavoriteOnIcon)(({ theme }) => ({
	userSelect: "none",
	cursor: "pointer",
	color: "red",
	[theme.breakpoints.down("sm")]: {
		fontSize: "24px",
	},
	[theme.breakpoints.up("lg")]: {
		fontSize: "32px",
	},
	"&:hover": {
		opacity: 0.5,
	},
	transition: "0.125s all ease-in",
}));
export const FavoriteOff = styled(FavoriteOffIcon)(({ theme }) => ({
	userSelect: "none",
	cursor: "pointer",
	color: "red",
	[theme.breakpoints.down("sm")]: {
		fontSize: "24px",
	},
	[theme.breakpoints.up("lg")]: {
		fontSize: "32px",
	},
	"&:hover": {
		opacity: 0.5,
	},
	transition: "0.125s all ease-in",
}));
