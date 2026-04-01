import { ComponentProps, forwardRef } from "react";
const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => {
  return (<>
    <input className="bg-white relative rounded-xl py-5 ps-5 pe-12  w-full" placeholder="text..." type="text"  {...props} ref={ref} />
  </>);
});

export default Input;

