import { useEffect, useRef } from "react";

export default function AadsBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Odstraníme starý obsah při re-renderu, pokud by tam zůstal
    if (adRef.current) {
      adRef.current.innerHTML = "";
    }

    const script = document.createElement("script");
    // Pozor: v A-Ads rozhraní zkopírujte URL ze src v jejich kódu
    script.src = "https://acceptable.a-ads.com/2372573"; 
    script.async = true;
    // Důležité pro některé ad-blockery a tracking
    script.setAttribute("data-aa", "2372573"); 

    adRef.current?.appendChild(script);
  }, []);

  return (
    <div className="ad-wrapper" style={{ margin: "30px 0", textAlign: "center" }}>
      <span style={{ fontSize: "10px", color: "#888", display: "block", marginBottom: "5px" }}>
        SPONZOROVANÝ OBSAH
      </span>
      <div
        ref={adRef}
        style={{
          minWidth: "120px",
          minHeight: "60px",
          display: "inline-block",
        }}
      />
    </div>
  );
}