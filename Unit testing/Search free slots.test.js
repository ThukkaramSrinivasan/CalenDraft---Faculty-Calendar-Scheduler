/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Search free slots ', done => {
    function callback(data) {
      try {
        expect(data).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    }
  
    functions.search_free_slots(callback,"2021-06-06T12:00:00","2021-06-06T14:00:00","ankitha.krishnamoorthy@gmail.com");

});
