import { useCallback, useState } from "react";
import { addStory } from "../api";

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

	return <div style={{
		display: "flex", flexDirection: "column", width: "40rem", margin: "1rem auto", alignItems: "center"
	}}>
		<h1>Share</h1>
		<textarea value={story} onChange={e => setStory(e.target.value)} disabled={status === 'pending'} />
		<button onClick={submitButton}>Submit</button>
		{status === 'pending' && "Uploading..."}
		{status === 'success' && "Thank you so much for sharing. Your stories will give someone going through a similar experience comfort that they aren't alone.."}
		{status === 'error' && "We're sorry, something happened when uploading your story. Try again?"}
	</div>
}