import DesktopOrder from "./DesktopOrder";
import MobileOrder from "./MobileOrder";

const Order = ({ order, onCancel, onComplete, onDelete, onViewDetails }) => {
  return (
    <>
      <DesktopOrder
        order={order}
        onCancel={onCancel}
        onComplete={onComplete}
        onDelete={onDelete}
        onViewDetails={onViewDetails}
      />

      <MobileOrder
        order={order}
        onCancel={onCancel}
        onComplete={onComplete}
        onDelete={onDelete}
        onViewDetails={onViewDetails}
      />
    </>
  );
};

export default Order;
