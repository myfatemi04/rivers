export default function ChatMessages({ messages }) {
	return (
		<div style={{
			overflowY: "auto", width: "100%", flexGrow: 1
		}} className="flex-col">
			{messages.map((message, index) => (
				<div key={index} style={{
					display: "flex", justifyContent: message.role === 'assistant' ? "flex-start" : "flex-end",
				}}>
					<span className="chat-message">
						{message.content}
					</span>
				</div>
			))}
		</div>
	);
}