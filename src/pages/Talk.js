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

	return <div className="flex-col smooth-height" style={{
		alignItems: "center",
		flexGrow: 1,
		minHeight: 0,
		width: "calc(min(60rem, 100% - 2rem))",
		margin: "1rem auto",
		padding: "1rem 2rem",
		fontSize: "0.875rem",
		backgroundColor: "rgb(255, 255, 255, 0.2)",
		backdropFilter: "blur(50px)",
		borderRadius: "2rem",
		zIndex: 1
	}}>
		<h1>Find Your Flow</h1>
		{initialMessage ? (
			stories === null ?
				<p>Connecting you to an AI...</p> :
				<TalkInner initialMessage={initialMessage} stories={stories} />
		) : (
			<div style={{ width: "100%" }}>
				<p>What would you like to talk about?</p>
				<input type="text" onKeyUp={e => {
					if (e.key === 'Enter') {
						setInitialMessage(e.target.value);
					}
				}} className="chat-input" style={{ 
					outline: 'none' }} /> 
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
			chat(messages, stories).then((result) => {
				return setMessages(messages => [...messages, { ...result.message, quotes: result.quotes}]);
			}).finally(() => {
				setTyping(false);
			});
		}
	}, [messages, stories]);

	return <>
		<ChatMessages messages={messages} assistantTyping={typing} stories={stories} />
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