import { Button, ButtonGroup } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./Home.css";
export default function Home() {
	return (
		<div className='button-container'>
			<ButtonGroup vertical>
				<Button appearance="primary">I want to talk.</Button>
				<Button appearance="subtle">I want to share.</Button>
			</ButtonGroup>
		</div>
	);
}
