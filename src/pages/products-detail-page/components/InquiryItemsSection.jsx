import styled from "@emotion/styled";
import InquiryItem from "@pages/products-detail-page/components/InquiryItem";
import InquiryEmptyImage from "@assets/imgs/InquiryEmpty@2x.png";

const InquiryItemsSection = () => {
  return (
    <InquiryItemsContainer>
      <InquiryItem />
      <InquiryItem />
      <InquiryItem />
      <InquiryItem />

      <InquiryEmptyContainer>
        <img src={InquiryEmptyImage} alt="문의 없음" />
        <p>아직 문의가 없어요</p>
      </InquiryEmptyContainer>
    </InquiryItemsContainer>
  );
};

export default InquiryItemsSection;

const InquiryItemsContainer = styled.div``;

const InquiryEmptyContainer = styled.div`
  margin: 4.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 25%;
    min-width: 19rem;
    min-width: 14rem;
    height: auto;
  }

  p {
    font-size: 1.4rem;
    color: var(--gray300);
  }
`;
