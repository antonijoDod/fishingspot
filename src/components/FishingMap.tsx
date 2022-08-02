import { useEffect, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { Box } from "@mui/system";
import { Pin } from "../components";
import axios from "axios";
import { TPlaces, TPlace } from "types/places";

export default function FishingMap() {
  const [popupInfo, setPopupInfo] = useState<TPlace | null>(null);

  const [places, setPlaces] = useState<TPlace[] | null>(null);

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    const res = await axios.get<TPlaces>(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/places?populate=*`
    );
    setPlaces(res.data.data);
  };

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
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_API}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {places?.map((place, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={place.attributes.longitude}
              latitude={place.attributes.latitude}
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
              longitude={Number(popupInfo.attributes.longitude)}
              latitude={Number(popupInfo.attributes.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>{popupInfo.attributes.title} | </div>
              <img
                width="100%"
                src={
                  popupInfo.attributes.featured_image.data?.attributes.formats
                    .thumbnail.url
                }
                alt="Alt 1"
              />
            </Popup>
          )}
        </Map>
      </Box>
    </>
  );
}
