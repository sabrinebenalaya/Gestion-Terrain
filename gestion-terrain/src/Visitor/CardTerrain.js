import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import Carousel from "react-bootstrap/Carousel";
function CardTerrain({ terrain }) {
  const navigate = useNavigate();
  const handelClick = (id) => {
    navigate(`/datilTerrain/${id}`);
  };
  return (
    <div
      className="card"
      style={{
        width: "300px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        margin: "10px",
        padding: "20px",
      }}
      onClick={() => handelClick(terrain._id)}
    >
      <div
        className="image-slider"
        style={{
          height: "200px",
          overflow: "hidden",
        }}
      >
        <Carousel>
          {terrain.photo.map((photo, index) => (
            <Carousel.Item key={index}>
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                fluid
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div
        className="details"
        style={{
          marginTop: "10px",
        }}
      >
        <h3
          className="name"
          style={{
            fontSize: "18px",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          {terrain.name}
        </h3>
        <p
          className="price"
          style={{
            fontSize: "16px",
            color: "#777",
          }}
        >
          {terrain.price}
        </p>
      </div>
    </div>
  );
}

export default CardTerrain;
