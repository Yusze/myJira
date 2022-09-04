import {useState} from 'react';
interface person{
    name:string;
    age:number;
}
export function useArray<T>(initialArray:T[]) {
   const [value, setValue] = useState(initialArray);

   return {
    value, 
    setValue,
    add: (item:T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex:(index:number) => {
        const copy = [...value];
        copy.splice(index, 1);
        setValue(copy);
        
    }
   }
}