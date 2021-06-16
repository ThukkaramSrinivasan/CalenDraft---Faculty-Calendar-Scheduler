/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Deleting an event', done => {
    function callback(data) {
      try {
        expect(data).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    }
  
    functions.remove_event(callback, "2021-06-0612:0013:00Fun","ankitha.krishnamoorthy@gmail.com");
  });