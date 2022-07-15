import { useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { Box } from "@mui/system";
import { Pin } from "../components";
import Button from "@mui/material/Button";
// @ts-ignore eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

type TPlaces = {
  id: string | number;
  place: string;
  image: string;
  latitude: number;
  longitude: number;
};

export default function FishingMap() {
  const [popupInfo, setPopupInfo] = useState<TPlaces | null>(null);

  const [places, setPlaces] = useState<TPlaces[] | []>([
    {
      id: 1,
      place: "Kod rijeke",
      image:
        "https://eartheclipse.com/wp-content/uploads/2019/05/torrent-white-water-force-nature-river.jpg",
      latitude: 53.989719,
      longitude: -7.363332,
    },
  ]);
  console.log(
    "🚀 ~ file: FishingMap.tsx ~ line 36 ~ FishingMap ~ places",
    places
  );

  function handleLocateMe() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function ({ coords }) {
        setPlaces([
          ...places,
          {
            id: 2,
            place: "Place 2",
            image:
              "https://res.cloudinary.com/dtpgi0zck/image/upload/s--U2ixWCco--/c_fill,h_580,w_860/v1/EducationHub/photos/grand-canyon-colorado-river.jpg",
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        ]);
      });
    } else {
      console.log("Not Available");
    }
  }

  return (
    <>
      <Box sx={{ height: "600px", width: "100%" }}>
        <Map
          initialViewState={{
            longitude: -7.363332,
            latitude: 53.989719,
            zoom: 8,
            bearing: 0,
            pitch: 0,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9?access_token=TOKEN"
          mapboxAccessToken="pk.eyJ1IjoidG9ueTIzcHJvIiwiYSI6ImNsNWw4bXk3aTBoZ2czZW8xOWFmdW1iZnYifQ.kmNr4gy5UUuuDQC7U8DoWg"
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {places?.map((place, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={place.longitude}
              latitude={place.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(place);
              }}
            >
              <Pin />
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.place} |{" "}
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.place}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width="100%" src={popupInfo.image} alt="Alt 1" />
            </Popup>
          )}
        </Map>
      </Box>
      <Button
        sx={{ marginTop: "1rem" }}
        variant="contained"
        onClick={handleLocateMe}
      >
        Locate me
      </Button>
    </>
  );
}
