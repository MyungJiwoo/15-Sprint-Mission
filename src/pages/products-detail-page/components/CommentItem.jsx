import { useState } from "react";
import styled from "@emotion/styled";
import CommentTextareaField from "@pages/products-detail-page/components/CommentTextareaField";
import DropdownMenu from "@/components/DropdownMenu";
import WriterInfo from "@pages/products-detail-page/components/WriterInfo";

const CommentItem = ({ data }) => {
  const [comment, setComment] = useState(data.content);
  const [isEdit, setIsEdit] = useState(false);

  const cancelEdit = () => {
    setIsEdit(false);
  };
  const confirmEdit = () => {
    setIsEdit(false);
  };

  const handleEditClick = () => {
    setIsEdit(true);
    // 댓글 수정 로직
  };
  const handleDeleteClick = () => {
    // 댓글 삭제 로직
  };

  return (
    <CommentItemLayout isEdit={isEdit}>
      {isEdit ? (
        <CommentTextareaField
          value={comment}
          onChange={setComment}
          isEdit={isEdit}
        />
      ) : (
        <CommentContainer>
          <Comment>{comment}</Comment>

          <DropdownMenu
            dropdownItem1="수정하기"
            onDropdownItem1Click={handleEditClick}
            dropdownItem2="삭제하기"
            onDropdownItem2Click={handleDeleteClick}
          />
        </CommentContainer>
      )}

      <ProductMetaSection>
        <WriterInfo
          profileImg={data.writer.image}
          name={data.writer.nickname}
          updatedAt={data.updatedAt}
          size="s"
        />
        {isEdit && (
          <ActionButtons>
            <CancelBtn onClick={cancelEdit}>취소</CancelBtn>
            <SubmitBtn onClick={confirmEdit}>수정 완료</SubmitBtn>
          </ActionButtons>
        )}
      </ProductMetaSection>
    </CommentItemLayout>
  );
};

export default CommentItem;

const CommentItemLayout = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid var(--gray200);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Comment = styled.p`
  font-size: 1.4rem;
  line-height: 2.4rem;
  flex: 1;
`;

const ProductMetaSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
