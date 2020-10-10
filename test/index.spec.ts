import { Index } from '@src/index'    


describe('xpto', ()=> {
  it('first', ()=>{
    const index = new Index();
    const result = index.soma(1, 2);
    expect(result).toEqual(3);
  })
})