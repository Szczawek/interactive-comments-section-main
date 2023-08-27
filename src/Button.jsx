import { useContext } from "react";
import { AppFunc } from "./App.jsx";

export default function Button({ openFunc,   person, replies, openEditArea, parent,repliesId}) {
  const funct = useContext(AppFunc);
  function User() {
    return (
      <button className="clr-blue" onClick={() => openFunc()}>
        <img
          src="src/images/icon-reply.svg"
          alt="Icon used to respond to comments"
        />
        Reply
      </button>
    );
  }

 function CurrentUser() {
    return (
      <>
        <button
          className="clr-red"
          onClick={() => funct["changeAlert"](repliesId, replies, parent)}>
          <img
            src="src/images/icon-delete.svg"
            alt="icon of the delete button"
          />
          Delete
        </button>
        <button className="clr-blue " onClick={() => openEditArea()}>
          <img
            src="src/images/icon-edit.svg"
            alt="An icon to edit your comment"
          />
          Edit
        </button>
      </>
    );
  }

  return <>{person == "juliusomo" ? <CurrentUser /> : <User />}</>;
}
