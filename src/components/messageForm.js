import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

const CREATE_MESSAGE = gql`
  mutation CreateMessage($title: String!, $content: String!, $author: String!) {
    createMessage(
      message: { title: $title, content: $content, author: $author }
    ) {
      _id
      title
      content
      author
    }
  }
`;

const MessageForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [createMessage] = useMutation(CREATE_MESSAGE);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(title, author, content);
              createMessage({ variables: { title, author, content } });
            }}
          >
            <div className="form-group">
              <input
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                type="text"
                placeholder="Author..."
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Title..."
                className="form-control"
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                cols="30"
                rows="10"
                placeholder="Content..."
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success btn-block">
              guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
