import type { NextPage } from "next";
import Head from "next/head";
import MapChart from "../components/MapChart";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>TNA Timezones</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MapChart />
        </>
    );
};

export default Home;