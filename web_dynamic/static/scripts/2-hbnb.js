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
fetch ('http://0.0.0.0:5001/api/v1/status/')
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
});

