import styled from "@emotion/styled";

const ProductInfo = ({ title, children }) => {
  return (
    <ProductInfoLayout>
      <ProductDetailsTitle>{title}</ProductDetailsTitle>
      <ProductDetailsContent>{children}</ProductDetailsContent>
    </ProductInfoLayout>
  );
};

export default ProductInfo;

const ProductInfoLayout = styled.div`
  margin: 1rem 0;
`;

const ProductDetailsTitle = styled.h3`
  color: var(--gray600);
  font-size: 1.6rem;
  font-weight: 600;
`;

const ProductDetailsContent = styled.div`
  margin: 1.5rem 0;
`;
