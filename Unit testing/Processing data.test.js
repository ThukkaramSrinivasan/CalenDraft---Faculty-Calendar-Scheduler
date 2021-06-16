/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Processing Data',() =>{
    expect(functions.processData('academic_calendar')).toBeTruthy();
});

