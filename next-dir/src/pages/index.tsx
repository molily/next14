import Head from "next/head";

// Works
// import svg1 from "../10.svg?url";
// import svg2 from "../../../components/10.svg?url";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [svg, setSvg] = useState(undefined);

  const fetchData = useCallback(
    async () => {
    console.log("fetchData");

    // Works:
    // const svgExports = await import("../10.svg?url");

    // Works:
    // const svgExports = await import("../../../components/10.svg?url");

    // Works:
    // const file = '10.svg'
    // const svgExports = await import(`../${file}?url`);

    // Works:
    // const file = "10.svg";
    // const svgExports = await import(`../../../components/${file}?url`);

    // Works:
    const file = Math.sqrt(100) + '.svg';
    const svgExports = await import(`../../../components/${file}?url`);

    console.log("svgExports", svgExports.default);

    setSvg(svgExports.default);
  }, []);

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  console.log("svg", svg);

  return (
    <>
      <Head>
        <title>Hello</title>
      </Head>
      <main>
        <p>svg: {svg}</p>
        <img src={svg} />
      </main>
    </>
  );
}
