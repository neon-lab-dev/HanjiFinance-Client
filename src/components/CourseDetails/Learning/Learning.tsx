import { motion } from "framer-motion";
import { ICONS, IMAGES } from "../../../assets";

const Learning = () => {
  const blurVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const profileStats = [
    { value: "100+", title: "Posts" },
    { value: "187K", title: "Followers" },
    { value: "1", title: "Following" },
  ];

  return (
    <div className=" py-10 font-Montserrat space-y-4">
      <div className=" rounded-lg shadow-lg shadow-accent-5/10 p-4">
        <motion.div
          className="flex flex-col sm:flex-row md:flex-col xl:flex-row md:sticky md:top-[120px] self-start gap-12 items-center w-full md:w-[45%] lg:w-[50%]"
          variants={blurVariants}
        >
          {/* Profile name and picture */}
          <div className="flex flex-col gap-6 items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-neutral-5 font-bold text-[26px] leading-[30px]">
                Instructor
              </h1>
              <img src={ICONS.blueTick} alt="" className="size-6" />
            </div>
            <div className="bg-gradient-profile-picture size-[262px] rounded-full p-1">
              <div className="bg-white rounded-full p-4">
                <img src={IMAGES.avatar} alt="" className="rounded-full" />
              </div>
            </div>
          </div>
          {/* Profile stats */}
          <div className="flex flex-col gap-6 items-center">
            <h1 className="text-neutral-5 font-bold text-lg leading-5">
              Amandeep Singh Juneja
            </h1>
            <div className="flex gap-6">
              {profileStats?.map((item) => (
                <div
                  key={item?.title}
                  className="flex flex-col items-center gap-2"
                >
                  <h1 className="text-neutral-5 font-semibold text-lg leading-5">
                    {item?.value}
                  </h1>
                  <p className="text-neutral-5 text-sm leading-4">
                    {item?.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learning;
