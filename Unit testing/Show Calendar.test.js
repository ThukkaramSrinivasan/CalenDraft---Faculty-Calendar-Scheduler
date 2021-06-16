/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Show calendar ', done => {
    function callback(data) {
      try {
        expect(data).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    }
  
    functions.show_calendar(callback,"ankitha.krishnamoorthy@gmail.com");

});