mapboxgl.accessToken =
  "pk.eyJ1IjoicHJha2hhcjI5MDgiLCJhIjoiY2xqaGtrazV6MDA4YjNxc2FpYTA2b2l0OSJ9.vbf-MEL5yJ60DaxaRb_GlQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup().setHTML(
      `<h3>${campground.title}</h3>`
    )
  )
  .addTo(map);
