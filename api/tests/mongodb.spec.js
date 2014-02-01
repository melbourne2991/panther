describe("MongoDB", function() {
    it("is there a server running", function(next) {
        var MongoClient = require('mongoose');
        MongoClient.connect('mongodb://127.0.0.1:27017/panther_dev', function(err) {
            expect(err).toBe(undefined);
            next()
        });
    });
});