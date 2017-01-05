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
  console.log("Don't go json waterfalls.")
}
