// import Image from "next/image";

// export default function StoriesDashboard() {
//   return (
//     <div className="h-full w-full bg-white">
//       <div>{story.title}</div>
//       <div>{story.description}</div>
//       <div>
//         {story.conversations.map((blurb) => (
//           <div key={blurb.contentEnglish}>
//             <div>{blurb.name}</div>
//             <div>{blurb.contentEnglish}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StoriesDashboard() {
  const [story, setStory] = useState(null);

  useEffect(() => {
    // Replace 'http://localhost:8000/stories/' with the actual URL of your Django API endpoint
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/stories/");
        const stories = response.data;
        if (stories.length > 0) setStory(stories[0]);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="h-full w-full bg-white">
      {story ? (
        <>
          <div>{story.title}</div>
          <div>{story.description}</div>
          <div>{story.content}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
