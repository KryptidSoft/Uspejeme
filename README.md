# 🚀 Rozhodni.cz (v1.0)
**Moderní offline-first finanční asistent pro OSVČ a investory.**

Tato aplikace slouží k rychlému a bezpečnému výpočtu klíčových finančních metrik. Veškerá data zůstávají v prohlížeči uživatele, což zaručuje 100% soukromí.

## 🛠 Hlavní funkce
- **ROI & Investice:** Výpočet čisté současné hodnoty (NPV).
- **Hodinová sazba:** Kalkulace reálné ceny práce na základě nákladů a efektivity.
- **Finanční stabilita:** Diagnostika odolnosti vůči finančním šokům.
- **Vzdělávání:** Integrovaný modul pro autorské články a tipy.
- **Exporty:** Profesionální PDF reporty a CSV výstupy pro Excel.

## 🚀 Rychlý start pro vývojáře
1. **Instalace:** `npm install`
2. **Spuštění:** `npm run dev`
3. **Build (pro nasazení na web):** `npm run build`

## 🏗 Architektura
- **Frontend:** React + TypeScript + Vite
- **Styling:** CSS3 (Custom Glassmorphism design)
- **Ikony:** Lucide-React
- **Persistence:** LocalStorage (vlastní hook `usePersistentState`)

## 📋 Poznámky pro následovníky
- **Bezpečnost:** Aplikace nesmí obsahovat žádné API volání, které by odesílalo data uživatele na externí servery.
- **Rozšíření:** Nové články přidávejte přímo do pole `ARTICLES` v souboru `App.tsx`.
- **Reset:** V patičce je implementována funkce pro kompletní promazání lokálních dat.

---
*Vytvořeno jako bezpečný nástroj pro svobodné podnikání (2026).*