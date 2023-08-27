import { useContext, useState } from "react";
import { AppFunc } from "./App";
export default function OpenWindow({ btnName, type, place, closeWindow, id }) {
  const [content, setContent] = useState("");
  const func = useContext(AppFunc);
 
  const profile = {
    content: content,
    createdAt: "1 min ago",
    id: id,
    replyingTo: place? func["comments"][func["indexFound"](place)]["user"]["username"]:undefined,
    score: 0,
    user: {
      image: {
        png: "/images/avatars/image-juliusomo.png",
      },
      username: "juliusomo",
    },
    replies: [],
  };
  return (
    <div className="open-window">
      <img
        src="/images/avatars/image-juliusomo.png"
        alt="User's current profile picture"
      />
      <textarea
        maxLength={1020}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add aa comment..."></textarea>
      <button className="send"
        onClick={() => {
          if (type == "subPath") {
            func["addReplyComment"](place, profile);
            closeWindow();
            return;
          }
          func["addComment"](profile);
        }}>
        {btnName}
      </button>
    </div>
  );
}
