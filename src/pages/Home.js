import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TimeLinePost } from "../components/TimeLinePost";
import { getPosts } from "../state/actions/postActions";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, posts, countPostsByUser, totalPosts } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (posts.length !== totalPosts) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Container className="mt-5" style={{ maxWidth: "1000px" }}>
      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-center">
          <Col md={7} className="align-middle">
            <InfiniteScroll
              dataLength={posts.length}
              hasMore={true}
              next={() => {
                setPage(page + 1);
              }}
              scrollThreshold={0.5}
            >
              {posts.map((post) => (
                <Col key={post._id} className="mb-5">
                  <TimeLinePost post={post} />
                </Col>
              ))}
            </InfiniteScroll>
          </Col>
          <Col md={2} className="align-items-center">
            <div className="position-fixed">
              <Card className="p-2" style={{ border: "none" }}>
                <Card.Header>Top Travelers</Card.Header>
                <Card.Body>
                  {countPostsByUser.map((p) => (
                    <Card.Text key={p._id}>
                      <Link
                        to={`/user/${p._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        <strong>{p._id}</strong>
                      </Link>{" "}
                      {p.total} {p.total > 1 ? "Posts" : "Post"}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
