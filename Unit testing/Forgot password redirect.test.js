/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
test('Redirected back to the login page through the link received through email',() =>{
    expect(functions.redirectEmail('users','users')).toBe("Complete");
    expect(functions.redirectEmail('users','users1')).toBe("Passwords not equal");
});
