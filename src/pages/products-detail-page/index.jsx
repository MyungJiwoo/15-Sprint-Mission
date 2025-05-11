import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ProductDetailSection from "@pages/products-detail-page/components/ProductDetailSection";
import InquiryFormSection from "@pages/products-detail-page/components/InquiryFormSection";
import InquiryItemsSection from "@pages/products-detail-page/components/InquiryItemsSection";
import BackIcon from "@assets/icons/back";

const ProductsDetailPage = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const handleNavigateToList = () => {
    navigate("/items");
  };

  return (
    <ProductsDetailPageLayout>
      <ProductDetailSection productId={productId} />
      <InquiryFormSection />
      <InquiryItemsSection productId={productId} />
      <NavigateToListButton onClick={handleNavigateToList}>
        <span>목록으로 돌아가기</span>
        <BackIcon />
      </NavigateToListButton>
    </ProductsDetailPageLayout>
  );
};

export default ProductsDetailPage;

const ProductsDetailPageLayout = styled.div``;

const NavigateToListButton = styled.button`
  margin: 4rem auto 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 50rem;
  border: none;
  background-color: var(--blue);
  font-size: 1.6rem;
  color: var(--white);
`;
