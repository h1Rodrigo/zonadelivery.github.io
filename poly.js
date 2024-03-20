function initMap() {
  const punto = { lat: -34.5537333, lng: -58.6778457 };
  const notis = document.getElementById("noti");
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: punto,
    mapTypeId: "terrain",
  });

  // Agregar marcador
  const marker = new google.maps.Marker({
    position: punto,
    map: map,
    title: "La Norteña",
  });

  // Definir coordenadas del polígono
  const coor = [
    { lat: -34.5436692, lng: -58.6864369 },
    { lat: -34.5542192, lng: -58.6976733 },
    { lat: -34.5633324, lng: -58.6848332 },
    { lat: -34.5644535, lng: -58.6825593 },
    { lat: -34.5620137, lng: -58.6807454 },
    { lat: -34.5662312, lng: -58.6747477 },   
    { lat: -34.5583782, lng: -58.6664583 },
  ];

  // Construir el polígono
  const enviofree = new google.maps.Polygon({
    paths: coor,
    strokeColor: "#00FF00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#04EFA9",
    fillOpacity: 0.35,
  });

  // Establecer el polígono en el mapa
  enviofree.setMap(map);

  // Listener para el botón de geocodificación
  document.getElementById("geocode-button").addEventListener("click", function() {
    geocodeAddress();
  });

  function geocodeAddress() {
    const input = document.getElementById("pac-input").value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': input }, function(results, status) {
      if (status === 'OK') {
        const placeLocation = results[0].geometry.location;
        const isInside = google.maps.geometry.poly.containsLocation(placeLocation, enviofree);

        if (isInside) {
          notis.textContent = "Envio Gratuito.";
          document.getElementById("pac-input").value = "";
        } else {
          notis.textContent = "Se cobra Envio.";
          document.getElementById("pac-input").value = "";
        }
      } else {
        notis.textContent = "No hay resultados intente nuevamente!"
        document.getElementById("pac-input").value = "";
      }
    });
  }

  // Activar autocompletado solo al hacer clic en el input
  document.getElementById("pac-input").addEventListener("click", function() {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("pac-input"));
    autocomplete.bindTo("bounds", map);
  });
}

window.initMap = initMap;
