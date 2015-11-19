Meteor.publish('Radar', function (lat, lon, opts) {
    return collection.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: opts.maxDistance
                }
            },
            subscription: opts.subscription
        },
        {limit: opts.limit}
    );
});