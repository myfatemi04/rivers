import ChatMessages from "../components/ChatMessages";
import { useState, useCallback, useEffect } from 'react';
import { getStories, chat } from '../api';

export default function Talk() {
	const [initialMessage, setInitialMessage] = useState("");
	const [stories, setStories] = useState(null);

	useEffect(() => {
		if (!initialMessage) {
			return;
		}
		getStories(initialMessage).then(setStories);
	}, [initialMessage]);

	return <div className="flex-col" style={{ alignItems: "center", flexGrow: 1, width: "calc(min(40rem, 100% - 2rem))", margin: "0 auto", padding: "1rem" }}>
		<h1>Talk</h1>
		{initialMessage ? (
			stories === null ?
				<p>Connecting you to an AI</p> :
				<TalkInner initialMessage={initialMessage} stories={stories} />
		) : (
			<div style={{ width: "100%" }}>
				<p>What's on your mind?</p>
				<input type="text" onKeyUp={e => {
					if (e.key === 'Enter') {
						setInitialMessage(e.target.value);
					}
				}} />
			</div>
		)}
	</div>
}

function TalkInner({ initialMessage, stories }) {
	const [messages, setMessages] = useState([{ role: 'user', content: initialMessage }]);
	const [draft, setDraft] = useState("");
	const [typing, setTyping] = useState(false);

	const submitMessage = useCallback(() => {
		if (!draft) {
			return;
		}
		if (stories === null) {
			return;
		}
		setMessages(messages => [...messages, { role: 'user', content: draft }]);
		setDraft("");
	}, [draft, stories]);

	useEffect(() => {
		if (stories === null) {
			return;
		}
		if (messages.length === 0) {
			return;
		}
		if (messages[messages.length - 1].role === 'user') {
			setTyping(true);
			chat(messages, stories).then((message) => {
				return setMessages(messages => [...messages, message]);
			}).finally(() => {
				setTyping(false);
			});
		}
	}, [messages, stories]);

	return <>
		<ChatMessages messages={messages} assistantTyping={typing} />
		<div style={{ display: "flex", marginTop: "1rem", width: "100%" }}>
			<input type="text" className="chat-input" value={draft} onChange={e => setDraft(e.target.value)} style={{ flexGrow: 1 }} onKeyUp={e => {
				if (e.key === 'Enter') {
					if (draft.length > 0) {
						submitMessage();
					}
				}
			}} />
		</div>
	</>
}