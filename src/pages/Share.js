import { useCallback, useState } from "react";
import { addStory } from "../api";
import "./Share.css";

export default function Share() {
	const [story, setStory] = useState("");
	const [status, setStatus] = useState("idle");

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

	return <div className="main-container">
		<div style={{
			display: "flex", flexDirection: "column", width: "40rem", margin: "1rem auto", alignItems: "center"
		}}>
			<h1>Share</h1>
			{status === 'success' ? <><p>Thank you so much for sharing. Your stories will give someone going through a similar experience comfort that they aren't alone.</p>
				<button onClick={() => window.location.reload()}>Submit another</button>
			</> :
				<>
					<textarea className = 'textarea'value={story} onChange={e => setStory(e.target.value)} disabled={status === 'pending'} style={{
					fontSize: "1rem",
					fontFamily: "inherit",
					height: "400px",
					}}>
					<span></span>
					</textarea>
					<button className = 'button' onClick={submitButton} style={{ fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "0.25rem", width: "initial", marginBottom: "0.5rem" }}>Submit</button>
					{status === 'pending' && <p>Uploading...</p>}
					{status === 'error' && <p>We're sorry, something happened when uploading your story. Try again?</p>}
				</>
			}
		</div>
	</div>
}