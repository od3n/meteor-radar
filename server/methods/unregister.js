Meteor.methods({
    'radar/unregister': function (key) {
        collection.remove({key: key})
    }
});
