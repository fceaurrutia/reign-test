import React, { useEffect, useState } from "react";
import {
	List as ListIcon,
	AutoStories as PaginationIcon,
} from "@mui/icons-material";
import {
	MenuItem,
	SelectChangeEvent,
	Select,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { FilterOptions } from "../staticVariables";
import {
	Title,
	SelectorContainer,
	TableContainer,
	Selection,
	FilterContainer,
	Mode,
	IconButton,
	StyledFormControl,
} from "../Assets/Views/MainStyled";
import InfiniteScrollTable from "../Components/InfiniteScrollTable";
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
		localStorage.setItem("view", type);
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
					active={selectedView === "all" ? "all" : null}
					onClick={() => handleChangeView("all")}>
					<p>All</p>
				</Selection>
				<Selection
					active={selectedView === "favorites" ? "favorites" : null}
					onClick={() => {
						setMode("pagination");
						localStorage.setItem("mode", "pagination");
						handleChangeView("favorites");
					}}>
					<p>My Faves</p>
				</Selection>
			</SelectorContainer>
			<FilterContainer>
				<StyledFormControl>
					<InputLabel id="select-filter-label">Select your news</InputLabel>
					<Select
						id="select-filter"
						labelId="select-filter-label"
						value={query}
						onChange={handleChangeSelectFilter}
						input={<OutlinedInput label="Select your news" />}>
						{FilterOptions.map((x, index) => (
							<MenuItem key={`options-${index}`} value={x.value}>
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
					</Select>
				</StyledFormControl>
				{selectedView === "all" ? (
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
				) : null}
			</FilterContainer>
			<TableContainer>
				{mode === "pagination" ? (
					<Table view={selectedView} query={query} />
				) : (
					<InfiniteScrollTable query={query} />
				)}
			</TableContainer>
		</>
	);
}

export default Main;
