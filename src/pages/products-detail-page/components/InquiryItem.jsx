import { useState } from "react";
import styled from "@emotion/styled";
import Profile from "/profile@3x.png";
import MoreIcon from "@assets/icons/more";
import InquiryTextareaField from "@pages/products-detail-page/components/InquiryTextareaField";
import { formatDate } from "@/utils/formatDate";

const InquiryItem = ({ comment }) => {
  const [inquiry, setInquiry] = useState(comment.content);
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const cancelEdit = () => {
    setIsEdit(false);
  };
  const confirmEdit = () => {
    setIsEdit(false);
  };

  const handleEditClick = () => {
    setIsEdit(true);
    setSelectIsOpen(false);
  };
  const handleDeleteClick = () => {
    setSelectIsOpen(false);
  };

  return (
    <InquiryItemLayout isEdit={isEdit}>
      {isEdit ? (
        <InquiryContainer>
          <InquiryTextareaField
            value={inquiry}
            onChange={setInquiry}
            isEdit={isEdit}
          />
        </InquiryContainer>
      ) : (
        <InquiryContainer>
          <Inquiry>{inquiry}</Inquiry>

          <InquiryActionMenu>
            <InquiryButton onClick={() => setSelectIsOpen(!selectIsOpen)}>
              <MoreIcon />
            </InquiryButton>
            {selectIsOpen && (
              <InquiryActionList>
                <InquiryActionItem onClick={handleEditClick}>
                  수정하기
                </InquiryActionItem>
                <InquiryActionItem onClick={handleDeleteClick}>
                  삭제하기
                </InquiryActionItem>
              </InquiryActionList>
            )}
          </InquiryActionMenu>
        </InquiryContainer>
      )}

      <ProductMetaSection>
        <ProfileImage src={comment?.writer.image || Profile} />
        <MetaInfoContainer>
          <Author>{comment.writer.nickname}</Author>
          <CreatedAt>{formatDate(comment.updatedAt)}</CreatedAt>
        </MetaInfoContainer>
        {isEdit && (
          <ActionButtons>
            <CancelBtn onClick={cancelEdit}>취소</CancelBtn>
            <SubmitBtn onClick={confirmEdit}>수정 완료</SubmitBtn>
          </ActionButtons>
        )}
      </ProductMetaSection>
    </InquiryItemLayout>
  );
};

export default InquiryItem;

const InquiryItemLayout = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid var(--gray200);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InquiryContainer = styled.div`
  width: 100%;
`;

const Inquiry = styled.p`
  max-width: calc(100% - 4rem);
  float: left;
  font-size: 1.4rem;
  line-height: 2.4rem;
`;

const InquiryButton = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProductMetaSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const MetaInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 100%;
`;

const Author = styled.p`
  color: var(--gray600);
  font-size: 1.2rem;
`;

const CreatedAt = styled.p`
  color: var(--gray300);
  font-size: 1.2rem;
`;

const InquiryActionMenu = styled.div`
  position: relative;

  p {
    font-size: 1.4rem;
    margin-right: 1rem;
  }
`;

const InquiryActionList = styled.ul`
  position: absolute;
  top: 3rem;
  right: 0;
  border-radius: 0.7rem;
  border: 1px solid var(--gray200);
  background-color: var(--white);
`;

const InquiryActionItem = styled.li`
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

const ActionButtons = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 1rem;
`;

const CancelBtn = styled.button`
  display: block;
  padding: 0.8rem 2rem;
  font-size: 1.6rem;
  color: var(--gray500);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  margin-left: auto;
  display: block;
  padding: 0.8rem 2rem;
  border-radius: 1.2rem;
  border: none;
  background-color: var(--blue);
  font-size: 1.6rem;
  color: var(--white);
`;
