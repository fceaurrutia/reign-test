import { styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => ({
	display: "grid",
	minHeight: "80vh",
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

export const BackToTop = styled("div")<{ scrollPosition: number }>(
	({ scrollPosition, theme }) => ({
		[theme.breakpoints.down("sm")]: {
			width: "32px",
			height: "32px",
		},
		[theme.breakpoints.up("sm")]: {
			width: "48px",
			height: "48px",
		},
		cursor: "pointer",
		opacity: scrollPosition,
		position: "fixed",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		bottom: 50,
		zIndex: 999,
		backgroundColor: "rgb(25, 100, 255)",
		borderRadius: "50%",
		border: "1px solid rgba(50, 50, 50, 0.5)",
		transition: "0.125s all",
		"&:hover": {
			backgroundColor: "rgba(25, 150, 255, 1)",
		},
	}),
);
