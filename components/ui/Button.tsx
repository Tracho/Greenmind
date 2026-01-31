type Props = {
  subtitle?: string;
  classStyle?: string;
  newP?: string;
  children?: React.ReactNode;
}

function Button({ subtitle, children, classStyle, newP }: Props) {
  let this_classStyle = classStyle ? classStyle : "bg_aquamarine";
  let this_newP = newP ? newP : "px-6 py-3";
  return (<>
    <button className={`
    flex items-center gap-2 text_color_dark text-lg
     rounded-lg font-medium cursor-pointer ${this_newP} ${this_classStyle}`}>
      {subtitle}
      {children}
    </button>
  </>);
}

export default Button;