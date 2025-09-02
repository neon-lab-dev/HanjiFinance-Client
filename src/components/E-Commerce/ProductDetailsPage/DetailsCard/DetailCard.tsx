/* eslint-disable @typescript-eslint/no-explicit-any */

type TDetailCard =
  {
    icon: any;
    title: string;
    description: string;
    children?: React.ReactNode;
    variant: string;
  }

const DetailCard:React.FC<TDetailCard> = ({ icon, title, description, children, variant }) => {
    // Card Variants
  const variantStyles = {
    clothDetails: {
      bgColor: "bg-[#FDF9E9]",
      borderColor: "border-[#F2B01C]",
    },
    productStory: {
      bgColor: "bg-[#F0F3FE]",
      borderColor: "border-[#4B64E6]",
    },
    shippingDetails: {
      bgColor: "bg-[#F6F6F6]",
      borderColor: "border-[#000]",
    },
  };

  const { bgColor, borderColor } = variantStyles[variant];

  return (
    <div className={`${bgColor} px-5 py-6 border-l ${borderColor} border-dashed flex flex-col gap-6 rounded-r-2xl relative`}>
      <div className="flex items-center gap-3">
        <img src={icon} alt="" className="size-5" />
        <h1 className="text-[#333] text-xl font-semibold leading-normal">{title}</h1>
      </div>
      <p className="text-[#454545] text-sm md:text-lg font-medium leading-8">{description}</p>
      {children}
      {/* <img src={IMAGES.detailsCardBgShape1} alt="" className='right-0 bottom-0 w-full' /> */}
    </div>
  );
};

export default DetailCard;
