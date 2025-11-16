import { Html, Head, Main, NextScript } from "next/document";

export default function Document(){
    return(
    <Html lang="ko">
      <Head>
        <meta property="og:title" content="글다" />
        <meta
          property="og:description"
          content="만화 같은 부천 여행 10개 명소를 탐험하고 엽서를 모아보세요!"
        />
        <meta
          property="og:image"
          content="https://www.geulda.kr/geulda.png"
        />
        <meta property="og:url" content="https://www.geulda.kr" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
);
}