import { useEffect, useState } from "react";
import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import Loader from "v2/components/loader";
import EmptyList from "v2/components/common/empty-list";
import OfficeOrder from "../office-order";
import rentOrdersApi from "v2/api/car/rentOrders";

const pageSize = 10;

const AdminOfficeOrders = ({ officeId }) => {
  const { i18n, lang } = useLocale();
  const [orders, setOrders] = useState({ list: [], loading: true });

  useEffect(() => {
    rentOrdersApi.admin
      .getOfficeReceivedOrders(officeId, 1, pageSize)
      .then((res) => setOrders({ loading: false, list: res.data.orders }))
      .catch(() => setOrders({ loading: false, list: [] }));
  }, [officeId]);

  const handleViewOfficeDetails = (office) => {
    // TODO
  };

  return (
    <FormContainer>
      <Title lang={lang}>{i18n("officeReceivedOrders")}</Title>

      <BreakLine />

      <TransactionsContainer>
        {orders.loading ? (
          <Loader />
        ) : !orders.list.length ? (
          <EmptyList
            imageURL="/assets/images/empty-1.svg"
            title={i18n("ordersNotFound")}
          />
        ) : (
          orders.list.map((order) => (
            <OfficeOrder
              key={order._id}
              data={order}
              onViewOfficeDetails={() =>
                handleViewOfficeDetails(order.office[0])
              }
            />
          ))
        )}
      </TransactionsContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  height: fit-content;
`;

const Title = styled.h3`
  color: #fe7777;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default AdminOfficeOrders;
