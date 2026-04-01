import Input from "../ui/Input";
import Button from "../ui/Button";
import SVGSearch from "../icons/SVGSearch";
type Props ={
  alt:string,
  placeholder:string
}
function Form({alt,placeholder}:Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search"); // "search" — это атрибут name у вашего Input
    console.log(searchValue);
    e.currentTarget.reset();
  };
  return (<>
    <form onSubmit={handleSubmit} className="relative">
      <Input id="search" name="search" alt={alt} placeholder={placeholder}   />
      <Button classStyle="absolute end-2 top-2 bg_aquamarine" newP="p-3.5">
        <SVGSearch />
      </Button>
    </form>
  </>);
}

export default Form;