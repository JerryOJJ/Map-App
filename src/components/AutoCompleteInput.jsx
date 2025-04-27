import "../styles/AutoCompleteInput.scss";
import { useState } from "react";
import getPlaces from "../API/getPlaces";

export default function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    handleManualInputChange(event, "streetAndNumber");
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query) => {
    const suggestions = await getPlaces(query);
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestions) => {
    const streetAndNumber = suggestions.place_name.split(",")[0];
    const latitude = suggestions.center[1];
    const longitude = suggestions.center[0];

    const address = {
      streetAndNumber,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestions.context.forEach((element) => {
      const identifier = element.id.split(".")[0];

      address[identifier] = element.text;
    });

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="autoCompleteInputContainer">
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={streetAndNumber}
          onChange={handleChange}
        />
        <ul className="addressSugessions">
          {suggestions?.map((suggestions, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestions)}>
              {suggestions.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
