import { styled } from "@mui/material";
import {
	ChevronLeft,
	ChevronRight,
	KeyboardDoubleArrowLeft,
	KeyboardDoubleArrowRight,
} from "@mui/icons-material";

export const LoadingContainer = styled("div")({
	minHeight: "50vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

export const Container = styled("div")(({ theme }) => ({
	display: "grid",
	minHeight: "50vh",
	[theme.breakpoints.down("md")]: {
		gridTemplateColumns: "1fr",
		gridTemplateRows: "repeat(8, 1fr)",
	},
	[theme.breakpoints.up("md")]: {
		gridTemplateColumns: "repeat(2, 1fr)",
		gridTemplateRows: "repeat(4, 1fr)",
	},
	gridColumnGap: "40px",
	gridRowGap: "30px",
}));

export const Pagination = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: "50px 0px",
});

export const Left = styled(ChevronLeft)<{ active: string | null }>(
	({ active, theme }) => ({
		userSelect: "none",
		cursor: active ? "pointer" : "auto",
		[theme.breakpoints.down("sm")]: {
			width: "24px",
			height: "24px",
			fontSize: "12px",
		},
		width: "32px",
		height: "32px",
		margin: "0 8px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "6px",
		backgroundColor: "#fcfcfc",
		border: "solid 1px rgba(0, 0, 0, 0.15)",
		fontSize: "14px",
		fontWeight: 500,
		color: active ? "black" : "lightgrey",
		"&:hover": {
			opacity: active ? 0.6 : 1,
		},
		transition: "0.25s all ease-in",
	}),
);

export const Right = styled(ChevronRight)<{ active: string | null }>(
	({ active, theme }) => ({
		userSelect: "none",
		cursor: active ? "pointer" : "auto",
		[theme.breakpoints.down("sm")]: {
			width: "24px",
			height: "24px",
			fontSize: "12px",
		},
		width: "32px",
		height: "32px",
		margin: "0 8px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "6px",
		backgroundColor: "#fcfcfc",
		border: "solid 1px rgba(0, 0, 0, 0.15)",
		fontSize: "14px",
		fontWeight: 500,
		color: active ? "black" : "lightgrey",
		"&:hover": {
			opacity: active ? 0.6 : 1,
		},
		transition: "0.25s all ease-in",
	}),
);

export const DoubleRight = styled(KeyboardDoubleArrowRight)<{
	active: string | null;
}>(({ active, theme }) => ({
	userSelect: "none",
	cursor: active ? "pointer" : "auto",
	[theme.breakpoints.down("sm")]: {
		width: "24px",
		height: "24px",
		fontSize: "12px",
	},
	width: "32px",
	height: "32px",
	margin: "0 8px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "6px",
	backgroundColor: "#fcfcfc",
	border: "solid 1px rgba(0, 0, 0, 0.15)",
	fontSize: "14px",
	fontWeight: 500,
	color: active ? "black" : "lightgrey",
	"&:hover": {
		opacity: active ? 0.6 : 1,
	},
	transition: "0.25s all ease-in",
}));

export const DoubleLeft = styled(KeyboardDoubleArrowLeft)<{
	active: string | null;
}>(({ active, theme }) => ({
	userSelect: "none",
	cursor: active ? "pointer" : "auto",
	[theme.breakpoints.down("sm")]: {
		width: "24px",
		height: "24px",
		fontSize: "12px",
	},
	width: "32px",
	height: "32px",
	margin: "0 8px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "6px",
	backgroundColor: "#fcfcfc",
	border: "solid 1px rgba(0, 0, 0, 0.15)",
	fontSize: "14px",
	fontWeight: 500,
	color: active ? "black" : "lightgrey",
	"&:hover": {
		opacity: active ? 0.6 : 1,
	},
	transition: "0.25s all ease-in",
}));

export const Page = styled("div")<{ active: string | null }>(
	({ active, theme }) => ({
		userSelect: "none",
		cursor: "pointer",
		[theme.breakpoints.down("sm")]: {
			width: "24px",
			height: "24px",
			fontSize: "12px",
		},
		width: "32px",
		height: "32px",
		margin: "0 8px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "6px",
		backgroundColor: active ? "#1890ff" : "#fcfcfc",
		border: "solid 1px rgba(0, 0, 0, 0.15)",
		fontSize: "14px",
		fontWeight: 500,
		"&:hover": {
			backgroundColor: active ? "rgba(24, 144, 255, 0.6)" : "rgba(0,0,0,0.1)",
		},
		transition: "0.25s all ease-in",
	}),
);
