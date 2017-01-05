// Add an event listener for our button click
self.addEventListener('sync', function(event){
  console.log('Sync event fired');
  // Listen specifically for our json-fetch event
  if (event.tag == 'json-fetch') {
    console.log('json requested');
    event.waitUntil(fetchJson());
  }
})

// We'll do the actual fetching in here
function fetchJson(){
  fetch('./data.json')
    .then(function(response) {
      return response;
    })
    .then(function(text) {
      console.log('Request successful', text);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
}
