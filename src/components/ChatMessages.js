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

					return <div>
						<b>Quote from story:</b> {quote}
					</div>;
				})}
			</div>}
		</span>
	</div>
}

export default function ChatMessages({ messages, assistantTyping }) {
	return (
		<div style={{
			overflowY: "auto", width: "100%", flexGrow: 1, minHeight: 0,
		}} className="flex-col">
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} />
			))}
			{assistantTyping && <ChatMessage message={{ role: 'assistant', content: <i>Typing...</i> }} />}
		</div>
	);
}