import { motion } from "framer-motion";
import { Fragment, useState } from "react";

const nameMap = {
	assistant: "AI",
	user: "You",
}

function smartTrim(string) {
	string = string.trim();
	string = string.replace(/^[,.!?]\s*/, '');
	return string;
}

function extractAndInlineQuotesFromContent(content, setViewingStory) {
	if (typeof content !== 'string') {
		return [content];
	}
	// Match quotation marks followed by a number in square brackets. Match each.
	const matches = content.split(/("[^"]+" \[\d+\])/g);
	return matches.map((match, i) => {
		// This is the delimiter
		if ((i % 2) === 1) {
			const number = match.slice(match.lastIndexOf('[') + 1, match.lastIndexOf(']'));
			// Remove the quotation marks
			let quote = match.slice(0, match.lastIndexOf('[') - 1).trim().slice(1, -1);
			return <div key={i} style={{ backgroundColor: "white", color: "black", borderRadius: "0.25rem", display: "block", padding: "0.5rem", margin: "0.5rem 0" }}>
				<em>
					{quote}
				</em>
				<br />
				<button className="link" style={{ fontSize: "0.875em" }} onClick={() => setViewingStory(number)}>Read the full story</button>
			</div>
		} else {
			// So we can key them
			return <Fragment key={i}>
				{smartTrim(match)}
			</Fragment>
		}
	})
}

function unixTimeToHuman(unixTime) {
	const date = new Date(unixTime * 1000);
	return date.toLocaleString();
}

function ChatMessage({ message, stories }) {
	const [expanded, setExpanded] = useState(true)
	const [viewingStory, setViewingStory] = useState(null);

	return <motion.div
		onTap={() => setExpanded(!expanded)}
		//animate={{height: expanded ? "auto" : 46}}
		style={{
			marginBottom: "20px", height: "auto", display: "flex", justifyContent: message.role === 'assistant' ? "flex-start" : "flex-end",
		}}>
		<span className={`chat-message cm-${message.role}`}
			style={{ marginBottom: "-2px" }}>
			<b>{nameMap[message.role]}</b><br />
			<pre>
				{extractAndInlineQuotesFromContent(message.content, setViewingStory)}
			</pre>
			{viewingStory !== null && <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }} onClick={() => setViewingStory(null)}>
				<div onClick={e => e.stopPropagation()} style={{
					position: "absolute",
					width: "40rem",
					maxHeight: "calc(min(100vh - 10rem, 60rem))",
					padding: "2rem",
					overflowY: "auto",
					backgroundColor: "rgba(255, 255, 255, 0.85)",
					backdropFilter: "blur(5px)",
					borderRadius: "0.5rem",
					left: "50%",
					top: "50%",
					transform: "translateX(-50%) translateY(-50%)",
					boxShadow: "0 0 10rem rgba(0, 0, 0, 0.5)"
				}}>
					<b>Submitted: {unixTimeToHuman(stories[viewingStory - 1].timestamp)}</b>
					<pre>
						{stories[viewingStory - 1].story}
					</pre>
					<button onClick={(e) => {
						setViewingStory(null)
						e.stopPropagation()
					}} className="link" style={{ fontSize: "1em" }}>Close</button>
				</div>
			</div>}
		</span>
	</motion.div>
}

export default function ChatMessages({ messages, assistantTyping, stories }) {
	const [expanded, setExpanded] = useState(false)

	return (
		<div style={{
			overflowY: "scroll", width: "100%", flexGrow: 1, minHeight: 0
		}} className="flex-col">
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} expanded={expanded} setExpanded={setExpanded} stories={stories} />
			))}
			{assistantTyping && <ChatMessage message={{ role: 'assistant', content: <i>Typing...</i> }} stories={stories} />}
		</div>
	);
}