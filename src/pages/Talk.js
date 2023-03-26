import ChatMessages from "../components/ChatMessages";
import { useState, useCallback, useEffect } from 'react';
import { getStories, chat } from '../api';
import { Link } from "react-router-dom";
import {AnimatePresence, motion, usePresence} from "framer-motion";

export default function Talk() {
	const [initialMessage, setInitialMessage] = useState("");
	const [stories, setStories] = useState(null);
	const [isPresent, safeToRemove] = usePresence()

	useEffect(() => {
		!isPresent && setTimeout(safeToRemove, 1000)
		if (!initialMessage) {
			return;
		}
		getStories(initialMessage).then(setStories);
	}, [initialMessage, isPresent]);

	return <motion.div
		className="flex-col smooth-height"
		style={{
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
			zIndex: 1}}
		initial={{ opacity: 0}}
		animate={{opacity: 1}}
		exit={{opacity: 0}}>
		<h1>Find Your Flow</h1>
		<div>
			<Link to='/' className="button.link">Back</Link> <a href='/talk' className="button.link">New</a>
		</div>
		<AnimatePresence>
		{initialMessage ? (
			stories === null ?
				<motion.p initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>Connecting you to an AI...</motion.p> :
				<TalkInner initialMessage={initialMessage} stories={stories} />
		) : (
			<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{ width: "100%" }}>
				<p>What would you like to talk about?</p>
				<input type="text" onKeyUp={e => {
					if (e.key === 'Enter') {
						setInitialMessage(e.target.value);
					}
				}} className="chat-input" style={{
					outline: 'none'
				}} />
			</motion.div>
		)}
		</AnimatePresence>
	</motion.div>
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
				return setMessages(messages => [...messages, { ...result.message, quotes: result.quotes }]);
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