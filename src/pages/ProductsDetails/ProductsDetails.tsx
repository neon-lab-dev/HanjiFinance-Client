import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/E-Commerce/ProductDetailsPage/Breadcrumbs/Breadcrumbs";
import ImageCarousel from "../../components/E-Commerce/ProductDetailsPage/ProductCarousel/ImageCarousel";
import Container from "../../components/Reusable/Container/Container";
import { useGetSingleProductByIdQuery } from "../../redux/Features/Product/productApi";

const ProductsDetails = () => {
const {id} = useParams();
  const {data, isLoading} = useGetSingleProductByIdQuery(id);
  console.log(data);
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Tees", link: "/tees" },
    { label: "Age Group", link: "/tees/age-group" },
    { label: "Test" },
  ];


  return (
    <Container>
      <div className="font-Montserrat">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Product images for smaller device */}
      <ImageCarousel images={data?.data?.imageUrls}/>
      </div>
    </Container>
  );
};

export default ProductsDetails;
