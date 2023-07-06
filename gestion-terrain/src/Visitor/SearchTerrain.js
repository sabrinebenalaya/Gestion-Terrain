import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { GovernorateOptions } from "../Constante";
import { search } from "../Redux/Slices/sliceTerrains";
import { useDispatch, useSelector } from "react-redux";

function SearchTerrain() {
    const dispatch = useDispatch();
  const [estReduit, setEstReduit] = useState(false);
  const [searchedTerrain, setSearchTerrain] = useState({
    governorate: "Tunis",
    city: "Tunis",
    day: new Date(),
  });

  const toggleReduction = () => {
    setEstReduit(!estReduit);
  };

  const reduit = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: estReduit ? "70px" : "100%",
    width: "100%",
    transition: "height 0.5s ease",
  };

  const formStyle = {
    display: estReduit ? "none" : "block",
    width: "80%",
    maxWidth: "600px",
    padding: "20px",
    margin: "auto",
    boxShadow: estReduit ? "" : "0px 2px 5px rgba(0, 0, 0, 0.25)",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchedTerrain);
    dispatch(
        search({ searchedTerrain: searchedTerrain })
      );
    // Faites quelque chose avec les valeurs de recherche...
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
  
    // Heure de début (7:00)
    let hour = 7;
    let minute = 0;
  
    // Heure de fin (00:00)
    const endHour = 0;
    const endMinute = 0;
  
    while (hour !== endHour || minute !== endMinute) {
      // Formater l'heure et les minutes pour l'affichage
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
  
      // Générer le texte pour chaque plage horaire
      const timeSlotText = `${formattedHour}:${formattedMinute}`;
  
      // Ajouter le span correspondant à la plage horaire dans le tableau
      timeSlots.push(
        <span key={timeSlotText} style={{ marginRight: "10px" }}>
          {timeSlotText}
        </span>
      );
  
      // Incrémenter les heures et les minutes
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour = (hour + 1) % 24;
      }
    }
  
    return timeSlots;
  };
  
  
  
  return (
    <div style={reduit}>
      <div className="contact-title text-center" style={{ height: "50px" }}>
        <h2 className="title">Search for your terrain</h2>
      </div>

      <form data-toggle="validator" style={formStyle} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="single-form form-group">
              <InputLabel>Governorate</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={searchedTerrain.governorate}
                onChange={(e) =>
                  setSearchTerrain({
                    ...searchedTerrain,
                    governorate: e.target.value,
                  })
                }
              >
                {GovernorateOptions.map((op, index) => (
                  <MenuItem key={index} value={op.value}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single-form form-group">
              <InputLabel>City</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={searchedTerrain.city}
                onChange={(e) =>
                  setSearchTerrain({ ...searchedTerrain, city: e.target.value })
                }
              >
                {GovernorateOptions.map((op, index) => (
                  <MenuItem key={index} value={op.value}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="single-form form-group">
              <label>Day: </label>
              <DatePicker
                showIcon
                dateFormat="dd/MM/yyyy"
                name="availableStartDate"
                style={{ width: "100%" }}
                selected={searchedTerrain.day}
                onChange={(date) =>
                  setSearchTerrain({ ...searchedTerrain, day: date })
                }
              />
            </div>
          </div>
          <div className="col-lg-12">
      <div className="single-form form-group">
        <label>Time Slot: </label>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {generateTimeSlots()}
        </div>
      </div>
    </div>
        </div>

        <div className="col-lg-12">
          <div
            className="single-form form-group"
            style={{ textAlign: "center" }}
          >
            <Button type="submit">SEARCH NOW</Button>
          </div>
        </div>
      </form>

      {estReduit ? (
        <BsChevronUp onClick={toggleReduction} />
      ) : (
        <BsChevronDown onClick={toggleReduction} />
      )}
    </div>
  );
}

export default SearchTerrain;
