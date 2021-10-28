import React, { useState } from "react";
import { Button, Card, FormControl, Modal } from "react-bootstrap";
import { TimeLineModal } from "./TimeLineModal";
import { DeleteAlert } from "./Alert";
import moment from "moment";
import { CardHeader } from "./CardHeader";
import { commentPost } from "../state/actions/postActions";
import { useDispatch } from "react-redux";

export const TimeLinePost = ({ post }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [userModal, setUserModal] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  if (showAlert) {
    return <DeleteAlert setShowAlert={setShowAlert} post={post} />;
  }

  const handleComment = async () => {
    const lastComment = `${user.result?.user}: ${comment}`;

    const newComment = await dispatch(commentPost(lastComment, post._id));

    setComments(newComment);
    setComment("");
  };

  const handleClose = () => setShow(false);
  const handleShow = (posts) => {
    setShow(true);
    setUserModal(posts);
  };

  return (
    <>
      <Card style={{ border: "none" }}>
        <CardHeader post={post} setShowAlert={setShowAlert} />

        <Card.Img
          src={post.selectedFile}
          variant
          style={{ height: "550px", objectFit: "cover", cursor: "pointer" }}
          onClick={() => handleShow(post)}
        />

        <Card.Body>
          <Card.Title className="mb-1">{post.location}</Card.Title>
          <Card.Text className="mb-0">
            <strong>{post.username}: </strong>
            {post.caption}
          </Card.Text>
          <small>{moment(post.createdAt).fromNow()}</small>
          {comments
            ?.slice(0)
            .reverse()
            .map((c, i) => (
              <Card.Text className="mb-1" key={i}>
                <strong>{c.split(": ")[0]}</strong>: {c.split(": ")[1]}
              </Card.Text>
            ))}
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <FormControl
              style={{ border: "none", maxWidth: "500px", marginRight: "10px" }}
              placeholder="Add a comment..."
              disabled={!user}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button disabled={!comment} onClick={handleComment}>
              Post
            </Button>
          </div>
        </Card.Footer>
      </Card>
      <Modal show={show} onHide={handleClose} centered>
        <TimeLineModal post={userModal} />
      </Modal>
    </>
  );
};
