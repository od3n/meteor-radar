Package.describe({
    name: 'zweicoder:radar',
    summary: "A library to tag items with GPS coordinates and allows simple querying for nearby items. Set a location for your collections, or anything at all! Let clients discover what's nearby them.",
    version: '0.0.1',
    git: ''
});

Package.onUse(function (api) {
    api.versionsFrom(['METEOR@1.0']);

    var packages = [
        'mongo'
    ];
    api.use(packages);

    api.addFiles([
        'models/Radar.js',
        'lib/constants.js'
    ]);

    api.addFiles([
        'client/radar.js'
    ], 'client');

    api.addFiles([
        'server/methods/register.js',
        'server/methods/unregister.js',
        'server/publications/radarPub.js'
    ], 'server');

    api.export([
        'Radar'
    ]);
});
