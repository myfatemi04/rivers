import { Link } from "react-router-dom";
import "./Home.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CSSTransition } from 'react-transition-group';

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
			<div className="main-container" animate={{ transition: { ease: "easeIn", duration: 0.5 }, height: "auto" }}>
				{/* <AnimatePresence mode="wait">
					{!showTalkPage && */}
				<motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { type: "tween", duration: 0.15 } }} style={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
					<h1 style={{ margin: 0 }}>Everyone's life flows a different way.</h1>
					<p>Rivers collects the world's stories so anyone experiencing challenging times can know they aren't alone.<br />100% free, no registration required.</p>
					<span>What brings you here today?</span>
					<div className="buttons">
						<Link to="/talk" className="button"> Talk </Link>
						<Link to="/share" className="button" style={{ marginLeft: "0.5rem" }}> Share a story </Link>
					</div>
				</motion.div>
			</div>
		</>
	);
}
