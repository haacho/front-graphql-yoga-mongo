import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { useHistory } from "react-router";

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

const CreateForm = () => {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const submitData = async (e) => {
    e.preventDefault();
    await createMessage({ variables: { title, author, content } });
    history.push(`/`);
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={async (e) => submitData(e)}>
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

export default CreateForm;
