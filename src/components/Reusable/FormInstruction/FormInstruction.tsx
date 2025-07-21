const FormInstruction = ({
  title,
  instructions,
}: {
  title: string;
  instructions: { icon: string; text: string }[];
}) => {
  return (
    <div className="bg-surface-75 p-6 rounded-l-[20px] w-[40%]">
      <h1 className="text-neutral-30 text-xl font-bold leading-6">{title}</h1>
      <div className="flex flex-col gap-4 mt-8 w-full">
        {instructions.map((item) => (
          <div key={item.text} className="flex items-center gap-2 w-full">
            <div className="bg-surface-30 size-10 p-2 rounded-full flex items-center justify-center">
              <img src={item.icon} alt="" />
            </div>
            <p className="text-neutral-30 text-sm font-medium leading-[18px] max-w-[400px]">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormInstruction;
