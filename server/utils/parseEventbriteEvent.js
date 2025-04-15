export function parseEventbriteEvent(event) {
  return {
    externalId: event.id,
    title: event.name?.text || '',
    description: event.description?.text || '',
    startDate: event.start?.local,
    endDate: event.end?.local,
    category: event.category_id || '',
    eventUrl: event.url,

    location: event.venue ? {
      name: event.venue.name || '',
      address: {
        city: event.venue.address?.city || '',
        region: event.venue.address?.region || '',
        country: event.venue.address?.country || '',
        latitude: event.venue.address?.latitude || '',
        longitude: event.venue.address?.longitude || ''
      }
    } : undefined,

    externalSource: 'eventbrite'
  };
}