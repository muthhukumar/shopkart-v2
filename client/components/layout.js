import Navigation from "./Navigation";

export default function Layout({ disable, children }) {
  return (
    <div className="container">
      {!disable && <Navigation />}
      {children}
      <style jsx>{`
        .container {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
