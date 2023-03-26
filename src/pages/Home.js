import { Link } from "react-router-dom";
import "./Home.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const buttonPanelVariants = {
	visible: {
		opacity: 1,
		transition: {
			ease: "easeInOut",
			duration: 0.5,
		},
	},
	hidden: {
		opacity: 0,
	},
}

const textVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
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
			<AnimatePresence>
			<motion.div className="main-container"
						initial={{ opacity: 0}}
						viewport={{ once: true }}
						animate={{opacity: 1, transition: { delay: 0.7, duration: 1 }, height: "auto" }}>
				{/* <AnimatePresence mode="wait">
					{!showTalkPage && */}
				<motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { type: "tween", duration: 0.15 } }} style={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
					<h1 style={{ margin: 0 }}>Everyone's life flows a different way.</h1>
					<p>Rivers collects the world's stories so anyone experiencing challenging times can know they aren't alone.</p>
					<span>What brings you here today?</span>
					<div className="buttons">
						<Link to="/talk" className="button"> Talk </Link>
						<Link to="/share" className="button" style={{ marginLeft: "0.5rem" }}> Share a story </Link>
					</div>
				</motion.div>
			</motion.div>
			</AnimatePresence>
		</>
	);
}
