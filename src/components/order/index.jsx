import DesktopOrder from "./DesktopOrder";
import MobileOrder from "./MobileOrder";

const Order = ({ order, onCancel, onComplete, onDelete }) => {
  return (
    <>
      <DesktopOrder
        order={order}
        onCancel={onCancel}
        onComplete={onComplete}
        onDelete={onDelete}
      />

      <MobileOrder
        order={order}
        onCancel={onCancel}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </>
  );
};

export default Order;
