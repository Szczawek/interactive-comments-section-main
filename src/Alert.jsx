import { useContext } from "react";
import { AppFunc } from "./App";
export default function Alert({ obj }) {
  const func = useContext(AppFunc);
  return (
    <div className="alert">
      <div className="alert-box">
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="alert-btns">
          <button onClick={() => func["changeAlert"]()}>NO,CANCEL</button>
          <button
            onClick={() => {
              if (obj.replies) {
                func["removeReplyComment"](obj.parent,obj.position);
              } else {
                func["removeComment"](obj.parent);
              }
              func["changeAlert"]();
            }}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
