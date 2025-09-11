import { useState} from "react";
import { TfiSearch } from "react-icons/tfi";
import FiltrationDropdown, { type Option } from "../../Reusable/FiltrationDropdown/FiltrationDropdown";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import ProductCard from "../ProductCard/ProductCard";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";


export type TProductSize = {
  _id: string;
  size: string;
  quantity: number;
  basePrice: number;
  discountedPrice: number;
};

export type TProduct = {
  _id: string;
  productId: string;
  imageUrls: string[];
  name: string;
  description: string;
  category: string;
  sizes: TProductSize[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};


const ProductsSection: React.FC = () => {
  const { data, isLoading: loading } = useGetAllProductsQuery({ keyword: "" });


  const [categories] = useState<Option[]>([
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" },
  ]);

  const [priceRanges] = useState<Option[]>([
    { label: "Under ₹500", value: "under-500" },
    { label: "₹500 - ₹1000", value: "500-1000" },
    { label: "Above ₹1000", value: "above-1000" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

 

  return (
    
      <div id="products" className="bg-gradient-courses-section-bg pt-[60px] w-full">
        <Container>
        <SectionTitle
        heading="Providing the best"
        subHeading="Comfort compounded daily. Sorry FD, you can’t match that."
      />

      {/* Filters + Search */}
      <div className="mt-12 hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiltrationDropdown
            label="Category"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <FiltrationDropdown
            label="Price Range"
            options={priceRanges}
            value={selectedPriceRange}
            onChange={setSelectedPriceRange}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-between w-[600px] h-fit px-6 py-4 border border-surface-90 rounded-lg text-[15px] font-medium font-Montserrat text-neutral-50">
            <input
              type="text"
              placeholder="Search for any product"
              className="outline-none flex-grow text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TfiSearch className="size-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mt-8">
        {loading ? (
          <p>Loading products...</p>
        ) : data?.data?.products?.length > 0 ? (
          data?.data?.products?.map((item:TProduct) => (
            <ProductCard key={item._id} item={item} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
          </Container>
          <div className="bg-gradient-courses-section h-[160px] w-full "></div>
      </div>
      

  );
};

export default ProductsSection;
