import { useEffect } from "react";
import "./Home.css";

export default function Home() {
	useEffect(() => {
		requestAnimationFrame(() => {

		});
	}, []);
	return (
		<div style={{ display: "flex", flexDirection: "column", margin: "4rem", alignItems: "center" }}>
			<h1>Everyone's life flows a different way.</h1>
			<div>
				<span>What do you want to talk about?</span>
			</div>
			<div className="buttons">
				<a href="/talk" className="button"> Talk </a>
				<a href="/share" className="button" style={{ marginLeft: "0.5rem" }}> Share a story </a>
			</div>
		</div>
	);
}
