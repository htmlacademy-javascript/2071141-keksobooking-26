import { createPopup } from './popup.js';

const Coordinates = {
  lat: 35.68287,
  lng: 139.75174,
};

const ZOOM = 12;
const COORDINATES_PRECISION = 5;

const MAIN_MARKER_SIZE = 52;
const AD_MARKER_SIZE = 40;

const addressElement = document.querySelector('#address');

let map, markerGroup, mainMarker;

const initBooking = (cb) => {
  map = L.map('map-canvas')
    .on('load', cb)
    .setView(Coordinates, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarkerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
    iconAnchor: [MAIN_MARKER_SIZE / 2, MAIN_MARKER_SIZE],
  });

  mainMarker = L.marker(
    Coordinates,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );

  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressElement.value = `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(COORDINATES_PRECISION)}`;
  });

  markerGroup = L.layerGroup().addTo(map);
};

const updatePins = (ads) => {
  markerGroup.clearLayers();

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [AD_MARKER_SIZE, AD_MARKER_SIZE],
    iconAnchor: [AD_MARKER_SIZE / 2, AD_MARKER_SIZE],
  });

  ads.forEach((ad) => {
    const lat = ad.location.lat;
    const lng = ad.location.lng;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createPopup(ad));
  });
};

const resetMap = () => {
  map.setView (Coordinates, ZOOM);
  mainMarker.setLatLng(Coordinates);
};

export {initBooking, updatePins, resetMap};
