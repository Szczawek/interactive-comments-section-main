import { useContext, useState } from "react";
import Button from "./Button";
import OpenWindow from "./UploadComment";
import { AppFunc } from "./App";
export default function Comment({ obj, parent, type, replies, repliesId }) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(obj["score"]);
  const [score, setScore] = useState(false);
  const [edit, setEdit] = useState(false);
  const func = useContext(AppFunc);
  // Add/remove like
  function increasing() {
    if (score) return;
    setScore(true);
    setCount((prev) => prev + 1);
  }
  function decreasing() {
    if (!score) return;
    setScore(false);
    setCount((prev) => prev - 1);
  }

  // message
  function openEdit() {
    setEdit((prev) => !prev);
  }
  function Message() {
    return (
      <p className="message">
        {replies && <span className="reply-to">{`@${obj["replyingTo"]}`}</span>}
        {obj["content"]}
      </p>
    );
  }
  function EditArea() {
    const [content, setContent] = useState(obj["content"]);
    return (
      <div className="edit-area">
        <textarea
          name=""
          value={content}
          id=""
          onChange={(e) => setContent(e.target.value)}
          cols="30"
          rows="10"></textarea>
        <button className="send"
          onClick={() => {
            obj["content"] = content;
            openEdit();
          }}>
          UPDATE
        </button>
      </div>
    );
  }

  // Controlling the window to add a response
  function switchWindow() {
    setOpen((prev) => !prev);
  }
  return (
    <>
      <div className="comment">
        <div className="counter">
          <button onClick={() => increasing()}>
            <img src="src/images/icon-plus.svg" />
          </button>
          <p>{count}</p>
          <button onClick={() => decreasing()}>
            <img src="src/images/icon-minus.svg" />
          </button>
        </div>
        <div className="comment-information">
          <img src={obj["user"]["image"]["png"]} alt="Profile photo " />
          <h2>
            {obj["user"]["username"]}
            {obj["user"]["username"] == "juliusomo" && (
              <span className="current-user-mark">YOU</span>
            )}
          </h2>
          <p className="time">{obj["createdAt"]}</p>
        </div>
        {!edit ? <Message /> : <EditArea />}
        <div className="function-btn">
          <Button
            openFunc={switchWindow}
            openEditArea={openEdit}
            position={obj["id"]}
            repliesId={repliesId}
            parent={parent}
            replies={replies}
            person={obj["user"]["username"]}
          />
        </div>
      </div>
      {open && (
        <OpenWindow
          id={func["random"]()}
          type={type}
          place={parent}
          btnName={"REPLY"}
          closeWindow={switchWindow}
        />
      )}
    </>
  );
}
