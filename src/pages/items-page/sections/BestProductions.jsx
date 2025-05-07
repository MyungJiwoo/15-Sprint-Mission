import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { getItems } from "@apis/itemsApi";
import ProductCard from "@components/ProductCard";
import { breakpoints } from "@constants/breakpoints";

const Title = styled.h2`
  margin-bottom: 1.6rem;
  font-weight: bold;
  font-size: 2rem;
  line-height: 3.2rem;
  color: var(--gray900);
`;

export const ItemsContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr); /* 모바일: 2개 */

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr); /* 태블릿: 3개 */
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr); /* PC: 5개 */
  }
`;

const BestProductions = () => {
  const [bestItemsData, setBestItemsData] = useState();
  const [count, setCount] = useState(1);

  const updateCount = () => {
    const width = window.innerWidth;
    if (width >= parseInt(breakpoints.desktop)) {
      setCount(4);
    } else if (width >= parseInt(breakpoints.tablet)) {
      setCount(2);
    } else {
      setCount(1);
    }
  };

  const fetchItemsData = useCallback(async () => {
    try {
      const result = await getItems(1, count, "favorite", "");
      setBestItemsData(result.list);
    } catch (error) {
      console.error("Failed to fetch donate data:", error);
    }
  }, [count]);

  useEffect(() => {
    updateCount();
    window.addEventListener("resize", updateCount); // 브라우저 크기 변경 감지
  }, []);

  useEffect(() => {
    if (count > 0) fetchItemsData();
  }, [count, fetchItemsData]);

  return (
    <div>
      <Title>베스트 상품</Title>
      <ItemsContainer>
        {bestItemsData?.map((item) => (
          <ProductCard
            id={item.id}
            src={item.images[0]}
            title={item.name}
            price={item.price}
            like={item.favoriteCount}
          ></ProductCard>
        ))}
      </ItemsContainer>
    </div>
  );
};

export default BestProductions;
