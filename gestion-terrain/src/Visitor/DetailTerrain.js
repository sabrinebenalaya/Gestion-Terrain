import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTerrainByID } from "../Redux/Slices/sliceTerrains";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";

const DetailTerrain = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const terrain = useSelector((state) => state.terrain.terrain);

  useEffect(() => {
    dispatch(getTerrainByID(id));
  }, [id, dispatch]);

  if (!terrain) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {terrain.photo && terrain.photo.length > 0 ? (
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
          ) : (
            <p>No photos available</p>
          )}
        </div>
        <div className="col-md-4">
          <h2>{terrain.name}</h2>
          <p>Surface: {terrain.surface}</p>
          <p>Price: {terrain.price}</p>
          <p>
            Address: {terrain.address && terrain.address.city},{" "}
            {terrain.address && terrain.address.governorate},{" "}
            {terrain.address && terrain.address.country},{" "}
            {terrain.address && terrain.address.postalCode}
          </p>
          <p>Description: {terrain.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailTerrain;
