import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

const GET_MESSAGE = gql`
  query GetMessage($id: String!) {
    getMessage(_id: $id) {
      title
      content
      author
    }
  }
`;

const UPDATE_MESSAGE = gql`
  mutation UpdateMessage(
    $id: String!
    $title: String!
    $content: String!
    $author: String!
  ) {
    updateMessage(
      _id: $id
      message: { title: $title, content: $content, author: $author }
    ) {
      _id
      title
      content
      author
    }
  }
`;

const UpdateForm = () => {
  let history = useHistory();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { id }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  useEffect(() => {
    if (data && data.getMessage.title) {
      setTitle(data.getMessage.title);
      setContent(data.getMessage.content);
      setAuthor(data.getMessage.author);
    }
  }, [data]);

  const submitData = async (e) => {
    e.preventDefault();
    await updateMessage({ variables: { id, title, author, content } });
    history.push(`/`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={(e) => submitData(e)}>
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

export default UpdateForm;
