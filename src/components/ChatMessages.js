function ChatMessage({ message }) {
	return <div style={{
		display: "flex", justifyContent: message.role === 'assistant' ? "flex-start" : "flex-end",
	}}>
		<span className="chat-message">
			{message.content}
		</span>
	</div>
}

export default function ChatMessages({ messages, assistantTyping }) {
	return (
		<div style={{
			overflowY: "auto", width: "100%", flexGrow: 1
		}} className="flex-col">
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} />
			))}
			{assistantTyping && <ChatMessage message={{ role: 'assistant', content: <i>Typing...</i> }} />}
		</div>
	);
}