# Radar
A library to tag items with GPS coordinates and allows simple querying for nearby items. Set a location for your collections, or anything at all! Let clients discover what's nearby them.

For modularity it tags a given key with the coordinates given instead of storing the whole Mongo Collection.

## Usage
```
// Initialize with default options.
// Always initialize first to subscribe to proper publications
Radar.init();

// Registers a key with the client's coordinates
Radar.register(key);

// Returns all keys that are nearby the user
Radar.get()
```

## Documentation
### init([options])
Initializes the proper subscriptions and methods with the options given.

##### Arguments
- options
	- `limit`	: Limit to the number of collections returned. Defaults to 5. Set to 0 for unlimited.
    - `maxDistance` : Maximum distance an item can be away from the client.
    - `subscription` : Namespace for your items. For example I can have a `NearbyMalls` subscription and a `UsersNearby` subscription. As of now this doesn't do anything, feel free to leave it as default.

### register(key, [sub, lat, lon])
Registers the given key with some GPS coordinates. Defaults to the user's current coordinates if one of `lat` or `lon` is missing.
- options
	- `sub` : The subscription namespace. As mentioned above, this doesn't really do anything yet, but make sure it's the same one you subscribe to in init, or just leave it as default.
    - `lat` : Latitude
    - `lon` : Longitude

### unregister(key)
Unregisters the key from `Radar`

### get()
Returns a `Mongo` cursor for the list of `items` that are within the `maxDistance` set. The `items` contains the `key` which can be used to get your collection.


## Tests (In progress)