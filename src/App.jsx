import { useState, createContext, useEffect } from "react";
import Container from "./ContainerComment";
import OpenWindow from "./UploadComment";
import com from "./data.json"
import Alert from "./Alert";
if (!localStorage.getItem("obj")) {
localStorage.setItem("obj", JSON.stringify(com["comments"]));
}
const AppFunc = createContext();
export default function App() {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("obj"))
  );
  const [positon, setPosition] = useState({});
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("obj", JSON.stringify(comments));
  }, [comments]);
  function changeAlert(position, replies, parent) {
    setAlert((prev) => !prev);
    setPosition({ position: position, replies: replies, parent: parent });
  }

  function indexFound(item) {
    return comments.findIndex((e) => e["id"] == item);
  }
  function indexFoundReply(parent, item) {
    return comments[parent]["replies"].findIndex((e) => e["id"] == item);
  }
  // Add/Remove Comment
  function addComment(com) {
    setComments((prev) => [...prev, com]);
  }

  function removeComment(id) {
    const update = [...comments];
    update.splice(indexFound(id), 1);
    setComments(update);
  }
  // Add/Remove Reply to comment
  function addReplyComment(place, comment) {
    console.log(place);
    const update = [...comments];
    update[indexFound(place)]["replies"].push(comment);
    setComments(update);
  }

  function removeReplyComment(parentIndex, id) {
    const update = [...comments];
    update[indexFound(parentIndex)]["replies"].splice(
      indexFoundReply(indexFound(parentIndex), id),
      1
    );

    setComments(update);
  }
  // generate random index
  function random() {
    const id = [];
    const sign = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let num = 10;
    while (num > 0) {
      num--;
      id.push(sign[Math.floor(Math.random() * 9)]);
    }
    return id.join("");
  }

  return (
    <AppFunc.Provider
      value={{
        addComment,
        removeComment,
        addReplyComment,
        removeReplyComment,
        comments,
        changeAlert,
        indexFound,
        random,
      }}>
      {alert && <Alert obj={positon} />}
      <main>
        <div className="content">
          {comments.map((e, index) => {
            return <Container data={e} key={index} />;
          })}
        </div>
        <OpenWindow id={random()} type={"mainPath"} btnName="SEND"></OpenWindow>
      </main>
    </AppFunc.Provider>
  );
}

export { AppFunc };
