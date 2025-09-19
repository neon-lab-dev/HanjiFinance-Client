const ProductInfo = ({productCode,madeIn,category} : {productCode: string,madeIn:string,category:string}) => {
  return (
    <div className="flex items-center gap-3 mt-6 md:mt-8 mb-8">
      <div className="flex flex-col gap-4 text-base md:text-xl font-medium leading-normal text-neutral-50">
        <p className="">Product Code</p>
        <p className="">Collection</p>
        <p className="">Made In</p>
      </div>

      <div className="flex flex-col gap-4 text-neutral-50 text-xl font-medium leading-normal">
        <p className="">:</p>
        <p className="">:</p>
        <p className="">:</p>
      </div>

      <div className="flex flex-col gap-4 capitalize">
        {/* Product code */}
        <p className="text-neutral-20 text-lg md:text-xl font-semibold leading-normal">
        {productCode.substring(0, 7)}
        </p>
        {/* Collection */}
        <p className="text-neutral-20 text-lg md:text-xl font-semibold leading-normal">
         {category}
        </p>
        {/* Made in */}
        <p className="text-neutral-20 text-lg md:text-xl font-semibold leading-normal">
          {madeIn}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
