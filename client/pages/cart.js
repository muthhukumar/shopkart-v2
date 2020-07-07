import Head from "next/head";
import Layout from "../components/Layout";

export default function () {
  return (
    <Layout disable={false}>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="????">cart</div>
      </main>
    </Layout>
  );
}
