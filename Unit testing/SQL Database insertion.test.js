/**
 * @jest-environment jsdom
 */


 const functions= require('./functions');
 test('Successful insertion of a row in SQL table',()=>{
    expect(functions.insertnewrow('ankitha.krishnamoorthy@gmail.com','ankitha')).toBeTruthy();
    expect(functions.insertnewrow('ankitha.krishnamoorthy@gmail.com','akshaya')).toBe(3);
});