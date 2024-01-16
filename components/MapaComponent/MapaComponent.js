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
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const rectangle = [
  [50, -50],
  [55, -45],
];

const MapaComponent = () => {
  const [posiciones, setPosiciones] = React.useState([
    {
      id: 1,
      color: "red",
      bound: [
        [50, -50],
        [55, -45],
      ],
      posicions: [[40.51, 50]],
    },
    {
      id: 2,
      color: "black",
      bound: [
        [40, -50],
        [45, -45],
      ],
      posicions: [[51.51, -0.12]],
    },
  ]);

  const rectangleRefs = posiciones.map(() => useRef());

  const handleRectangleDrag = (index, event) => {
    const latlng = event.target.getLatLng();
    const newPositions = [...posiciones];
    newPositions[index].posicions = [[latlng.lat, latlng.lng]];
    setPosiciones(newPositions);
  };

  React.useEffect(() => {
    rectangleRefs.forEach((ref, index) => {
      const rectangle = ref.current.leafletElement;

      rectangle.dragging.enable();

      rectangle.on("dragend", (event) => handleRectangleDrag(index, event));
    });
  }, [rectangleRefs]);

  return (
    <>
      {JSON.stringify(posiciones)}
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
          {posiciones.map((posicion, index) => {
            return (
              <Rectangle
                key={posicion.id}
                bounds={posicion.bound}
                center={posicion.posicions}
                ref={rectangleRefs[index]}
                pathOptions={{ color: posicion.color }}
                draggable={true}
                onDrag={(event) => handleRectangleDrag(index, event)}
              >
                <Tooltip>Tooltip for CircleMarker</Tooltip>
              </Rectangle>
            );
          })}
        </LayerGroup>
      </MapContainer>
    </>
  );
};

export default MapaComponent;
