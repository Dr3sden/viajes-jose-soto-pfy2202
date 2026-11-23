import assert from 'node:assert/strict';
import { destinations, flights, hotels } from '../src/mocks/catalog.js';

assert.equal(destinations.length, 6, 'Deben existir seis destinos REST');
assert.equal(new Set(destinations.map((d) => d.id)).size, destinations.length, 'IDs de destinos únicos');
assert.equal(flights.length, 18, 'Deben existir 18 vuelos');
assert.equal(hotels.length, 18, 'Deben existir 18 hoteles');
for (const destination of destinations) {
  assert.ok(destination.name && destination.country && destination.description);
  assert.ok(Array.isArray(destination.activities) && destination.activities.length >= 3);
  assert.ok(flights.filter((flight) => flight.destinationId === destination.id).length >= 3);
  assert.ok(hotels.filter((hotel) => hotel.destinationId === destination.id).length >= 3);
}
for (const flight of flights) {
  assert.ok(flight.price > 0 && flight.seatsAvailable > 0);
  assert.ok(Date.parse(flight.departureDate) < Date.parse(flight.returnDate));
}
for (const hotel of hotels) {
  assert.ok(hotel.pricePerNight > 0 && hotel.availableRooms > 0);
  assert.ok(hotel.rating <= 5 && hotel.rating > 0);
}
console.log('✅ Catálogo OK: 6 destinos, 18 vuelos, 18 hoteles, fechas y disponibilidades válidas.');
