import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatePresence} from "framer-motion";
import "./Home.css";

export default function Home() {
	return (
		<>
			<AnimatePresence mode="wait">
			<motion.div className="main-container"
						initial={{ opacity: 0}}
						animate={{opacity: 1, transition: { delay: 0.7, duration: 1 }, height: "auto" }}
						exit={{ opacity: 0, transition: {duration: 1}}}>
				{/* <AnimatePresence mode="wait">
					{!showTalkPage && */}
				<motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { type: "tween", duration: 0.15 } }} style={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
					<h1 style={{ margin: 0 }}>Everyone's life flows a different way.</h1>
					<p style={{ fontSize: "1.25rem" }}>Rivers collects the world's stories so anyone feeling overwhelmed by life's currents can know they aren't alone. <b>100% free and anonymous.</b></p>

					<p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
						I want to...
					</p>
					<div className="buttons">
						<Link to="/talk" className="button">Talk</Link>
						<Link to="/share" className="button" style={{ marginLeft: "0.5rem" }}>Share a story</Link>
					</div>
				</motion.div>
			</motion.div>
			</AnimatePresence>
		</>
	);
}
