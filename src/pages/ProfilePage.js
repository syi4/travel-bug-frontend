import React, { useEffect, useState } from "react";
import { Card, Container, Row, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../state/actions/userActions";
import { Loader } from "../components/Loader";
import { useParams } from "react-router";
import ReactMapGL, { Marker } from "react-map-gl";
import pinkMarker from "../assets/pink-marker.png";
import { ProfileModal } from "../components/ProfileModal";
import blueMarker from "../assets/blue-marker.png";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [userModal, setUserModal] = useState("");
  const { usersPosts, loading, filteredCountry, userProfileName } = useSelector(
    (state) => state.userProfile
  );

  const dispatch = useDispatch();
  const { user } = useParams();
  const [viewPort, setViewPort] = useState({
    width: "800px",
    height: "450px",
    zoom: 0.7,
  });

  useEffect(() => {
    dispatch(getUserPosts(user));
  }, [dispatch, user]);

  const handleClose = () => setShow(false);
  const handleShow = (userPosts) => {
    setShow(true);
    setUserModal(userPosts);
  };

  const markerSize = 20;

  return (
    <Container style={{ maxWidth: "1000px" }} className="mt-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="justify-content-center">
            <Card
              style={{
                border: "none",
                height: "150px",
                padding: "0px",
                margin: "0px",
                maxWidth: "500px",
              }}
            >
              <Card.Header
                style={{
                  backgroundColor: "#78c2ad",
                  border: "none",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <h3 className="display-6">{userProfileName}</h3>
              </Card.Header>
              <Card.Body
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <h5 style={{ paddingTop: "3px" }}>
                  <img src={blueMarker} alt="travel icon" /> Latest Post
                </h5>
                <h5>
                  {usersPosts.length} {usersPosts.length > 1 ? "Posts" : "Post"}
                </h5>
                <h5>
                  {filteredCountry.length}{" "}
                  {usersPosts.length > 1 ? "Countries" : "Country"}
                </h5>
              </Card.Body>
            </Card>
          </Row>
          <Container className="d-flex justify-content-center my-4">
            <ReactMapGL
              {...viewPort}
              mapStyle={process.env.REACT_APP_MAPBOX_PROFILE_STYLE}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onViewportChange={(viewport) => {
                setViewPort(viewport);
              }}
            >
              {usersPosts.map((post, index) => {
                let body = null;
                if (index === 0) {
                  body = (
                    <img
                      src={blueMarker}
                      alt="travel icon"
                      style={{
                        transform: `translate(${
                          -markerSize / 2
                        }px,${-markerSize}px)`,
                      }}
                    />
                  );
                } else {
                  body = (
                    <img
                      src={pinkMarker}
                      alt="travel icon"
                      style={{
                        transform: `translate(${
                          -markerSize / 2
                        }px,${-markerSize}px)`,
                      }}
                    />
                  );
                }
                return (
                  <Marker
                    key={post._id}
                    latitude={post.coordinates[1]}
                    longitude={post.coordinates[0]}
                  >
                    <button
                      style={{
                        background: "none",
                        cursor: "pointer",
                        border: "none",
                      }}
                      onClick={() => {
                        handleShow(post);
                      }}
                    >
                      {body}
                    </button>
                  </Marker>
                );
              })}
            </ReactMapGL>
          </Container>
        </>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <ProfileModal post={userModal} />
      </Modal>
    </Container>
  );
};

export default ProfilePage;
