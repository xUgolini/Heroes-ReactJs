import { useForm } from "react-hook-form";
import Button from "./Button";
const HeroFilter = ({ handleSearch }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (form) => handleSearch(form.name);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <input
        {...register("name")}
        type="text"
        placeholder="Enter the hero's name"
        className="p-2 border border-gray-400 border-solid"
      />
      <Button>Filter</Button>
    </form>
  );
};

export default HeroFilter;
