Meteor.methods({
    'radar/register': function (key, sub, lat, lon) {
        collection.insert({
            key: key,
            location: {
                "type": "Point",
                "coordinates": [lon, lat]
            },
            subscription: sub
        })
    }
});
