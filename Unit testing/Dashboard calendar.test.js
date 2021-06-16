/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 test('Calendar rendered in dashboard',() =>{
    expect(functions.ProcessExcel()).toBe(0);
});