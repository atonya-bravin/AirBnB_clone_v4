$(document).ready(() => {
  const amenities = {};
  $('input[type="checkbox"]').change(function() {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
fetch('http://0.0.0.0:5001/api/v1/status/')
  .then(response => {
    if (response.ok) {
      $('#api_status').addClass('available');
      console.log(response.status);
    } else {
      $('#api_status').removeClass('available');
      console.log(response.status);
    }
  })
  .catch(error => {
    console.error('Error fetching API status:', error);
  });

$.ajax({ 
  method: 'POST', 
  url: 'http://0.0.0.0:5000/api/v1/places_search/', 
  data: JSON.stringify({}), 
  dataType: 'json', 
  headers: { 
    'Content-Type': 'application/json' 
  }, 
  success: function (data) { 
    $.each(data, (index, place) => { 
      const html = ` 
        <article> 
          <div class="title_box"> 
            <h2>${place.name}</h2> 
            <div class="price_by_night">$${place.price_by_night}</div> 
          </div> 
          <div class="information"> 
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div> 
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div> 
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div> 
          </div> 
          <div class="description"> 
            ${place.description} 
          </div> 
        </article> 
      `; 
      $('section.places').append(html); 
    }); 
  } 
});
});

