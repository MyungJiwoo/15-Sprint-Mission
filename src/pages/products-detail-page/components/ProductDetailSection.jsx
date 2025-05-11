import styled from "@emotion/styled";
import { breakpoints } from "@constants/breakpoints";
import HeartIcon from "@assets/icons/heart";
import Profile from "/profile@3x.png";

const ProductDetailSection = () => {
  return (
    <ResponsiveLayout>
      <ProductImageSection>
        {/* <ProductImage src="" alt="상품 이미지" /> */}
      </ProductImageSection>

      <ProductContentSection>
        <ProductHeader>
          <Title>아이패드 미니 팔아요</Title>
          <Price>500,000원</Price>
        </ProductHeader>

        <ProductDescriptionSection>
          <ProductDetailsTitle>상품 소개</ProductDetailsTitle>
          <ProductDetailsContent>
            액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀
            신경쓰이지않을정도입니다. 박스 보관중입니다. 메모용과
            넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을 못느꼈네요
            잘 안써서 싸게넘깁니다! 택배거래안합니다.
          </ProductDetailsContent>

          <ProductDetailsTitle>상품 태그</ProductDetailsTitle>
          <ProductTagsContainer>
            <ProductTag>#아이패드미니</ProductTag>
            <ProductTag>#애플</ProductTag>
            <ProductTag>#아이패드</ProductTag>
          </ProductTagsContainer>
        </ProductDescriptionSection>

        <ProductMetaSection>
          <ProfileImage src={Profile}></ProfileImage>
          <MetaInfoContainer>
            <Author>총명한 판다</Author>
            <CreatedAt>2024. 01. 02</CreatedAt>
          </MetaInfoContainer>
          <LikeContainer>
            <HeartIcon />
            <LikeCount>123</LikeCount>
          </LikeContainer>
        </ProductMetaSection>
      </ProductContentSection>
    </ResponsiveLayout>
  );
};

export default ProductDetailSection;

const ResponsiveLayout = styled.div`
  padding: 4rem 0;
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid var(--gray200);

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ProductImageSection = styled.div`
  width: 50%;
  height: 50%;
  max-width: 40rem;
  max-height: 40rem;
  aspect-ratio: 1/1;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const ProductImage = styled.img`
  border-radius: 1.6rem;
  object-fit: cover;
`;

const ProductContentSection = styled.div`
  width: 100%;
`;

const ProductHeader = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  border-bottom: 1px solid var(--gray200);
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const Price = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 3.2rem;
  font-weight: 600;
`;

const ProductDescriptionSection = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductDetailsTitle = styled.h3`
  color: var(--gray600);
  font-size: 1.6rem;
  font-weight: 600;
`;

const ProductDetailsContent = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  line-height: 2.6rem;
  word-break: break-word;
`;

const ProductTagsContainer = styled.div`
  display: flex;
  gap: 0.7rem 0.5rem;
  flex-wrap: wrap;
`;

const ProductTag = styled.p`
  width: fit-content;
  padding: 0.5rem 1.6rem;
  background-color: var(--gray100);
  font-size: 1.6rem;
  font-weight: 400;
  border-radius: 50rem;
`;

const ProductMetaSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const MetaInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-right: 1px solid var(--gray200);
`;

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const Author = styled.p`
  color: var(--gray600);
  font-size: 1.4rem;
`;

const CreatedAt = styled.p`
  color: var(--gray300);
  font-size: 1.4rem;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50rem;
  background-color: var(--white);
  border: 1px solid var(--gray200);
  cursor: pointer;

  &:hover svg {
    // todo: hover ui
  }
`;

const LikeCount = styled.p``;
