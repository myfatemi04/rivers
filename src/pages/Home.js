import { Link } from "react-router-dom";
import River from "../components/River";
import "./Home.css";

export default function Home() {
	return (
		<>
			<div className="main-container">
				<div style={{ display: "flex", flexDirection: "column", margin: "4rem", alignItems: "center" }}>
					<h1>Everyone's life flows a different way.</h1>
					<div>
						<span>What brings you here today?</span>
					</div>
					<div className="buttons">
						<Link to="/talk" className="button"> Talk </Link>
						<Link to="/share" className="button" style={{ marginLeft: "0.5rem" }}> Share a story </Link>
					</div>
				</div>
			</div>
		</>
	);
}
