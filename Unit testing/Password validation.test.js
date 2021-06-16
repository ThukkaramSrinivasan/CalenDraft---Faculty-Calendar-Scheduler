/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Password length is less than 6 characters',() =>{
    expect(functions.validate('user','user123')).toBeTruthy();
    expect(functions.validate('user','user')).toBe("Password must be atleast 6 characters in length!!");

})