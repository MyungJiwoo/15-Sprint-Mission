import { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import CommentItem from "@pages/products-detail-page/components/CommentItem";
import CommentEmptyImage from "@assets/imgs/CommentEmpty@2x.png";
import { getProductComments } from "@apis/productApi";

const CommentItemsSection = ({ productId }) => {
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
    <CommentItemsContainer>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} data={comment} />
        ))
      ) : (
        <CommentEmptyContainer>
          <img src={CommentEmptyImage} alt="문의 없음" />
          <p>아직 문의가 없어요</p>
        </CommentEmptyContainer>
      )}
    </CommentItemsContainer>
  );
};

export default CommentItemsSection;

const CommentItemsContainer = styled.div``;

const CommentEmptyContainer = styled.div`
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
