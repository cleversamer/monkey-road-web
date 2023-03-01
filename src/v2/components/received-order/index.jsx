import DesktopReceivedOrder from "./DesktopReceivedOrder";
import MobileReceivedOrder from "./MobileReceivedOrder";

const ReceivedOrder = ({
  order,
  onApprove,
  onReject,
  onDeliver,
  onViewDetails,
}) => {
  return (
    <>
      <DesktopReceivedOrder
        order={order}
        onApprove={onApprove}
        onReject={onReject}
        onDeliver={onDeliver}
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
