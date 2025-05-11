import { useState } from "react";
import styled from "@emotion/styled";
import BaseForm from "@components/BaseForm";
import InquiryTextareaField from "@pages/products-detail-page/components/InquiryTextareaField";

const InquiryFormSection = () => {
  const [inquiry, setInquiry] = useState("");

  return (
    <InquiryFormLayout>
      <BaseForm
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inquiry);
        }}
      >
        <InquiryTextareaField value={inquiry} onChange={setInquiry} />
        <SubmitBtn>등록</SubmitBtn>
      </BaseForm>
    </InquiryFormLayout>
  );
};

export default InquiryFormSection;

const InquiryFormLayout = styled.div`
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
