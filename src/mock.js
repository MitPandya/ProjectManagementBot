var nock = require('nock');
var request = require('supertest')("http://api.postcodes.io");
var data = require('./mocks/mock.json');

module.exports.getCheckListItems = function(){

   nock("http://api.postcodes.io")
  .get("/checkListItems")
  .reply(200, JSON.stringify(data.checkListItems) );

	request.get('/checkListItems')
	      .expect(200)
	      .end(function (err, res) {
	        console.log(res.text);
	});

};

//getCheckListItems();
