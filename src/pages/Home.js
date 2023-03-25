import { ButtonGroup } from "rsuite";
import { Button, ButtonToolbar } from 'rsuite';

export default function Home() {
	<link rel="stylesheet" href="Home.css"></link>
	return (
	  <div>
		<button-container>
			<ButtonToolbar>
				<Button appearance="default" block>
				I want to talk.
				</Button>
				<Button appearance="default" block>
				I want to view other stories.
				</Button>
			</ButtonToolbar>
		</button-container>
	  </div>
	);
  }