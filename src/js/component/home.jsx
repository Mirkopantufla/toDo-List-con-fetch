import React from "react";
import ListaTareas from "./ListaTareas.jsx";

//create your first component
const Home = () => {
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="offset-3 col-6">
					<ListaTareas />
				</div>
			</div>
		</div>
	);
};

export default Home;
