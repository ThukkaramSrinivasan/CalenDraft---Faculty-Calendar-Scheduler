/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Invalid Credentials',() =>{
    expect(functions.checkcredentials('users','user123')).not.toBe("0");
});
