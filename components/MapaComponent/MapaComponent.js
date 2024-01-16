import React from "react";
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
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const rectangle = [
  [50, -50],
  [55, -45],
];

const MapaComponent = () => {
    
  return (
    <>
      <MapContainer
        style={{ height: "100vh" }}
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={true}
      >
        <TileLayer
          attribution="Wibo Development"
          url="./export_kov/{z}/{x}/{y}.jpg"
        />

        <LayerGroup>
          <Rectangle
            bounds={rectangle}
            center={[51.51, -0.12]}
            pathOptions={{ color: "red" }}
          >
            <Tooltip>Tooltip for CircleMarker</Tooltip>
            <text>Carlos</text>
          </Rectangle>
        </LayerGroup>
      </MapContainer>
    </>
  );
};

export default MapaComponent;
