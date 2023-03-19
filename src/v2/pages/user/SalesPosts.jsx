import { useState, useEffect } from "react";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ProfileNavigation from "v2/components/user/ProfileNavigation";
import purchaseApi from "v2/api/car/purchase";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";
import Pagination from "v2/components/pagination";
import FiltersSection from "v2/components/sales-post/FiltersSection";
import SalesPost from "v2/components/sales-post";

const pageSize = 9;

const SalesPosts = () => {
  const { i18n, lang } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPosts, setSalesPosts] = useState({
    loading: true,
    list: [],
    view: [],
    selectedStatus: "all",
    totalPages: 0,
  });

  useEffect(() => {
    purchaseApi.common
      .getMyPurchaseCars(currentPage, pageSize)
      .then((res) => {
        const { purchaseCars, totalPages } = res.data;
        setSalesPosts({
          loading: false,
          list: purchaseCars,
          view: purchaseCars,
          selectedStatus: "all",
          totalPages,
        });
      })
      .catch(() => {
        setSalesPosts({
          loading: false,
          list: [],
          view: [],
          totalPages: 0,
          selectedStatus: "all",
        });
      });
  }, [currentPage]);

  const handleFilterItems = (title) => {
    const viewList =
      title === "all"
        ? [...salesPosts.list]
        : title === "unpaid"
        ? salesPosts.list.filter((i) => !i.paid)
        : title === "sold"
        ? salesPosts.list.filter((i) => i.sold)
        : salesPosts.list.filter((i) => !i.sold);

    setSalesPosts({ ...salesPosts, selectedStatus: title, view: viewList });
  };

  const handleMarkCarAsSold = (carId) => {
    purchaseApi.common
      .markPurchaseCarAsSold(carId)
      .then(() => {
        const newSalesPosts = [...salesPosts.list];
        const carIndex = newSalesPosts.findIndex((i) => i._id === carId);
        newSalesPosts[carIndex].sold = true;
        setSalesPosts({
          ...salesPosts,
          list: newSalesPosts,
          view: newSalesPosts,
          selectedStatus: "all",
        });
        setCurrentPage(1);
      })
      .catch(() => {});
  };

  const handleNextPage = () => {
    if (currentPage === salesPosts.totalPages) return;
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
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("profile"),
          i18n("arrow"),
          i18n("salesPosts"),
        ]}
      />

      <Content lang={lang}>
        <ProfileNavigation activeItem="sales posts" />

        {!!salesPosts.list.length ? (
          <PostsContainer>
            <FiltersSection
              salesPosts={salesPosts}
              onSelectItem={handleFilterItems}
            />

            <PostsList>
              {salesPosts.view.map((postCar) => (
                <SalesPost
                  key={postCar._id}
                  data={postCar}
                  onMarkCarAsSold={() => handleMarkCarAsSold(postCar._id)}
                />
              ))}
            </PostsList>
          </PostsContainer>
        ) : salesPosts.loading ? (
          <Loader />
        ) : (
          <EmptyPosts>
            <EmptyPostsImage src="/assets/images/empty-3.svg" alt="" />
            <EmptyPostsTitle>{i18n("empty")}</EmptyPostsTitle>
            <EmptyPostsSubtitle>{i18n("noPosts")}</EmptyPostsSubtitle>
          </EmptyPosts>
        )}
      </Content>

      {!!salesPosts.totalPages && (
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={salesPosts.totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            onSelectPage={handleSelectPage}
          />
        </PaginationContainer>
      )}
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

const EmptyPosts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EmptyPostsImage = styled.img`
  width: 180px;
`;

const EmptyPostsTitle = styled.h4`
  text-transform: capitalize;
`;

const EmptyPostsSubtitle = styled.h5`
  font-weight: 600;
`;

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostsList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-content: center;
  grid-gap: 20px;

  > * {
    margin: 0 auto;
  }
`;

const PaginationContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export default SalesPosts;
