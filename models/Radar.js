collection = new Mongo.Collection('Radar');

if(Meteor.isServer){
    collection._ensureIndex({location: "2dsphere"});
}