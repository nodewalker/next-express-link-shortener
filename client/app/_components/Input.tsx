export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      className="w-full p-4 rounded-2xl focus:outline-0 bg-[#E8EDF2] placeholder:text-[#4F7396] placeholder:text-[16px]"
      {...props}
    ></input>
  );
};
