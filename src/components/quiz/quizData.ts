export type QuizAnswer = {
  label: string;
  weights: Record<string, number>;
};

export type QuizQuestion = {
  question: string;
  answers: QuizAnswer[];
};

export type ActionPlan = {
  today: string;
  tomorrow: string;
  week: string;
};

export type QuizResult = {
  type: string;
  description: string;
  tips: string[];
  actionPlan: ActionPlan;
  cta: { label: string; link: string };
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Jak se připravuješ na pracovní týden?",
    answers: [
      { label: "Mám detailní plán a postupně ho plním", weights: { strategic: 3, minimalist: 1 } },
      { label: "Pracuji podle nálady a aktuálních možností", weights: { chaotic: 3 } },
      { label: "Odkládám start, dokud mě k akci nedonutí tlak", weights: { procrastinator: 3, night_owl: 1 } },
    ],
  },
  {
    question: "Jak zvládáš práci s termíny (deadliny)?",
    answers: [
      { label: "Dodržuji je přesně a systematicky s rezervou", weights: { strategic: 3, perfectionist: 1 } },
      { label: "Dělám jen to, co aktuálně cítím jako kritické", weights: { chaotic: 2, minimalist: 1 } },
      { label: "Často odkládám a pak makám v noci před termínem", weights: { procrastinator: 3, night_owl: 2 } },
    ],
  },
  {
    question: "Kdy podáváš svůj nejlepší pracovní výkon?",
    answers: [
      { label: "Ráno a dopoledne, dokud mám čistou hlavu", weights: { strategic: 2, workaholic: 1 } },
      { label: "Pozdě večer nebo v noci, když mě nikdo neruší", weights: { night_owl: 3, procrastinator: 1 } },
      { label: "V nárazech – když mě chytne flow, neznám čas", weights: { workaholic: 3, chaotic: 1 } },
    ],
  },
  {
    question: "Co tě podle tebe nejvíce brzdí ve vyšším výdělku?",
    answers: [
      { label: "Chaos v prioritách a chybějící systém", weights: { chaotic: 3 } },
      { label: "Přílišné zkoumání detailů na úkor rychlosti", weights: { perfectionist: 3, strategic: 1 } },
      { label: "Čas strávený prokrastinací a odkládáním úkolů", weights: { procrastinator: 3 } },
    ],
  },
  {
    question: "Jak vypadá tvůj ideální pracovní den?",
    answers: [
      { label: "Maximálně 4 hodiny hluboké, efektivní práce", weights: { minimalist: 3, strategic: 1 } },
      { label: "Celý den v plném nasazení a řešení výzev", weights: { workaholic: 3, strategic: 1 } },
      { label: "Flexibilní čas, kde improvizace hraje hlavní roli", weights: { chaotic: 3, night_owl: 1 } },
    ],
  },
];

export const quizResults: Record<string, QuizResult> = {
  chaotic: {
    type: "Chaotický dříč",
    description: "Máš neuvěřitelné množství energie, ale tvůj největší nepřítel je chybějící struktura, která ti odčerpává zisk.",
    tips: ["Zaveď si fixní čas na administrativu.", "Používej vizuální checklisty.", "Rozděl velké úkoly na malé kroky."],
    actionPlan: {
      today: "Ukliď si plochu počítače a zavři 10 nepotřebných karet v prohlížeči.",
      tomorrow: "Napiš si 3 nejdůležitější úkoly hned ráno na papír.",
      week: "Vyzkoušej jeden digitální nástroj na správu úkolů (např. Trello)."
    },
    cta: { label: "Spočítej si hodinovou sazbu", link: "/strategie/hodinovka" },
  },
  strategic: {
    type: "Strategický hráč",
    description: "Plánuješ dopředu a znáš svá čísla. Pozor ale, abys neuvízl v 'analýze paralýze'.",
    tips: ["Metoda 80% hotovo je dost dobré.", "Pravidelně vyhodnocuj ROI.", "Vytvářej rutiny."],
    actionPlan: {
      today: "Vyber jeden rozpracovaný úkol a dokonči ho bez dalšího ladění.",
      tomorrow: "Deleguj nebo zruš jednu aktivitu, která ti nepřináší peníze.",
      week: "Naplánuj si strategickou hodinu bez e-mailu a telefonu."
    },
    cta: { label: "Prověř svou ziskovost", link: "/investice/roi" },
  },
  procrastinator: {
    type: "Prokrastinační ninja",
    description: "Zvládneš týdenní práci za noc, ale tento tlak je dlouhodobě neudržitelný.",
    tips: ["Časové bloky pro úkoly.", "Odměňuj se za dokončené milníky.", "Technika Pomodoro."],
    actionPlan: {
      today: "Nastav si časovač na 25 minut a pracuj jen na jedné věci.",
      tomorrow: "Nejtěžší úkol dne udělej jako první věc po probuzení.",
      week: "Zablokuj si v kalendáři 'nedotknutelný čas' pro hlubokou práci."
    },
    cta: { label: "Hlídej si termíny v kalendáři", link: "/kalendar" },
  },
  night_owl: {
    type: "Noční makáč",
    description: "V noci jsi kreativnější, ale tvůj biorytmus může kolidovat s požadavky okolí.",
    tips: ["Hranice pro komunikaci přes den.", "Práce na vrcholu energie.", "Spánková hygiena."],
    actionPlan: {
      today: "Nastav si na mobilu režim 'Nerušit' od 22:00.",
      tomorrow: "Důležité maily klientům naplánuj k odeslání na 8:00 ráno.",
      week: "Zkus jeden den začít pracovat o hodinu dříve než obvykle."
    },
    cta: { label: "Zkontroluj své rezervy", link: "/audit/rezerva" },
  },
  perfectionist: {
    type: "Perfekcionista",
    description: "Tvá práce je top, ale ladění detailů tě stojí čas, který ti nikdo nezaplatí.",
    tips: ["Definuj si 'hotovo'.", "Omez čas nad detaily.", "Soustřeď se na funkčnost."],
    actionPlan: {
      today: "Odevzdej úkol, na kterém pracuješ, hned teď.",
      tomorrow: "U nového úkolu si stopni čas a po 60 minutách přestaň.",
      week: "Sleduj, kolik času trávíš opravami, které klient nevyžadoval."
    },
    cta: { label: "Otestuj svou stabilitu", link: "/audit/rizika" },
  },
  minimalist: {
    type: "Efektivní minimalista",
    description: "Mistr v osekávání nepodstatného. Tvůj čas je pro tebe nejcennější komoditou.",
    tips: ["Reviduj služby s nízkou marží.", "Automatizuj opakované úsilí.", "Investuj ušetřený čas."],
    actionPlan: {
      today: "Najdi jeden automatizovatelný proces ve svém podnikání.",
      tomorrow: "Řekni 'ne' jedné schůzce, která nemá jasný program.",
      week: "Zvyš cenu své nejžádanější služby o 10 %."
    },
    cta: { label: "Plánuj svou prosperitu", link: "/planovac" },
  },
  workaholic: {
    type: "Přepálený workoholik",
    description: "Motor firmy, ale tvoje svíčka hoří z obou stran. Hrozí ti vyhoření.",
    tips: ["Pevný konec pracovní doby.", "Deleguj úkoly.", "Odpočívej bez pocitu viny."],
    actionPlan: {
      today: "Dnes vypni počítač přesně v 18:00 a jdi na procházku.",
      tomorrow: "Smaž si pracovní e-mail z telefonu pro zbytek dne.",
      week: "Naplánuj si jeden celý den v týdnu bez jediné pracovní myšlenky."
    },
    cta: { label: "Zkus kalkulačku vyhoření", link: "/audit/stabilita" },
  },
};