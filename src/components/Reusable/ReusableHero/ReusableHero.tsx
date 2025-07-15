import { IMAGES } from "../../../assets";

const ReusableHero = () => {
  const details = [
    {
      label: "Owner",
      value: "Amandeep Singh Juneja",
    },
    {
      label: "SEBI Registration No.",
      value: "To be updated post-approval",
    },
    {
      label: "Contact:",
      value: "hanjifinanceteam@gmail.com",
    },
  ];
  return (
    <div className="bg-surface-30 relative font-Montserrat">
      <img
        src={IMAGES.heroBg}
        alt="hero-image"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 pt-[148px] pb-20">
        <h1 className="text-neutral-30 text-[64px] font-bold leading-[70px] text-center">
          Terms and Conditions
        </h1>

        <div className="flex items-center justify-center gap-3 mt-6">
          {details.map((item, index, arr) => (
            <div key={item.label} className="flex items-center gap-[2px]">
              <div className="bg-surface-70 px-2 py-1 text-neutral-30 text-[15px] font-medium leading-[18px] rounded-[30px] w-fit">
                {item.label}
              </div>
              <p className="text-neutral-30 text-xl font-medium leading-6">
                {item.value}
              </p>
              {index !== arr.length - 1 && (
                <span className="text-neutral-90 text-[28px] font-medium leading-8 mx-2">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReusableHero;
