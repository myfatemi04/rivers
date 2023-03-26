import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addStory } from "../api";
import { motion, usePresence } from "framer-motion";
import "./Share.css";

export default function Share() {
	const [story, setStory] = useState("");
	const [status, setStatus] = useState("idle");
	const [isPresent, safeToRemove] = usePresence()

	useEffect(() => {
		!isPresent && setTimeout(safeToRemove, 1000)
	}, [isPresent, safeToRemove])

	const submitButton = useCallback(async () => {
		if (!story) {
			return;
		}
		setStatus("pending");
		try {
			await addStory(story)
			setStatus("success");
			setStory("");
		} catch (e) {
			setStatus("error");
		}
	}, [story]);

	// I used to have a lot of anxiety about tests. However, I found that breaking my studying into really small chunks helped me out a lot.

	return <motion.div
		className="share-container"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}>
		<div style={{
			display: "flex", flexDirection: "column", width: "40rem", margin: "0.5rem auto", alignItems: "center"
		}}>
			<h1 style={{marginBottom: 0}}>Share Your Experience</h1>
			<Link to='/' className="button" style={{ fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "0.25rem", width: "initial", marginBottom: "0.5rem" }}>Back</Link>
			{status === 'success' ? <><p>Thank you so much for sharing. Your stories will give someone going through a similar experience comfort that they aren't alone.</p>
				<button className="button" onClick={() => window.location.reload()}>Submit another</button>
			</> :
				<>
					<textarea className='textarea' value={story} onChange={e => setStory(e.target.value)} disabled={status === 'pending'} style={{
						fontSize: "1rem",
						fontFamily: "inherit",
						height: "400px",
					}}>
						<span></span>
					</textarea>
					<button className='button' onClick={submitButton} style={{ fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "0.25rem", width: "initial", marginBottom: "0.5rem" }}>Submit</button>
					{status === 'pending' && <p>Uploading...</p>}
					{status === 'error' && <p>We're sorry, something happened when uploading your story. Try again?</p>}
				</>
			}
		</div>
	</motion.div>
}