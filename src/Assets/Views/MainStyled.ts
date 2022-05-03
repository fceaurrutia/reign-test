import { styled, FormControl } from "@mui/material";

export const Title = styled("div")(({ theme }) => ({
	display: "flex",
	boxShadow: "0 1px 4px 0 rgba(0, 21, 41, 0.12)",
	[theme.breakpoints.up("md")]: {
		padding: "0 98px",
	},
	[theme.breakpoints.down("md")]: {
		justifyContent: "center",
	},
	background:
		"linear-gradient(180deg, rgba(236,236,236,1) -32%, rgba(255,255,255,1) 124%)",
	"& > h3": {
		objectFit: "contain",
		fontFamily: "Baskerville",
		fontSize: "28px",
		fontWeight: "normal",
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: 1,
		letterSpacing: "normal",
		color: "#3b3b3b",
	},
}));

export const TableContainer = styled("div")(({ theme }) => ({
	display: "flex",
	marginTop: "20px",
	[theme.breakpoints.up("md")]: {
		padding: "0 98px",
	},
	[theme.breakpoints.down("md")]: {
		padding: "0 20px",
	},
}));

export const SelectorContainer = styled("div")({
	marginTop: 50,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: 24,
});

export const FilterContainer = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	marginTop: 20,
	[theme.breakpoints.up("md")]: {
		padding: "0 98px",
	},
	[theme.breakpoints.down("md")]: {
		padding: "0 20px",
	},
}));

export const Mode = styled("div")({
	display: "flex",
	gridGap: 10,
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
});

export const IconButton = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	cursor: "pointer",
	transition: "0.125s all ease-in",
	borderRadius: "50%",
	padding: 10,
	border: "1px solid rgba(0, 0, 0, .1)",
	"&:hover": {
		backgroundColor: "rgba(225, 225, 225, 0.5)",
	},
});

export const Selection = styled("div")<{ active: string | null }>(
	({ theme, active }) => ({
		userSelect: "none",
		cursor: "pointer",
		[theme.breakpoints.only("xs")]: {
			width: "33%",
		},
		[theme.breakpoints.up("sm")]: {
			width: "25%",
		},
		[theme.breakpoints.up("md")]: {
			width: "10%",
		},
		[theme.breakpoints.up("lg")]: {
			width: "8%",
		},
		height: "100%",
		borderRadius: "2px",
		border: active ? "solid 1px #1797ff" : "solid 1px #d6d6d6",
		"&:hover": {
			backgroundColor: "rgba(225, 225, 225, 0.5)",
		},
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transition: "0.25s all ease-in",
		"& > p": {
			fontSize: 16,
			fontWeight: active ? 600 : 500,
			lineHeight: 1.75,
			fontStretch: "normal",
			fontStyle: "normal",
			textAlign: "center",
			color: active ? "#1797ff" : "black",
		},
	}),
);

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
	[theme.breakpoints.only("xs")]: {
		width: "40%",
	},
	[theme.breakpoints.up("sm")]: {
		width: "25%",
	},
	[theme.breakpoints.up("md")]: {
		width: "15%",
	},
	[theme.breakpoints.up("lg")]: {
		width: "15%",
	},
}));
