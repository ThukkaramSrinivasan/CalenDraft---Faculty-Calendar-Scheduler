/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 test('Reminder generation',() =>{
    expect(functions.reminder()).toBeTruthy();
});
