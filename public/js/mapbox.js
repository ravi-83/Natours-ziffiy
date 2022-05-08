import mapboxgl from 'mapbox-gl';

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmF2aS1yYW5qYW4iLCJhIjoiY2wydHBtNWMxMDZkMjNrcncyeWdpc2RwdSJ9.ITC035FjOaJnsBP1WzMxUQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ravi-ranjan/cl2ts6q2t005v14o9xaanhge9',
    scrollZoom: false,

    // center: [-118.113491, 34.111745],
    // zoom: 5,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add a marker
    console.log(loc);
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add PopUp
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p> Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
