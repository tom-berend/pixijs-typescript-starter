
// import { V3 } from "../source/math/v3";


beforeEach(() => {
    // console.log('before')
})

afterEach(() => {
    // console.log('after');
})


test("build a test", () => {

    const a = 5
    const b = 3

    expect(a + b).toEqual(8)
    expect(a + b).not.toEqual(5)
    expect(a < b).toBeTruthy
    expect((a + b).toString() + 'b').toEqual('8b')

})

