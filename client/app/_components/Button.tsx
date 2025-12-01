export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className="w-full rounded-2xl py-2.5 bg-[#1A80E5] font-bold text-[#F7FAFC] text-[14px] cursor-pointer"
      {...props}
    >
      {props.value}
    </button>
  );
};
