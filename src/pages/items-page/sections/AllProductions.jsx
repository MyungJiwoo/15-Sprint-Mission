import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { getItems } from "@apis/itemsApi";
import ProductCard from "@components/ProductCard";
import { breakpoints } from "@constants/breakpoints";
import LeftArrow from "@assets/icons/leftArrow";
import RightArrow from "@assets/icons/rightArrow";
import SearchIcon from "@assets/icons/search";
import useDeviceSize from "@hooks/useDeviceSize";
import SortIcon from "@assets/icons/sort";
import DropDownIcon from "@assets/icons/dropdown";

const Pagination = ({ totalCount, count, page, onChange }) => {
  const totalPage = Math.ceil(totalCount / count);
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);

  let startPage = page - half;
  let endPage = page + half;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPage, maxVisible);
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, totalPage - maxVisible + 1);
  }

  const tagList = [];
  for (let i = startPage; i <= endPage; i++) {
    tagList.push(
      <Li key={i} onClick={() => onChange(i)} active={i === page}>
        {i}
      </Li>
    );
  }

  return (
    <Ul>
      <Li key="first" onClick={() => onChange(1)} active={false}>
        <LeftArrow />
      </Li>
      {tagList}
      <Li key="last" onClick={() => onChange(totalPage)} active={false}>
        <RightArrow />
      </Li>
    </Ul>
  );
};

const AllProductions = () => {
  const { isMobile } = useDeviceSize();
  const [itemsData, setItemsData] = useState();
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [count, setCount] = useState(1);
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const updateCount = () => {
    const width = window.innerWidth;
    if (width >= parseInt(breakpoints.desktop)) {
      setCount(10);
    } else if (width >= parseInt(breakpoints.tablet)) {
      setCount(6);
    } else {
      setCount(4);
    }
    setPage(1);
  };

  const ChangeSort = (sort) => {
    setSort(sort);
    setPage(1);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("resize", updateCount); // 브라우저 크기 변경 감지
  }, []);

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const result = await getItems(page, count, sort, "");
        setItemsData(result.list);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error("Failed to fetch donate data:", error);
      }
    };

    fetchItemsData();
  }, [count, page, sort]);

  return (
    <div>
      {!isMobile && (
        <HeaderSection>
          <Title>전체 상품</Title>
          <ProductControlBar>
            <InputWrapper>
              <SearchIcon />
              <Input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
              ></Input>
            </InputWrapper>
            <Link to="/additem">
              <Button>상품 등록하기</Button>
            </Link>
            <SortDropDown>
              <SelectButton onClick={() => setSelectIsOpen(!selectIsOpen)}>
                <p>{sort === "recent" ? "최신순" : "좋아요순"}</p>
                <DropDownIcon />
              </SelectButton>
              {selectIsOpen && (
                <SortUl>
                  <SortLi
                    onClick={() => {
                      setSort("recent");
                      setSelectIsOpen(false);
                    }}
                  >
                    최신순
                  </SortLi>
                  <SortLi
                    onClick={() => {
                      setSort("favorite");
                      setSelectIsOpen(false);
                    }}
                  >
                    좋아요순
                  </SortLi>
                </SortUl>
              )}
            </SortDropDown>
          </ProductControlBar>
        </HeaderSection>
      )}

      {isMobile && (
        <>
          <HeaderSection>
            <Title>전체 상품</Title>
            <Button>상품 등록하기</Button>
          </HeaderSection>
          <HeaderSection>
            <ProductControlBar>
              <MobileInputWrapper>
                <SearchIcon />
                <Input
                  type="text"
                  placeholder="검색할 상품을 입력해주세요"
                ></Input>
              </MobileInputWrapper>
              <SortDropDown>
                <SelectButton onClick={() => setSelectIsOpen(!selectIsOpen)}>
                  <SortIcon />
                </SelectButton>
                {selectIsOpen && (
                  <SortUl>
                    <SortLi
                      onClick={() => {
                        setSort("recent");
                        setSelectIsOpen(false);
                      }}
                    >
                      최신순
                    </SortLi>
                    <SortLi
                      onClick={() => {
                        setSort("favorite");
                        setSelectIsOpen(false);
                      }}
                    >
                      좋아요순
                    </SortLi>
                  </SortUl>
                )}
              </SortDropDown>
            </ProductControlBar>
          </HeaderSection>
        </>
      )}

      <ItemsContainer>
        {itemsData?.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            src={item.images[0]}
            title={item.name}
            price={item.price}
            like={item.favoriteCount}
          ></ProductCard>
        ))}
      </ItemsContainer>

      <PaginationContainer>
        <Pagination
          totalCount={totalCount}
          count={count}
          page={page}
          onChange={setPage}
        />
      </PaginationContainer>
    </div>
  );
};

export default AllProductions;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 1rem;
  }
`;

const ProductControlBar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const Title = styled.h2`
  flex-shrink: 0;
  font-weight: bold;
  font-size: 2rem;
  line-height: 3.2rem;
  color: var(--gray900);
`;

const InputWrapper = styled.label`
  display: flex;
  align-items: center;

  width: 25rem;
  padding: 0.4rem;
  background-color: var(--gray100);
  color: var(--gray400);
  border: none;
  border-radius: 0.7rem;
`;

const MobileInputWrapper = styled(InputWrapper)`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  margin: 0 0.3rem;
  background-color: inherit;
  border: none;
  font-size: 1.4rem;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  flex-shrink: 0;
  padding: 0.8rem 1.5rem;
  border-radius: 0.7rem;
  background-color: var(--blue);
  color: var(--white);
  border: none;
  font-size: 1.4rem;

  &:hover {
    opacity: 0.7;
  }
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  border: 1px solid var(--gray200);
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const SortDropDown = styled.div`
  position: relative;

  p {
    font-size: 1.4rem;
    margin-right: 1rem;
  }
`;

const SelectButton = styled.button`
  width: 9rem;
  padding: 0.8rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.7rem;
  border: 1px solid var(--gray200);
  background-color: var(--white);
  cursor: pointer;

  @media (max-width: ${breakpoints.tablet}) {
    width: fit-content;
  }
`;

const SortUl = styled.ul`
  position: absolute;
  top: 4rem;
  right: 0;
  border-radius: 0.7rem;
  border: 1px solid var(--gray200);
  background-color: var(--white);
`;

const SortLi = styled.li`
  width: 10rem;
  padding: 0.8rem 1rem;
  text-align: center;
  list-style: none;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: var(--gray100);
  }

  &:first-child {
    border-bottom: 1px solid var(--gray200);
  }
`;

const ItemsContainer = styled.div`
  margin-top: 1.6rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr); /* 모바일: 2개 */

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr); /* 태블릿: 3개 */
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(5, 1fr); /* PC: 5개 */
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.3rem;
  cursor: pointer;
`;

const Li = styled.li`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--gray200);
  border-radius: 100%;
  background-color: ${({ active }) =>
    active ? "var(--blue)" : "var(--white)"};
  color: ${({ active }) => (active ? "var(--white)" : "var(--gray800)")};
  font-size: 1.2rem;
  transition: none;

  &:hover {
    background-color: var(--gray100);
    color: var(--gray800);
  }
`;
