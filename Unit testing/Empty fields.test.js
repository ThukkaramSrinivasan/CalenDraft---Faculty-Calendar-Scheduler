/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Empty Fields',() =>{
    expect(functions.validate('user','user123')).toBeTruthy();
    expect(functions.validate('','user123')).toBe("No blank values allowed!");
    expect(functions.validate('user','')).toBe("No blank values allowed!");
    expect(functions.validate('','')).toBe("No blank values allowed!");
})