import { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import InquiryItem from "@pages/products-detail-page/components/InquiryItem";
import InquiryEmptyImage from "@assets/imgs/InquiryEmpty@2x.png";
import { getProductComments } from "@apis/productApi";

const InquiryItemsSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef();

  const loadComments = useCallback(async () => {
    if (!hasNext) return;

    const data = await getProductComments(productId, 10, cursor);
    setComments((prev) => [...prev, ...data.list]);
    setCursor(data.nextCursor);
    setHasNext(!!data.nextCursor);
  }, [productId, cursor, hasNext]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          loadComments();
        }
      },
      { threshold: 1 }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadComments, hasNext]);

  return (
    <InquiryItemsContainer>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <InquiryItem key={comment.id} comment={comment} />
        ))
      ) : (
        <InquiryEmptyContainer>
          <img src={InquiryEmptyImage} alt="문의 없음" />
          <p>아직 문의가 없어요</p>
        </InquiryEmptyContainer>
      )}
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
