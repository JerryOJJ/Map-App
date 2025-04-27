import axios from "axios";

export default async function getPlaces(query) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token:
            "pk.eyJ1IjoiamVycnlvamoiLCJhIjoiY202dHhmcjBhMDh6azJqc2EwcGozcHV1eSJ9.U_LgDSC9Tf1cQumh1YHPIw",
        },
      }
    );
    return response.data.features;
  } catch (error) {
    console.error("There was an error while fetching places", error);
  }
}
