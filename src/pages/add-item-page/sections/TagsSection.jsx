import styled from "@emotion/styled";
import CloseIcon from "@assets/icons/close";

const TagsSection = ({ tags, deleteTag }) => {
  return (
    <TagsContainer>
      {Array.from(tags).map((tag) => (
        <Tag key={tag}>
          #{tag}
          <TagCloseBtn onClick={() => deleteTag(tag)}>
            <CloseIcon />
          </TagCloseBtn>
        </Tag>
      ))}
    </TagsContainer>
  );
};

export default TagsSection;

const TagsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.div`
  width: fit-content;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 3rem;
  background-color: var(--gray100);
  font-size: 1.4rem;
`;

const TagCloseBtn = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: var(--gray300);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
