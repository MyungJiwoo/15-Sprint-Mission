import { useState } from "react";
import styled from "@emotion/styled";
import BaseForm from "@components/BaseForm";
import CommentTextareaField from "@pages/products-detail-page/components/CommentTextareaField";
import { useFormValidation } from "@pages/products-detail-page/hooks/useFormValidation";

const CommentFormSection = () => {
  const [btnAvailable, setBtnAvailable] = useState(false);
  const [comment, setComment] = useState("");

  useFormValidation(comment, setBtnAvailable);

  return (
    <CommentFormLayout>
      <BaseForm
        onSubmit={(e) => {
          e.preventDefault();
          console.log(comment);
        }}
      >
        <CommentTextareaField value={comment} onChange={setComment} />
        <SubmitBtn disabled={!btnAvailable}>등록</SubmitBtn>
      </BaseForm>
    </CommentFormLayout>
  );
};

export default CommentFormSection;

const CommentFormLayout = styled.div`
  margin-top: 4rem;
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

  &:disabled {
    background-color: var(--gray300);
    cursor: not-allowed;
  }
`;
