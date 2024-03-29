import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";
import { GiSandsOfTime } from "react-icons/gi";
import useDateTimer from "v2/hooks/useDateTimer";

const Transaction = ({ transaction }) => {
  const { i18n, lang } = useLocale();
  const { value: time } = useDateTimer(transaction?.date);

  return (
    <Container lang={lang}>
      <TransactionImage
        src={transaction.photoURL || "/assets/images/alert.svg"}
        alt="trasaction photo"
      />

      <Content lang={lang}>
        <TransactionTitle>{transaction.title[lang]}</TransactionTitle>

        <TransactionBody>
          <OfficeName>{transaction.receiver[0].name}</OfficeName>

          <TransactionDate>
            {lang === "ar" && i18n("ago")} {time} {lang === "en" && i18n("ago")}
          </TransactionDate>
        </TransactionBody>

        <TransactionInfo>
          <TransactionPrice>
            {transaction.amount.toLocaleString()} AED
          </TransactionPrice>

          <TransactionStatus status={transaction.status} lang={lang}>
            <GiSandsOfTime />

            <TransactionStatusTitle>
              {transaction.status === "complete"
                ? i18n("transactionComplete")
                : i18n("transactionIncomplete")}
            </TransactionStatusTitle>
          </TransactionStatus>
        </TransactionInfo>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  gap: 15px;
`;

const TransactionImage = styled.img`
  width: 100px;
  object-fit: contain;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
  gap: 12px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const TransactionTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  width: calc(100% - 10px);
  color: #000;
`;

const TransactionBody = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const OfficeName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const TransactionDate = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TransactionPrice = styled.div`
  color: #fff;
  padding: 3px 7px;
  border-radius: 6px;
  background-color: #fe7777;
  font-size: 14px;
  font-weight: 600;
`;

const TransactionStatus = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 7px;
  text-transform: capitalize;
  color: #fff;
  padding: 3px 7px;
  border-radius: 6px;
  background-color: ${({ status }) =>
    status === "complete" ? "#1A8331" : "#FFA500"};

  svg {
    fill: #fff;
  }
`;

const TransactionStatusTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export default Transaction;
