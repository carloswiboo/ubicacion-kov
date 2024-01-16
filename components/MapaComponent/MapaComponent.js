import React, { useRef } from "react";
import {
  Circle,
  CircleMarker,
  LayerGroup,
  MapContainer,
  Marker,
  Pane,
  Popup,
  Rectangle,
  SVGOverlay,
  TileLayer,
  Tooltip,
  Map,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const rectangle = [
  [50, -50],
  [55, -45],
];

const MapaComponent = () => {
  const [mapState, setMapState] = React.useState({
    center: {
      lat: -24.9923319,
      lng: 115.2252427,
    },
    zoom: 4,
    draggable: true,
    markerData: [],
  });

  const addMarker = (event) => {
    const coords = event.latlng;
    setMapState((prevState) => ({
      ...prevState,
      markerData: [...prevState.markerData, coords],
    }));
  };

  const updateMarker = (event) => {
    const latLng = event.target.getLatLng();
    const markerIndex = event.target.options.marker_index;

    setMapState((prevState) => {
      const markerData = [...prevState.markerData];
      markerData[markerIndex] = latLng;
      return { ...prevState, markerData };
    });
  };

  return (
    <>
      <MapContainer
        style={{ height: "100vh" }}
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={true}
        onClick={addMarker}
      >
        <TileLayer
          attribution="Wibo Development"
          url="./export_kov/{z}/{x}/{y}.jpg"
        />

        <LayerGroup>
          {mapState.markerData.map((element, index) => (
            <Marker
              key={index}
              marker_index={index}
              position={element}
              draggable={mapState.draggable}
              onDragend={updateMarker}
            />
          ))}
        </LayerGroup>
      </MapContainer>
    </>
  );
};

export default MapaComponent;
