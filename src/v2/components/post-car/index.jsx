import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "../car";
import useLocale from "v2/hooks/useLocale";

const PostCar = ({ data, onDelete, onArchive, onRestore, onViewDetails }) => {
  const { i18n, lang } = useLocale();

  return (
    <ReusableCar
      brandName={data.brand.name[lang]}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      price={data.price.daily}
      year={data.year}
    >
      <CTAContainer>
        {!data.accepted && (
          <CustomButton
            type="primary"
            onClick={onDelete}
            title={i18n("deletePost")}
          />
        )}

        {data.accepted && !data.archived && (
          <CustomButton
            type="primary"
            onClick={onArchive}
            title={i18n("archivePost")}
          />
        )}

        {data.accepted && data.archived && (
          <CustomButton
            type="primary"
            onClick={onRestore}
            title={i18n("restorePost")}
          />
        )}

        <CustomButton
          type="primary"
          onClick={onViewDetails}
          title={i18n("viewDetails")}
        />
      </CTAContainer>

      <PostStatus accepted={data.accepted} archived={data.archived}>
        {data.archived
          ? i18n("archived")
          : data.accepted
          ? i18n("active")
          : i18n("pending")}
      </PostStatus>
    </ReusableCar>
  );
};

const CTAContainer = styled.div`
  padding: 10px 5px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  gap: 10px;

  > * {
    height: 32px;
    font-size: 14px;
    font-weight: 400;
  }
`;

const PostStatus = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${({ archived, accepted }) =>
    archived ? "#f00" : accepted ? "#1A8331" : "#FFA500"};
  color: #fff;
  font-size: 13px;
  padding: 3px 7px;
  font-weight: 600;
  border-radius: 6px;
  text-transform: capitalize;
`;

export default PostCar;
