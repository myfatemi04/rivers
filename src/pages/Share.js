import { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import "./Share.css";

export default function Share() {
  const [story, setStory] = useState("");

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // PASS STORY TO BACKEND
	
  };

  return (
    <div className="share-container">
      <h1>Share Your Story</h1>
      <form className="share-form" onSubmit={handleSubmit}>
        <label htmlFor="story">What do you want to talk about?</label>
        <textarea
          id="story"
          name="story"
          rows="5"
          value={story}
          onChange={handleStoryChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}