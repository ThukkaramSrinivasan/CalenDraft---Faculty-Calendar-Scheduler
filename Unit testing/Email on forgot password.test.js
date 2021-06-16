/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 
 test('Email sent during Forgot Password',() =>{
    expect(functions.sendresetemail('ankitha.krishnamoorthy@gmail.com')).toBeTruthy();
    expect(functions.sendresetemail('ankitha@ankitha.com')).toBeTruthy();
})