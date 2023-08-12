import Header from "./header/header";
import Footer from "./footer/footer";
import { useEffect } from "react";

export default function Layout(props) {
  return (
    <div
      className="w-full"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: "1 0 auto" }}>
        <Header user={props.user} />
        <main style={{ flex: "1" }}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
}
