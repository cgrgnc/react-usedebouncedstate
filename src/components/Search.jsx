import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedState } from "../hook/useDebouncedState";
import "./Search.css";

export const Search = ({ data }) => {
	const { register, watch } = useForm();

	const [search, setSearch] = useDebouncedState("");
	const [queryCount, setQueryCount] = useState(0);
	const [queryCountDebounce, setQueryCountDebounce] = useState(0);

	const searchValue = watch("search-input");

	useEffect(() => {
		if (searchValue) {
			setQueryCount((prev) => prev + 1);
		}
		if (searchValue?.length > 1) {
			setSearch(searchValue);
		} else if (searchValue === "") {
			setSearch("");
			setQueryCount(0);
		}
	}, [searchValue, setSearch]);

	useEffect(() => {
		if (search) {
			setQueryCountDebounce((prev) => prev + 1);
		} else if (search === "") {
			setQueryCountDebounce(0);
		}
	}, [search]);

	const filteredData = data?.filter((data) =>
		data.toLowerCase().includes(search.toLowerCase()),
	);
	return (
		<React.Fragment>
			<div className="search-box">
				<div className="input-wrapper">
					<input
						{...register("search-input")}
						placeholder="Suchen ..."
						type="search"
					/>
				</div>
				<ul className="result-list">
					{filteredData.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
				<div className="text-wrapper">
					<p>
						Gesamtzahl der Abfragen ohne useDebouncedState:{" "}
						<span className="counts-without">{queryCount}</span>
					</p>
					<p>
						Gesamtzahl der Abfragen mit useDebouncedState:{" "}
						<span className="counts-with">{queryCountDebounce}</span>
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};
