import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import pinkMarker from "../assets/pink-marker.png";
import { useSelector } from "react-redux";
import { findMatchingUser } from "../utils";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved

export const TimeLineModal = ({ post }) => {
  const { sameTravelByCountry } = useSelector((state) => state.posts);
  const [viewPort, setViewPort] = useState({
    latitude: post.coordinates[1],
    longitude: post.coordinates[0],
    width: "500px",
    height: "500px",
    zoom: 5,
  });

  const markerSize = 20;

  const { country, username } = post;

  const matchingUsers = findMatchingUser(
    sameTravelByCountry,
    country,
    username
  );

  return (
    <Container
      style={{
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ReactMapGL
        {...viewPort}
        mapStyle={process.env.REACT_APP_MAPBOX_MODAL_STYLE}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport) => {
          setViewPort(viewport);
        }}
      >
        <Marker latitude={post.coordinates[1]} longitude={post.coordinates[0]}>
          <button style={{ border: "none", background: "none" }}>
            <img
              src={pinkMarker}
              alt="travel icon"
              style={{
                transform: `translate(${-markerSize / 2}px,${-markerSize}px)`,
              }}
            />
          </button>
        </Marker>
      </ReactMapGL>
      <div className="control-panel">
        <div style={{ borderBottom: "solid 1px", marginBottom: "5px" }}>
          <h5 style={{ fontSize: "12px" }}>Visited Country</h5>
        </div>
        {matchingUsers.length > 0 ? (
          matchingUsers.map((user) => (
            <h5
              style={{
                fontSize: "14px",
                textAlign: "center",
              }}
              key={user}
            >
              <Link
                to={`/user/${user}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {user}
              </Link>
            </h5>
          ))
        ) : (
          <h5
            style={{
              fontSize: "14px",
              textAlign: "center",
              color: "black",
            }}
          >
            none
          </h5>
        )}
      </div>
    </Container>
  );
};
