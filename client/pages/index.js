import { useState } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkAutoLogin } from "../redux/userStore/thunkActionCreators";

import Layout from "../components/Layout";
import ProductCard from "../components/productCard";
import { withRedux } from "../redux/redux";

function Home() {
  const [data, setData] = useState(null);

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    async function getData() {
      let response, jsonData;
      try {
        response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_API + "/products"
        );
        jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.log(err);
      }
    }
    if (!data) getData();
  }, []);

  return (
    <Layout disable={false}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Products</h1>
        <div className="product-card">
          {data &&
            data.products.map((product) => (
              <ProductCard
                key={product._id}
                title={product.productName}
                isInCart={false}
                isInFav={false}
                price={product.productPrice}
                imageUrl={product.productUrl}
              />
            ))}
        </div>
      </main>
      <style jsx>
        {`
          main {
            padding-top: 5rem;
            display: grid;
            grid-template-areas:
              "title"
              "content";
          }
          .title {
            width: 100%;
            font-size: 3rem;
            font-weight: bolder;
            letter-spacing: 3px;
            grid-area: title;
            text-align: center;
          }
          .product-card {
            grid-area: content;
            grid-template-columns: repeat(auto-fit, 19rem);
            justify-content: center;
            display: grid;
            grid-auto-columns: repeat(19rem, auto);
          }
        `}
      </style>
    </Layout>
  );
}

Home.getInitialProps = ({ reduxStore }) => {
  const { dispatch } = reduxStore;
  console.log("came here yes");
  dispatch(thunkAutoLogin());
  return {};
};

export default withRedux(Home);
