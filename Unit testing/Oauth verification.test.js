/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 test('Login through google',() =>{
    expect(functions.oauthdisplay(1)).toBeTruthy();
});