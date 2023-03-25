export default function ChatMessages({ messages }) {
	return (
		<div style={{ width: "40rem" }} className="flex-col">
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