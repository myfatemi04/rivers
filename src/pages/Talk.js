import ChatMessages from "../components/ChatMessages";
import { useState, useCallback, useEffect } from 'react';
import { getStories, chat } from '../api';

// eslint-disable-next-line
const demoConversation = `
User: Hi, I'm feeling really anxious about my upcoming finals. I don't know how I'm going to handle all the studying and the pressure.

Chatbot: Hi there, I'm here to help you. Finals can be stressful, but it's important to remember that you are not alone. Many students feel anxious during this time of year. Have you tried taking some deep breaths or doing some relaxation exercises to calm your nerves?

User: I've tried that, but it doesn't seem to be working. I just keep worrying about how much I have to study and if I'll be able to pass.

Chatbot: It's understandable to feel overwhelmed, but remember that you've made it this far and you have the knowledge and skills to succeed. One thing that might help is to break your studying into manageable chunks. Make a schedule and take breaks in between study sessions to prevent burnout.

User: That's a good idea. But what if I still don't feel confident?

Chatbot: Confidence is something that can be built over time. Remember that you don't have to be perfect, and it's okay to make mistakes. Just keep doing your best and trust that you have the ability to succeed. And don't forget to take care of yourself by getting enough rest, eating healthy foods, and doing activities you enjoy.

User: Thank you for your support. I'm feeling a bit better now.

Chatbot: You're welcome. Remember, if you ever need someone to talk to, I'm always here. Good luck on your finals!
`.trim().split("\n\n").map(line => line.split(": ")).map(([role, content]) => ({ role: role === 'User' ? 'user' : 'assistant', content }));

export default function Talk() {
	const [messages, setMessages] = useState([]);
	const [draft, setDraft] = useState("");
	const [stories, setStories] = useState(null);

	const firstMessageContent = messages.length > 0 ? messages[0].content : null;

	useEffect(() => {
		getStories(firstMessageContent).then(stories => {
			setStories(stories);
		});
	}, [firstMessageContent]);

	const submitMessage = useCallback(() => {
		if (!draft) {
			return;
		}
		if (stories === null) {
			return;
		}
		setMessages(messages => [...messages, { role: 'user', content: draft }]);
		setDraft("");
		chat(messages, stories).then((message) => setMessages(messages => [...messages, message]));
	}, [draft, messages, stories]);

	return <div className="flex-col" style={{ alignItems: "center", flexGrow: 1, width: "calc(min(40rem, 100% - 2rem))", margin: "0 auto", padding: "1rem" }}>
		<h1 style={{ margin: 0 }}>Talk</h1>
		{stories === null ? <p>Loading...</p> : <p>Stories: {stories.length}</p>}
		<ChatMessages messages={messages} />
		<div style={{ display: "flex", marginTop: "1rem", width: "100%" }}>
			<input type="text" className="chat-input" value={draft} onChange={e => setDraft(e.target.value)} style={{ flexGrow: 1 }} />
			<button style={{ marginLeft: "0.5rem" }} onClick={submitMessage} className="chat-button">Send</button>
		</div>
	</div>
}