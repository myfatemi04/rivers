import { Link } from "react-router-dom";

const nameMap = {
	assistant: "AI",
	user: "You",
}

function ChatMessage({ message }) {
	return <div style={{
		display: "flex", justifyContent: message.role === 'assistant' ? "flex-start" : "flex-end",
	}}>
		<span className={`chat-message cm-${message.role}`}>
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

					return <div style={{
						// translucent background
						backgroundColor: "rgba(255, 255, 255, 0.5)",
						color: "black",
						borderRadius: "0.25rem",
						padding: "1rem",
						marginTop: "0.5rem",
						width: "100%",
					}}>
						"<em>
							{quote}
						</em>"
						<br />
						<Link to="/story">Read this story</Link>
					</div>;
				})}
			</div>}
		</span>
	</div>
}

export default function ChatMessages({ messages, assistantTyping }) {
	return (
		<div style={{
			overflowY: "auto", width: "100%", flexGrow: 1, minHeight: 0
		}} className="flex-col">
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} />
			))}
			{assistantTyping && <ChatMessage message={{ role: 'assistant', content: <i>Typing...</i> }} />}
		</div>
	);
}