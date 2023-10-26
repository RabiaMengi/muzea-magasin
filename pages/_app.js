import { PanierContextFournisseur } from "@/components/PanierContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
  body{
    padding:0;
    margin:0;
    font-family: 'Noto Serif', serif;
    background-color: #dbd9c9;
  }
`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <PanierContextFournisseur>
          <Component {...pageProps} />
        </PanierContextFournisseur>
      </SessionProvider>
    </>
  );
}
