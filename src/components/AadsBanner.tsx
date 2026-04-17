export default function AadsBanner() {
  return (
    <div style={{
      margin: "40px 0",
      padding: "0 12px", // lepší okraje na mobilu
      textAlign: "center"
    }}>
      <span style={{
        fontSize: "10px",
        color: "#888",
        display: "block",
        marginBottom: "6px"
      }}>
        SPONZOROVANÝ OBSAH
      </span>

      <div style={{
        width: "100%",
        maxWidth: "728px",
        margin: "0 auto"
      }}>
        <iframe
          data-aa="2434799"
          src="//acceptable.a-ads.com/2434799/?size=Adaptive"
          style={{
            border: "0",
            width: "100%",
            minHeight: "90px",   // mobil minimum
            maxHeight: "250px",  // ochrana proti přerostlé reklamě
            display: "block"
          }}
          loading="lazy"
          title="A-Ads"
        />
      </div>
    </div>
  );
}