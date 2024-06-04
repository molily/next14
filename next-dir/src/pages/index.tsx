import Head from "next/head";

// Works
// import svg1 from "../10.svg?url";
// import svg2 from "../../../components/10.svg?url";
// import svgWithAlias from "@components/10.svg?url";

import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [svg, setSvg] = useState(undefined);

  const fetchData = useCallback(async () => {
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
    // const svgExports = await import(
    //   `../../../components/${Math.sqrt(100)}.svg?url`
    // );
    // console.log("svgExports", svgExports.default);

    // Works:
    // const svgExports = await import(`@components/${Math.sqrt(100)}.svg?url`);
    // console.log("svgExports", svgExports.default);

    // Does not work:
    const pathWithAlias = `@components/${Math.sqrt(100)}.svg?url`;
    const svgExports = await import(pathWithAlias);
    console.log("svgExports", svgExports.default);

    setSvg(svgExports.default);
  }, []);

  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, []);

  console.log("svg", svg);

  return (
    <>
      <Head>
        <title>Next 14 test</title>
      </Head>
      <main>
        <p>svg: {svg}</p>
        {/* <img src={svg} /> */}
      </main>
    </>
  );
}
