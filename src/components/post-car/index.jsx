import styled from "styled-components";
import CustomButton from "components/common/custom-button";
import ReusableCar from "../car";

const PostCar = ({ data, onDelete, onViewDetails }) => {
  return (
    <ReusableCar data={data}>
      <CTAContainer>
        <CustomButton type="primary" onClick={onDelete} title="delete post" />

        {data.accepted && (
          <CustomButton
            type="primary"
            onClick={onViewDetails}
            title="view details"
          />
        )}
      </CTAContainer>

      <PostStatus accepted={data.accepted}>
        {data.accepted ? "accepted" : "pending"}
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
  background-color: ${({ accepted }) => (accepted ? "#3E6F36" : "#f00")};
  color: #fff;
  font-size: 13px;
  padding: 3px;
  font-weight: 600;
  border-radius: 6px;
  text-transform: capitalize;
`;

export default PostCar;
