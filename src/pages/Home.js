import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";
import { useState } from "react";

const buttonPanelVariants = {
	visible: {
		x: 0,
		transition: {
			ease: "easeInOut",
			duration: 0.5,
		},
	},
	hidden: {
		x: "-100%",
	},
}

const textVariants = {
	hidden: {
		x: "100%",
	},
	visible: {
		x: 0,
		transition: {
			ease: "easeInOut",
			duration: 0.5,
		},
	},
}

export default function Home() {
	const [showTalkPage, setShowTalkPage] = useState(false);

	return (
		<>
			<div className="main-container">
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden" }}>
					<motion.div variants={buttonPanelVariants} initial="visible" animate={showTalkPage ? "hidden" : "visible"} style={{ width: "100%", height: "100%", padding: "4rem" }}>
						<h1>Everyone's life flows a different way.</h1>
						<div>
							<span>What brings you here today?</span>
						</div>
						<div className="buttons">
							<button onClick={() => setShowTalkPage(true)} animate={showTalkPage ? "hidden" : "visible"}>
								Talk
							</button>
							{/* <Link to="/talk" className="button"> Talk </Link> */}
							<Link to="/share" className="button" style={{ marginLeft: "0.5rem" }}> Share a story </Link>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}
