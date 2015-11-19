// Currently only supports one object type, e.g. can't separate nearby Places with nearby Rooms etc, need a namespace and query fix for that
Radar = {
    get: function () {
        return collection.find()
    },
    /**
     * Initialize Radar to get nearby data, subject to parameters in options. Returns true if it succeeds.
     */
    init: function (options) {
        var opts = initializeOpts(options);

        if (navigator.geolocation) {
            getCurrentPosition(function (res) {
                Session.set(KEY_COORDS, {
                        latitude: res.coords.latitude,
                        longitude: res.coords.longitude
                    }
                );
            });

            Tracker.autorun(function () {
                var coords = Session.get(KEY_COORDS);
                if (coords != null && (coords.hasOwnProperty('latitude') && coords.hasOwnProperty('longitude')) && (coords.latitude != null && coords.longitude != null)) {
                    console.log('Subscribing to radar...');
                    Meteor.subscribe('Radar', coords.latitude, coords.longitude, opts)
                } else {
                    console.log('Something went wrong: ', coords);
                }
            });

            return true;
        } else {
            console.log('Could not get location info.');
            return false;
        }
    },
    /**
     * Registers a key with the location given by the latitude and longitude coordinates passed in.
     * If either latitude or longitude is not specified, the client's current GPS coordinates will be used instead.
     *
     * @param key   a unique key to reference your object's location
     * @param sub   (optional) the subscription name, otherwise defaults to DEFAULT_SUB
     * @param lat   (optional) custom latitude, defaults to the client's current latitude
     * @param lon   (optional) custom longitude, defaults to the client's current longitude
     */
    register: function (key, sub, lat, lon) {
        if (key === null) {
            console.log('Key needed for registration.');
            return;
        }
        if (typeof key === 'object') {
            // Handle Mongo object
            if (key.hasOwnProperty('_id')) {
                key = key._id
            } else {
                console.log("Key cannot be an object unless it's a Mongo collection object");
                return;
            }
        }

        sub = sub || DEFAULT_SUB;
        if (typeof sub !== 'string') {
            console.log('Subscription name must be a string!');
            return;
        }
        // If either are falsy, we take the current coordinates for the user
        if (!lat || !lon) {
            getCurrentPosition(function (res) {
                Meteor.call('radar/register', key, sub, res.coords.latitude, res.coords.longitude, function (e) {
                    if (e) {
                        console.log(e);
                    }
                })
            })
        } else if (navigator.geolocation) {
            Meteor.call('radar/register', key, sub, lat, lon, function (e) {
                if (e) {
                    console.log(e); // alert the user, fail silently
                }
            })
        }
    },
    /**
     * Unregisters the key from the radar
     * @param key
     */
    unregister: function (key) {
        if (key === null) {
            console.log('Key needed for registration.');
            return;
        }

        if (typeof key === 'object') {
            // Handle Mongo object
            key = key._id
        } else {
            console.log("Key cannot be an object unless it's a Mongo collection object");
            return;
        }


        Meteor.call('radar/unregister', key)
    }
};

function initializeOpts(options) {
    if (!options) {
        return {}
    }

    var limit = options.limit === null ? DEFAULT_LIMIT : options.limit;
    var maxDistance = Math.max(0, options.maxDistance || DEFAULT_MAX_DIST);
    var subscription = options.subscription || DEFAULT_SUB;
    return {
        limit: limit,
        maxDistance: maxDistance,
        subscription: subscription
    }
}
function getCurrentPosition(callback) {
    var cb = Meteor.bindEnvironment(callback);
    navigator.geolocation.getCurrentPosition(cb)

}
