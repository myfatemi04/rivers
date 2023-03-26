import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import {useState, Children} from "react";
//import React from "react";

const nameMap = {
	assistant: "AI",
	user: "You",
}

/*function extractQuotes(paragraph) {
	// Use regex to match the quotes and extract their content
	const regex = /\[\d+,\s"([^"]+)"\]/g;
	const quotes = [];
	const result = Children.map(paragraph.props.children, (child) => {
		if (typeof child === "string") {
			// If the child is a string, replace the quotes with extracted text on separate lines
			return child.replace(regex, '<span class="quote">$1</span>\n');
		}
	});

	return { quotes, result };
}*/
function extractQuotes(paragraph) {
	try {
		// Use regex to match the quotes and extract their content
		const regex = /\[\d+,\s"([^"]+)"\]/g;
		const quotes = paragraph.match(regex);

		// Replace the original quotes in the paragraph with the extracted text on separate lines
		const result = paragraph.replace(regex, '<span class="quote">$1</span>');

		return {quotes, result};
	} catch {
		const result = "";
		const quotes = "";
		return {quotes, result};
	}
}

function ChatMessage({ message }) {
	const [expanded, setExpanded] = useState(true);
	const text = message.content;
	console.log(text)
	const { quotes, result } = extractQuotes(text);
	return <motion.div
		onTap={() => setExpanded(!expanded)}
		//animate={{height: expanded ? "auto" : 46}}
		style={{marginBottom: "20px", height: "auto", display: "flex", justifyContent: message.role === 'assistant' ? "flex-start" : "flex-end",
	}}>
		<span className={`chat-message cm-${message.role}`}
				style={{marginBottom: "-2px"}}>
			<b>{nameMap[message.role]}</b><br />
			<pre dangerouslySetInnerHTML={{__html: result}}></pre>
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
				<ChatMessage key={index} message={message} expanded={expanded} setExpanded={setExpanded}  />
			))}
			{assistantTyping && <ChatMessage message={{ role: 'assistant', content: <i>Typing...</i> }} />}
		</div>
	);
}