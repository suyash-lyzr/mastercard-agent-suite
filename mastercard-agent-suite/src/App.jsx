import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "./components/Nav.jsx";
import { Footer } from "./components/Footer.jsx";
import { Marketplace } from "./pages/Marketplace.jsx";
import { AgentDetail } from "./pages/AgentDetail.jsx";
import { Deployed } from "./pages/Deployed.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <main className="app">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/deployed" element={<Deployed />} />
          <Route
            path="*"
            element={
              <div
                className="container"
                style={{ padding: "80px 0", textAlign: "center" }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 48,
                  }}
                >
                  Page not found
                </h1>
                <p style={{ marginTop: 12 }}>
                  Head back to the{" "}
                  <a href="/" style={{ color: "var(--mc-yellow)" }}>
                    marketplace
                  </a>
                  .
                </p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
