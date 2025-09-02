const ProductImages = ({ images }: { images: string[] }) => {
  return (
    <div className="hidden md:grid grid-cols-2 gap-5 w-full lg:w-[60%] h-fit">
      {images?.slice(0, 4).map((image: string, index: number) => (
        <div
          key={index}
          className="bg-[#F6F6F6] rounded-lg h-[310px] lg:h-[415px] overflow-hidden font-Montserrat relative max-w-[370px]"
        >
          <img
            src={image}
            alt="Item Image"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductImages;
