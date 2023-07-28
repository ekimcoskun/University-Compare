import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout(props) {
  return (
    <div
      className="w-full"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: "1 0 auto" }}>
        <Header />
        <main style={{ flex: "1" }}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
}
