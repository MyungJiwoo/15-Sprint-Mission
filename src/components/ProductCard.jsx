import { useContext, createContext } from "react";
import styled from "@emotion/styled";
import HeartIcon from "@assets/icons/heart";

const ProductContext = createContext({
  id: null,
  src: "",
  title: "",
  price: 0,
  like: 0,
});

const ProductCard = ({ id, src, title, price = 0, like = 0, children }) => {
  const contextValue = {
    id,
    src,
    title,
    price,
    like,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      <ProductCardLayout>
        <ProductImg />
        <ProductTitle />
        <ProductPrice />
        <ProductLike />
        {children}
      </ProductCardLayout>
    </ProductContext.Provider>
  );
};

const ProductImg = () => {
  const { src } = useContext(ProductContext);

  return <Img src={src}></Img>;
};

const ProductTitle = () => {
  const { title } = useContext(ProductContext);

  return <Title>{title}</Title>;
};

const ProductPrice = () => {
  const { price } = useContext(ProductContext);

  return <Price>{price.toLocaleString()}원</Price>;
};

const ProductLike = () => {
  const { like } = useContext(ProductContext);

  return (
    <LikeContainer>
      <HeartIcon />
      <Like>{like.toLocaleString()}</Like>
    </LikeContainer>
  );
};

ProductCard.ProductImg = ProductImg;
ProductCard.ProductTitle = ProductTitle;
ProductCard.ProductPrice = ProductPrice;
ProductCard.ProductLike = ProductLike;

export default ProductCard;

const ProductCardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--gray800);
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  margin-bottom: 1rem;
  flex-shrink: 0;
  border-radius: 1.6rem;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const Title = styled.h3`
  font-weight: normal;
  font-size: 1.4rem;
  color: var(--gray800);
`;

const Price = styled.h2`
  font-weight: bold;
  font-size: 1.6rem;
  color: var(--gray800);
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--gray600);
`;

const Like = styled.p`
  font-weight: normal;
  font-size: 1.2rem;
`;
