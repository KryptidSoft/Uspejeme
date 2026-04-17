export default function AadsBanner() {
  return (
    <div
      style={{
        width: "100%",
        margin: "40px auto",
        position: "relative",
        zIndex: 99998,
        textAlign: "center",
        padding: "0 12px",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          color: "#888",
          display: "block",
          marginBottom: "6px",
        }}
      >
        SPONZOROVANÝ OBSAH
      </span>

      <iframe
        data-aa="2434824"
        src="//acceptable.a-ads.com/2434824/?size=Adaptive&background_color=0b1f3a"
        style={{
          border: "0",
          padding: "0",
          width: "70%",
          minHeight: "100px",   // důležité pro mobil + bot
          display: "block",
          margin: "0 auto",
        }}
        title="A-Ads"
      />
    </div>
  );
}