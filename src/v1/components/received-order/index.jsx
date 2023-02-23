import DesktopReceivedOrder from "./DesktopReceivedOrder";
import MobileReceivedOrder from "./MobileReceivedOrder";

const ReceivedOrder = ({ order, onApprove, onReject, onViewDetails }) => {
  return (
    <>
      <DesktopReceivedOrder
        order={order}
        onApprove={onApprove}
        onReject={onReject}
        onViewDetails={onViewDetails}
      />

      <MobileReceivedOrder
        order={order}
        onApprove={onApprove}
        onReject={onReject}
        onViewDetails={onViewDetails}
      />
    </>
  );
};

export default ReceivedOrder;
