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
				<a href="/talk" className="talk">Talk</a>
				<a href="/share" className="share-story">Share a story</a>
			</div>
			<div>
				
			</div>
		</div>
	);
}
