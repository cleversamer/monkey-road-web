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
import PopupConfirm from "v2/hoc/PopupConfirm";
import PopupError from "v2/hoc/PopupError";

const pageSize = 9;

const RentalPosts = () => {
  const { i18n, lang } = useLocale();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [popupError, setPopupError] = useState({ visible: false, message: "" });
  const [popupConfirm, setPopupConfirm] = useState({
    handler: null,
    visible: false,
    title: "",
    subtitle: "",
    hint: "",
  });
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
      .catch(() =>
        setRentalPosts({
          loading: false,
          list: [],
          view: [],
          selectedStatus: "all",
          totalPages: 0,
        })
      );
  }, []);

  const handleViewDetails = (carId) =>
    navigate(routes.rentCarDetails.navigate(carId));

  const handleFilterItems = (title) => {
    const viewList =
      title === "all"
        ? [...rentalPosts.list]
        : title === "archived"
        ? rentalPosts.list.filter((i) => i.archived)
        : title === "active"
        ? rentalPosts.list.filter((i) => i.accepted && !i.archived)
        : rentalPosts.list.filter((i) => !i.accepted && !i.archived);

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

  const handleSelectPage = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeletePost = (rentCarId) => {
    if (popupConfirm.visible) return;

    const handler = async () => {
      try {
        setRentalPosts({ ...rentalPosts, loading: true });

        await rentApi.office.deleteRentCar(rentCarId);

        const newRentalPosts = rentalPosts.list.filter(
          (post) => post._id !== rentCarId
        );
        setRentalPosts({
          ...rentalPosts,
          list: newRentalPosts,
          view: newRentalPosts,
          selectedStatus: "all",
          loading: false,
        });
      } catch (err) {
        setPopupConfirm({
          handler: null,
          visible: false,
          title: "",
          subtitle: "",
          hint: "",
        });

        const error =
          err?.response?.data?.message[lang] || i18n("networkError");

        setPopupError({ visible: true, message: error });
      } finally {
        setPopupConfirm({
          handler: null,
          visible: false,
          title: "",
          subtitle: "",
          hint: "",
        });
      }
    };

    setPopupConfirm({
      handler,
      visible: true,
      title: i18n("deletePostTitle"),
      subtitle: i18n("deletePostSubtitle"),
      hint: i18n("deletePostHint"),
    });
  };

  const handleArchivePost = (rentCarId) => {
    if (popupConfirm.visible) return;

    const handler = async () => {
      try {
        setRentalPosts({ ...rentalPosts, loading: true });

        await rentApi.office.archiveRentCar(rentCarId);

        const index = rentalPosts.list.findIndex((p) => p._id === rentCarId);
        const newRentalPosts = [...rentalPosts.list];
        newRentalPosts[index].archived = true;

        setRentalPosts({
          ...rentalPosts,
          list: newRentalPosts,
          view: newRentalPosts,
          selectedStatus: "all",
          loading: false,
        });
      } catch (err) {
        setPopupConfirm({
          handler: null,
          visible: false,
          title: "",
          subtitle: "",
          hint: "",
        });

        const error =
          err?.response?.data?.message[lang] || i18n("networkError");

        setPopupError({ visible: true, message: error });
      } finally {
        setPopupConfirm({
          handler: null,
          visible: false,
          title: "",
          subtitle: "",
          hint: "",
        });
      }
    };

    setPopupConfirm({
      handler,
      visible: true,
      title: i18n("archivePostTitle"),
      subtitle: i18n("archivePostSubtitle"),
      hint: i18n("archivePostHint"),
    });
  };

  const handleRestorePost = (rentCarId) => {
    if (popupConfirm.visible) return;

    const handler = async () => {
      try {
        setRentalPosts({ ...rentalPosts, loading: true });

        await rentApi.office.restoreRentCar(rentCarId);

        const index = rentalPosts.list.findIndex((p) => p._id === rentCarId);
        const newRentalPosts = [...rentalPosts.list];
        newRentalPosts[index].archived = false;

        setRentalPosts({
          ...rentalPosts,
          list: newRentalPosts,
          view: newRentalPosts,
          selectedStatus: "all",
          loading: false,
        });
      } catch (err) {
        setPopupConfirm({
          handler: null,
          visible: false,
          title: "",
          subtitle: "",
          hint: "",
        });

        const error =
          err?.response?.data?.message[lang] || i18n("networkError");

        setPopupError({ visible: true, message: error });
      } finally {
        setPopupConfirm({
          handler: null,
          visible: false,
          title: "",
          subtitle: "",
          hint: "",
        });
      }
    };

    setPopupConfirm({
      handler,
      visible: true,
      title: i18n("restorePostTitle"),
      subtitle: i18n("restorePostSubtitle"),
      hint: i18n("restorePostHint"),
    });
  };

  return (
    <>
      {popupConfirm.visible && (
        <PopupConfirm
          title={popupConfirm.title}
          subtitle={popupConfirm.subtitle}
          hint={popupConfirm.hint}
          onConfirm={popupConfirm.handler}
          onHide={() => setPopupConfirm({ ...popupConfirm, visible: false })}
        />
      )}

      {popupError.visible && (
        <PopupError
          message={popupError.message}
          onHide={() => setPopupError({ visible: false, message: "" })}
        />
      )}

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
                {rentalPosts.view.map((postCar) => (
                  <PostCar
                    key={postCar._id}
                    data={postCar}
                    onViewDetails={() => handleViewDetails(postCar._id)}
                    onDelete={() => handleDeletePost(postCar._id)}
                    onArchive={() => handleArchivePost(postCar._id)}
                    onRestore={() => handleRestorePost(postCar._id)}
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
    </>
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
