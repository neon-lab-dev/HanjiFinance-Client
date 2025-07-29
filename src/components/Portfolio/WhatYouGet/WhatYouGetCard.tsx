type TWhatYouGetCard = {
  item: {
    icon: string;
    title: string;
    description: string;
  };
};

const WhatYouGetCard: React.FC<TWhatYouGetCard> = ({ item }) => {
  return (
    <div className="w-full p-6 border border-neutral-98 rounded-lg bg-white font-Montserrat flex flex-col justify-between">
      <div className="bg-neutral-100 rounded-lg p-3 flex items-center justify-center w-fit">
        <img src={item.icon} alt="" className="size-9" />
      </div>

      <div className="mt-6">
        <h2 className="text-neutral-10 text-xl font-medium leading-6">
          {item.title}
        </h2>
        <p className="text-neutral-50 text-sm mt-3">{item.description}</p>
      </div>
    </div>
  );
};

export default WhatYouGetCard;
