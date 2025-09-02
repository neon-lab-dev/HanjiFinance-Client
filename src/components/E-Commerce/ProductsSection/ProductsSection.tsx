import { useEffect, useState, useMemo } from "react";
import { TfiSearch } from "react-icons/tfi";
import FiltrationDropdown, { type Option } from "../../Reusable/FiltrationDropdown/FiltrationDropdown";
import Container from "../../Reusable/Container/Container";
import SectionTitle from "../../Reusable/Heading/Heading";
import ProductCard from "../ProductCard/ProductCard";


  export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  rating: number;
  imageUrl: string[];
  inStock?: boolean;
};

const ProductsSection: React.FC = () => {

const product: Product[] = [
  {
    id: "p1",
    name: "Nike Air Zoom Pegasus",
    category: "Shoes",
    price: 8999,
    stock: 25,
    brand: "Nike",
    rating: 4.5,
    imageUrl:
    [  "https://images.unsplash.com/photo-1606813902910-0a2f6f0b5e7f?w=500&q=80",],
      inStock: false,
  },
  {
    id: "p2",
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: 11999,
    stock: 10,
    brand: "Adidas",
    rating: 4.8,
    imageUrl:
    [  "https://images.unsplash.com/photo-1606813902910-0a2f6f0b5e7f?w=500&q=80",],

          inStock: true,
  },
  {
    id: "p3",
    name: "Apple iPhone 15 Pro",
    category: "Mobile",
    price: 129999,
    stock: 5,
    brand: "Apple",
    rating: 4.9,
    imageUrl:
         [  "https://images.unsplash.com/photo-1606813902910-0a2f6f0b5e7f?w=500&q=80",],

          inStock: true,
  },
  {
    id: "p4",
    name: "Samsung Galaxy S24 Ultra",
    category: "Mobile",
    price: 119999,
    stock: 12,
    brand: "Samsung",
    rating: 4.7,
    imageUrl:
          [  "https://images.unsplash.com/photo-1606813902910-0a2f6f0b5e7f?w=500&q=80",],

          inStock: true,
  },
  {
    id: "p5",
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 29999,
    stock: 20,
    brand: "Sony",
    rating: 4.6,
    imageUrl:
          [  "https://images.unsplash.com/photo-1606813902910-0a2f6f0b5e7f?w=500&q=80",],

          inStock: true,
  },
];

  const [products, setProducts] = useState<Product[]>(product);
  const [loading, setLoading] = useState<boolean>(false);

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

  // ✅ Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products"); // <-- change this to your backend API
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      const matchesPrice =
        selectedPriceRange === "under-500"
          ? product.price < 500
          : selectedPriceRange === "500-1000"
          ? product.price >= 500 && product.price <= 1000
          : selectedPriceRange === "above-1000"
          ? product.price > 1000
          : true;

      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, selectedCategory, selectedPriceRange, searchTerm]);

  return (
    
      <div className="bg-gradient-courses-section-bg pt-[60px] w-full">
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
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
