import { styled } from "@mui/material";

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
