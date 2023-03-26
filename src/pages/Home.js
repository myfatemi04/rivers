import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
	return (
		<>
			<div className="main-container" animate={{ transition: { ease: "easeIn", duration: 0.5 }, height: "auto" }}>
				{/* <AnimatePresence mode="wait">
					{!showTalkPage && */}
				<motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { type: "tween", duration: 0.15 } }} style={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
					<h1 style={{ margin: 0 }}>Everyone's life flows a different way.</h1>
					<p style={{ fontSize: "1.25rem" }}>Rivers collects the world's stories so anyone experiencing challenging times can know they aren't alone. <b>100% free, no registration required.</b></p>

					<p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
						I want to...
					</p>
					<div className="buttons">
						<Link to="/talk" className="button">Talk</Link>
						<Link to="/share" className="button" style={{ marginLeft: "0.5rem" }}>Share a story</Link>
					</div>
				</motion.div>
			</div>
		</>
	);
}
