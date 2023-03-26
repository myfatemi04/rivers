const GET_STORIES_URL = 'https://get-stories-jxwxpho3rq-uk.a.run.app';
const ADD_STORY_URL = 'https://add-story-jxwxpho3rq-uk.a.run.app';
const CHAT_URL = 'https://chat-jxwxpho3rq-uk.a.run.app';

// const GET_STORIES_URL = 'http://localhost:8080/stories';
// const ADD_STORY_URL = 'http://localhost:8080/stories';
// const CHAT_URL = 'http://localhost:8080/chat';

export async function getStories(initialMessage) {
	return await fetch(GET_STORIES_URL + '/?query=' + encodeURIComponent(initialMessage)).then(response => response.json());
}

export async function addStory(story) {
	const result = await fetch(ADD_STORY_URL, {
		method: "POST",
		body: JSON.stringify({ story }),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json());
	return result;
}

export async function chat(messages, retrievedStories) {
	const result = await fetch(CHAT_URL, {
		method: "POST",
		body: JSON.stringify({
			messages: messages.map(message => {
				// Remove extra fields that may have been added
				return { role: message.role, content: message.content }
			}), retrieved_stories: retrievedStories
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json());
	return result;
}