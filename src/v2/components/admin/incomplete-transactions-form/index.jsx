import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";
import Transaction from "v2/components/transaction";
import Loader from "v2/components/loader";
import transactionsApi from "v2/api/user/transactions";
import EmptyList from "v2/components/common/empty-list";

const pageSize = 10;

const IncompleteTransactionForm = ({ userId }) => {
  const { i18n, lang } = useLocale();
  const [transactions, setTransactions] = useState({ list: [], loading: true });
  const [excelFile, setExcelFile] = useState({ loading: false, url: "" });

  useEffect(() => {
    transactionsApi.admin
      .getUserTransactions(userId, 1, pageSize)
      .then((res) => {
        const { transactions, totalPages } = res.data;
        setTransactions({ list: transactions, loading: false });
      })
      .catch(() => {
        setTransactions({ list: [], loading: false });
      });
  }, [userId]);

  const handleExportToExcel = async () => {
    try {
      setExcelFile({ loading: true, url: "" });
      const res = await transactionsApi.admin.exportUserTransactionsToExcel(
        userId
      );
      setExcelFile({ loading: false, url: res.data.path });
    } catch (err) {
      console.log("err", err.response.data.message);
      setExcelFile({ loading: false, url: "" });
    }
  };

  return (
    <FormContainer>
      {!!excelFile.url && <IFrameDownload src={excelFile.url} />}

      <TitleContainer>
        <Title lang={lang}>{i18n("incompleteTransactions")}</Title>

        {excelFile.loading ? (
          <Loader />
        ) : !!transactions?.list?.length ? (
          <CustomButton
            type="primary"
            title={i18n("exportToExcel")}
            onClick={handleExportToExcel}
          />
        ) : null}
      </TitleContainer>

      <BreakLine />

      <TransactionsContainer>
        {transactions.loading ? (
          <Loader />
        ) : !transactions.list.length ? (
          <EmptyList
            imageURL="/assets/images/empty-1.svg"
            title={i18n("transactionsNotFound")}
          />
        ) : (
          transactions.list.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
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

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: fit-content;
    padding: 0 10px;
  }
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
  align-items: center;
  gap: 10px;
`;

const IFrameDownload = styled.iframe`
  display: none;
  opacity: none;
`;

export default IncompleteTransactionForm;
