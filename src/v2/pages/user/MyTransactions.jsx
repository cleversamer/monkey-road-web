import { useEffect, useState } from "react";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ProfileNavigation from "v2/components/user/ProfileNavigation";
import Transaction from "v2/components/transaction";
import useLocale from "v2/hooks/useLocale";
import transactionsApi from "v2/api/user/transactions";
import Loader from "v2/components/loader";
import Pagination from "v2/components/pagination";

const pageSize = 10;

const MyTransactions = () => {
  const { i18n, lang } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState({
    list: [],
    loading: true,
    totalPages: 0,
  });

  useEffect(() => {
    transactionsApi.common
      .getMyTransactions(currentPage, pageSize)
      .then((res) => {
        const { transactions, totalPages } = res.data;
        setTransactions({ list: transactions, totalPages, loading: false });
      })
      .catch(() =>
        setTransactions({ list: [], totalPages: 0, loading: false })
      );
  }, []);

  const handleNextPage = () => {
    if (currentPage === transactions.totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleSelectPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Location
        pageTitles={[i18n("home"), i18n("arrow"), i18n("transactions")]}
      />

      <Content lang={lang}>
        <ProfileNavigation activeItem="transactions" />

        {transactions.loading ? (
          <Loader />
        ) : transactions.list.length ? (
          <TransactionsContainer lang={lang}>
            {transactions.list.map((transaction, index) => (
              <Transaction key={index} transaction={transaction} />
            ))}
          </TransactionsContainer>
        ) : (
          <EmptyAlerts>
            <EmptyAlertsImage src="/assets/images/empty-4.svg" alt="" />
            <EmptyAlertsTitle>{i18n("noTransactions")}</EmptyAlertsTitle>
            <EmptyAlertsSubtitle>{i18n("upToDate")}</EmptyAlertsSubtitle>
          </EmptyAlerts>
        )}
      </Content>

      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={transactions.totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          onSelectPage={handleSelectPage}
        />
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fff;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 30px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const EmptyAlerts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EmptyAlertsImage = styled.img`
  width: 180px;
`;

const EmptyAlertsTitle = styled.h4`
  text-transform: capitalize;
`;

const EmptyAlertsSubtitle = styled.h5`
  font-weight: 600;
`;

const TransactionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  gap: 20px;
`;

const PaginationContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export default MyTransactions;
