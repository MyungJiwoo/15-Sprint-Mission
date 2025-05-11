import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { breakpoints } from "@constants/breakpoints";
import HeartIcon from "@assets/icons/heart";
import Profile from "/profile@3x.png";
import { getProduct } from "@apis/productApi";
import NotFoundImg from "@assets/imgs/notFoundImage@2x.png";
import Tag from "@pages/products-detail-page/components/Tag";
import ProductInfo from "@pages/products-detail-page/components/ProductInfo";
import { formatDate } from "@/utils/formatDate";
import MoreIcon from "@assets/icons/more";

const ProductDetailSection = ({ productId }) => {
  const [detailData, setDetailData] = useState({});
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const imgRef = useRef(null);

  const handleImgError = () => {
    if (imgRef.current && imgRef.current.src !== NotFoundImg) {
      imgRef.current.src = NotFoundImg;
    }
  };

  const handleEditClick = () => {
    setSelectIsOpen(false);
  };
  const handleDeleteClick = () => {
    setSelectIsOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);
        setDetailData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <ResponsiveLayout>
      <ProductImage
        ref={imgRef}
        src={detailData?.images?.[0] || NotFoundImg}
        alt="상품 이미지"
        onError={handleImgError}
      />

      <ProductContentSection>
        <ProductHeader>
          <ProductTitleWithActions>
            <Title>{detailData.name}</Title>

            <ContextActionMenu>
              <ContextActionButton
                onClick={() => setSelectIsOpen(!selectIsOpen)}
              >
                <MoreIcon />
              </ContextActionButton>
              {selectIsOpen && (
                <ContextActionList>
                  <ContextActionItem onClick={handleEditClick}>
                    수정하기
                  </ContextActionItem>
                  <ContextActionItem onClick={handleDeleteClick}>
                    삭제하기
                  </ContextActionItem>
                </ContextActionList>
              )}
            </ContextActionMenu>
          </ProductTitleWithActions>

          <Price>{Number(detailData.price).toLocaleString()}원</Price>
        </ProductHeader>

        <ProductDescriptionSection>
          <ProductInfo title="상품 소개">
            <ProductDetailsContent>
              {detailData.description}
            </ProductDetailsContent>
          </ProductInfo>

          <ProductInfo title="상품 태그">
            <ProductTagsContainer>
              {detailData?.tags?.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </ProductTagsContainer>
          </ProductInfo>
        </ProductDescriptionSection>

        <ProductMetaSection>
          <ProfileImage src={Profile}></ProfileImage>
          <MetaInfoContainer>
            <Author>{detailData.ownerNickname}</Author>
            <CreatedAt>{formatDate(detailData.updatedAt)}</CreatedAt>
          </MetaInfoContainer>
          <LikeContainer>
            <HeartIcon />
            <LikeCount>
              {Number(detailData.favoriteCount).toLocaleString()}
            </LikeCount>
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

const ProductImage = styled.img`
  width: 50%;
  height: 50%;
  max-width: 40rem;
  max-height: 40rem;
  border-radius: 1.6rem;
  object-fit: cover;
  aspect-ratio: 1/1;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
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
  max-width: calc(100% - 4rem);
  float: left;
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
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const LikeCount = styled.p`
  font-size: 1.6rem;
  color: var(--gray500);
`;

const ContextActionMenu = styled.div`
  position: relative;

  p {
    font-size: 1.4rem;
    margin-right: 1rem;
  }
`;

const ProductTitleWithActions = styled.div`
  width: 100%;
`;

const Inquiry = styled.p`
  max-width: calc(100% - 4rem);
  float: left;
  font-size: 1.4rem;
  line-height: 2.4rem;
`;

const ContextActionList = styled.ul`
  position: absolute;
  top: 3rem;
  right: 0;
  border-radius: 0.7rem;
  border: 1px solid var(--gray200);
  background-color: var(--white);
`;

const ContextActionButton = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ContextActionItem = styled.li`
  width: 10rem;
  padding: 0.8rem 1rem;
  text-align: center;
  list-style: none;
  font-size: 1.4rem;
  color: var(--gray500);
  cursor: pointer;

  &:hover {
    background-color: var(--gray100);
  }

  &:first-of-type {
    border-bottom: 1px solid var(--gray200);
  }
`;
