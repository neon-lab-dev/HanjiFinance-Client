import { useGetAllOfferNoticesQuery } from "../../../redux/Features/OfferNotice/offerNoticeApi";
import Marquee from "react-fast-marquee";

const OfferHeader = () => {
  const { data: allOfferNotices, isLoading } = useGetAllOfferNoticesQuery({});

  const noticeText =
    allOfferNotices?.data?.offerNotices
      ?.map((notice: { offerNotice: string }) => notice.offerNotice)
      .join("  |  ") || "";

  return (
    <div className="h-[30px] w-full bg-gradient-to-r from-[#b91c1c] to-[#EA580C] flex items-center justify-center text-white text-sm font-medium font-Montserrat overflow-hidden relative">
      {isLoading ? (
        <div className="animate-pulse bg-white/30 rounded-md w-1/3 h-3 capitalize" />
      ) : noticeText ? (
        <Marquee
          className="whitespace-nowrap"
          speed={50}
          gradient={false}
          pauseOnHover
        >
          {noticeText}
        </Marquee>
      ) : (
        <span>No current offers</span>
      )}

      {/* Gradient Fade on both sides for smoothness */}
      <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#b91c1c] to-transparent" />
      <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#EA580C] to-transparent" />
    </div>
  );
};

export default OfferHeader;
