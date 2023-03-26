import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import {useState} from "react";

const nameMap = {
	assistant: "AI",
	user: "You",
}

function ChatMessage({ message }) {
	const [expanded, setExpanded] = useState(true)
	return <motion.div
		onTap={() => setExpanded(!expanded)}
		animate={{height: expanded ? "auto" : 46}}
		style={{
		overflow: "hidden", marginBottom: "20px", height: "auto", display: "flex", justifyContent: message.role === 'assistant' ? "flex-start" : "flex-end",
	}}>
		<span className={`chat-message cm-${message.role}`}
				style={{marginBottom: "-2px"}}>
			<b>{nameMap[message.role]}</b><br />
			<pre>
				{message.content}
			</pre>
			{message.quotes && message.quotes.length > 0 && <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
				{message.quotes.map((quote, index) => {
					if (!quote) {
						return null;
					}
					if (quote.startsWith('"') && quote.endsWith('"')) {
						quote = quote.substring(1, quote.length - 1);
					}

					return <motion.div
						onClick={() => setExpanded(!expanded)}
						animate={{ height: expanded ? "auto" : 150}}
						style={{
						// translucent background
						backgroundColor: "rgba(255, 255, 255, 0.5)",
						color: "black",
						borderRadius: "0.25rem",
						padding: "1rem",
						marginTop: "0.5rem",
						width: "100%",
					}}>
						"<em>
							{expanded ? message.stories : quote}
						</em>"
						<br />
						<Link to="/story">Read this story</Link>
					</motion.div>;
				})}
			</div>}
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