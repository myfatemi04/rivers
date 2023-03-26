import { motion } from "framer-motion";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const nameMap = {
	assistant: "AI",
	user: "You",
}

function smartTrim(string) {
	string = string.trim();
	string = string.replace(/^[,.!?]\s*/, '');
	return string;
}

function extractAndInlineQuotesFromContent(content, storyVectorIDs = []) {
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
				<Link to={"/stories/" + storyVectorIDs[number]} style={{ fontSize: "0.875em" }}>Read the full story</Link>
			</div>
		} else {
			// So we can key them
			return <Fragment key={i}>
				{smartTrim(match)}
			</Fragment>
		}
	})
}

function ChatMessage({ message }) {
	const [expanded, setExpanded] = useState(true)
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
				{extractAndInlineQuotesFromContent(message.content)}
			</pre>
		</span>
	</motion.div>
}

export default function ChatMessages({ messages, assistantTyping }) {
	const [expanded, setExpanded] = useState(false)

	return (
		<div style={{
			overflowY: "scroll", width: "100%", flexGrow: 1, minHeight: 0
		}} className="flex-col">
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} expanded={expanded} setExpanded={setExpanded} />
			))}
			{assistantTyping && <ChatMessage message={{ role: 'assistant', content: <i>Typing...</i> }} />}
		</div>
	);
}