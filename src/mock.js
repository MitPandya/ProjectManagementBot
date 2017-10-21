var nock = require('nock');
//var request = require('supertest')("http://api.github.com");
var request = require('request');
var data = require('./mocks/mock.json');

module.exports.getCheckListItems = function(checkListID,callback){

	//if(process.env.NOCK_ON=="true"){

	   nock("http://api.github.com")
	  .get("/checklists/1/checkItems")
	  .reply(200, JSON.stringify(data.checkListItems));
	//}

	var option={method:'GET',url:'http://api.github.com/checklists/1/checkItems'};
	request.get(option, function(e,r,b){
		console.log(b);
		callback(e,r,b);
	});

};

//getCheckListItems();
