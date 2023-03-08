import { useEffect, useState } from "react";
import styled from "styled-components";
import ContentWrapper from "v2/hoc/ContentWrapper";
import Brand from "./Brand";
import Loader from "v2/components/loader";
import brandsApi from "v2/api/car/brands";
import useLocale from "v2/hooks/useLocale";
import EmptyList from "v2/components/common/empty-list";

const PopularBrands = () => {
  const { i18n } = useLocale();
  const [context, setContext] = useState({
    brands: [],
    loading: true,
  });

  useEffect(() => {
    brandsApi.common
      .getPopularBrands(1, 8)
      .then((res) => setContext({ brands: res.data.brands, loading: false }))
      .catch(() => setContext({ brands: [], loading: false }));
  }, []);

  return (
    <Container>
      <Title>{i18n("popularBrands")}</Title>

      <Content>
        {context.loading ? (
          <Loader />
        ) : context.brands.length ? (
          context.brands.map((brand) => (
            <Brand
              key={brand._id}
              title={brand.name}
              imageURL={brand.photoURL}
            />
          ))
        ) : (
          <EmptyList
            imageURL="/assets/images/empty-1.svg"
            title={i18n("noBrands")}
          />
        )}
      </Content>
    </Container>
  );
};

const Container = styled.section`
  padding: 0 40px;
  padding-bottom: 100px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Content = styled(ContentWrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 20px;
  place-content: center;
  justify-items: center;
`;

export default PopularBrands;
