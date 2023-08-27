import { useState, useEffect, createContext } from "react";
import Comment from "./Comment";

const num = createContext();
export default function Container({ data }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="container-comment">
      <Comment
        key={count}
        parent={data["id"]}
        type={"subPath"}
        obj={data}
      />
      <div className="reply">
        {data["replies"].map((com) => {
          return (
            <Comment
              key={com["id"]}
              parent={data["id"]}
              repliesId={com["id"]}
              replies={true}
              type={"subPath"}
              obj={com}
            />
          );
        })}
      </div>
    </div>
  );
}

export { num };
