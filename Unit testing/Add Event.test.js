/**
 * @jest-environment jsdom
 */


const functions= require('./functions');
test('Adding an event', done => {
    function callback(data) {
      try {
        expect(data).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    }
  
    functions.add_event(callback, "2021-06-0612:0014:00Fun","Fun","2021-06-06T12:00:00","2021-06-06T14:00:00","ankitha.krishnamoorthy@gmail.com");
  });