/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 test('Captcha prompted during login',() =>{
    expect(functions.captchadisplay('user@gmail.com')).toBeTruthy();
});