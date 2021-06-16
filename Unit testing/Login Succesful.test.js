/**
 * @jest-environment jsdom
 */


const functions= require('./functions');

test('Login Succesful',() =>{
    expect(functions.checkcredentials('user','user123')).toBeTruthy();
    expect(functions.checkcredentials('users','user123')).toBe(1);
});













  
  




