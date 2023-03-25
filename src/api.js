export async function getStories(initialMessage) {
	const result = await fetch('https://get-stories-jxwxpho3rq-uk.a.run.app/?query=' + encodeURIComponent(initialMessage)).then(response => response.json());
	return result;
}

export async function addStory(story) {
	const result = await fetch('https://add-story-jxwxpho3rq-uk.a.run.app', {
		method: "POST",
		body: JSON.stringify({ story }),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json());
	return result;
}

export async function chat(messages, retrievedStories) {
	const result = await fetch('https://chat-jxwxpho3rq-uk.a.run.app', {
		method: "POST",
		body: JSON.stringify({ messages, retrieved_stories: retrievedStories }),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json());
	return result;
}