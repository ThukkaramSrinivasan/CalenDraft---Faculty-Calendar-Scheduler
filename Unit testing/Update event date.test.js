/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');


test('Updating an event date ', done => {
  function callback(data) {
    try {
      expect(data).toBeTruthy();
      done();
    } catch (error) {
      done(error);
    }
  }

  functions.update_date(callback, "2021-06-0612:0014:00Fun","Fun","2021-06-06T12:00:00","2021-06-06T14:00:00","2021-06-0612:0014:00Fun","ankitha.krishnamoorthy@gmail.com");

});
