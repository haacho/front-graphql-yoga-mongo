import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const GET_MESSAGES = gql`
  query {
    messages {
      _id
      title
      content
      author
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: String!) {
    deleteMessage(_id: $id) {
      _id
    }
  }
`;

const MessageList = () => {
  let history = useHistory();

  const { loading: queryLoading, error, data, refetch } = useQuery(
    GET_MESSAGES
  );
  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onCompleted(data) {
      refetch();
    },
  });

  const removeNote = async ($id) => {
    await deleteMessage({ variables: { id: $id } });
  };

  if (queryLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        {data.messages.map(({ _id, title, content, author }) => (
          <div key={_id} className="card m-2">
            <div className="card-body">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm m-1"
                  onClick={() => removeNote(_id)}
                >
                  borrar
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm m-1"
                  onClick={() => history.push(`/update-message/${_id}`)}
                >
                  editar
                </button>
              </div>
              <div className="d-grid gap-2">
                <h4>{title}</h4>
                <p>{content}</p>
                <p>{author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
