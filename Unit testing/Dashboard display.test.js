/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 test('Dashboard displayed on successful login',() =>{
    expect(functions.dashboard('user','user123')).toBe(1);
    expect(functions.dashboard('users','user123')).not.toBe(0);
});
