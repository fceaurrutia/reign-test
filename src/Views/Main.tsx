import React, { useEffect, useState } from "react";
import {
	List as ListIcon,
	AutoStories as PaginationIcon,
} from "@mui/icons-material";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { FilterOptions } from "../staticVariables";
import {
	Title,
	SelectorContainer,
	TableContainer,
	Selection,
	FilterContainer,
	Mode,
	IconButton,
	StyledSelect,
} from "../Assets/Views/MainStyled";
import Table from "../Components/Table";

function Main() {
	const [selectedView, setSelectedView] = useState<string | null>(
		localStorage.getItem("view"),
	);
	const [mode, setMode] = useState<string | null>(localStorage.getItem("mode"));
	const [query, setQuery] = useState<string | null>(
		localStorage.getItem("query"),
	);
	const handleChangeView = (type: string) => {
		setSelectedView(type);
	};
	const swapMode = () => {
		const swappedMode = mode === "pagination" ? "scroll" : "pagination";
		setMode(swappedMode);
		localStorage.setItem("mode", swappedMode);
	};
	const handleChangeSelectFilter = (e: SelectChangeEvent<unknown>) => {
		const {
			target: { value },
		} = e;
		setQuery(value as string);
		localStorage.setItem("query", value as string);
	};
	useEffect(() => {
		if (selectedView === null) {
			setSelectedView("all");
			localStorage.setItem("view", "all");
		}
		if (query === null) {
			setQuery("angular");
			localStorage.setItem("query", "angular");
		}
		if (mode === null) {
			setMode("pagination");
			localStorage.setItem("mode", "pagination");
		}
	}, []);

	return (
		<>
			<Title>
				<h3>HACKER NEWS</h3>
			</Title>
			<SelectorContainer>
				<Selection
					active={selectedView === "all"}
					onClick={() => handleChangeView("all")}>
					<p>All</p>
				</Selection>
				<Selection
					active={selectedView === "favorites"}
					onClick={() => handleChangeView("favorites")}>
					<p>My Faves</p>
				</Selection>
			</SelectorContainer>
			<FilterContainer>
				<StyledSelect value={query} onChange={handleChangeSelectFilter}>
					{FilterOptions.map((x) => (
						<MenuItem value={x.value}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									textAlign: "center",
									gridGap: 10,
								}}>
								<img src={x.icon} alt="icon" style={{ width: "24px" }} />
								{x.label}
							</div>
						</MenuItem>
					))}
				</StyledSelect>
				<Mode>
					{mode === "pagination" ? (
						<>
							Pagination
							<IconButton onClick={swapMode}>
								<PaginationIcon />
							</IconButton>
						</>
					) : (
						<>
							Infinite Scroll
							<IconButton onClick={swapMode}>
								<ListIcon />
							</IconButton>
						</>
					)}
				</Mode>
			</FilterContainer>
			<TableContainer>
				<Table />
			</TableContainer>
		</>
	);
}

export default Main;
