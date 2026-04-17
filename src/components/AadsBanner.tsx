export default function AadsBanner() {
  return (
    <div className="ad-wrapper" style={{ margin: "30px 0", textAlign: "center" }}>
      
      <span style={{ fontSize: "10px", color: "#888", display: "block", marginBottom: "5px" }}>
        SPONZOROVANÝ OBSAH
      </span>

      {/* Hlavní kontejner pro reklamu */}
      <div
        id="frame"
        style={{
          width: "100%",
          margin: "auto",
          position: "relative",
          zIndex: 99998
        }}
      >
        <iframe
          data-aa="2434799"
          src="//acceptable.a-ads.com/2434799/?size=Adaptive"
          style={{
            border: 0,
            padding: 0,
            width: "100%",
            height: "150px",
            overflow: "hidden",
            display: "block",
            margin: "auto"
          }}
          title="A-Ads"
        />
      </div>
    </div>
  );
}