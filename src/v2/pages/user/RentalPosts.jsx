import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Location from "v2/components/common/search-page/Location";
import ProfileNavigation from "v2/components/user/ProfileNavigation";
import PostCar from "v2/components/post-car";
import { routes } from "v2/client";
import rentApi from "v2/api/car/rent";
import Loader from "v2/components/loader";
import useLocale from "v2/hooks/useLocale";
import Pagination from "v2/components/pagination";
import FiltersSection from "v2/components/rental-post/FiltersSection";

const pageSize = 9;

const RentalPosts = () => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalPosts, setRentalPosts] = useState({
    loading: true,
    list: [],
    view: [],
    selectedStatus: "all",
    totalPages: 0,
  });

  useEffect(() => {
    rentApi.office
      .getMyRentCars(currentPage, pageSize)
      .then((res) => {
        const { rentCars, totalPages } = res.data;
        setRentalPosts({
          loading: false,
          list: rentCars,
          view: rentCars,
          selectedStatus: "all",
          totalPages,
        });
      })
      .catch((err) =>
        setRentalPosts({
          loading: false,
          list: [],
          view: [],
          selectedStatus: "all",
          totalPages: 0,
        })
      );
  }, []);

  const handleViewDetails = (carId) => {
    navigate(routes.rentCarDetails.navigate(carId));
  };

  const handleFilterItems = (title) => {
    const viewList =
      title === "all"
        ? [...rentalPosts.list]
        : title === "active"
        ? rentalPosts.list.filter((i) => i.accepted)
        : title === "pending"
        ? rentalPosts.list.filter((i) => !i.accepted)
        : rentalPosts.list.filter((i) => i.archived);

    setRentalPosts({ ...rentalPosts, selectedStatus: title, view: viewList });
  };

  const handleNextPage = () => {
    if (currentPage === rentalPosts.totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleSelectPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Location
        pageTitles={[
          i18n("home"),
          i18n("arrow"),
          i18n("profile"),
          i18n("arrow"),
          i18n("rentalPosts"),
        ]}
      />

      <Content lang={lang}>
        <ProfileNavigation activeItem="rental posts" />

        {!!rentalPosts.list.length ? (
          <PostsContainer>
            <FiltersSection
              rentalPosts={rentalPosts}
              onSelectItem={handleFilterItems}
            />

            <PostsList>
              {rentalPosts.list.map((postCar) => (
                <PostCar
                  key={postCar._id}
                  data={postCar}
                  onViewDetails={() => handleViewDetails(postCar._id)}
                />
              ))}
            </PostsList>
          </PostsContainer>
        ) : rentalPosts.loading ? (
          <Loader />
        ) : (
          <EmptyPosts>
            <EmptyPostsImage src="/assets/images/empty-3.svg" alt="" />
            <EmptyPostsTitle>{i18n("empty")}</EmptyPostsTitle>
            <EmptyPostsSubtitle>{i18n("noPosts")}</EmptyPostsSubtitle>
          </EmptyPosts>
        )}
      </Content>

      {!!rentalPosts.totalPages && (
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={rentalPosts.totalPages}
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

export default RentalPosts;
