import type { Lang } from "../lib/site";

/** Shared chrome: navigation, footer, calls to action, demo labels. */
export const UI = {
  en: {
    nav: { features: "Features", how: "How it works", screens: "Screens", faq: "FAQ", demo: "Demo", open: "Open the app", openShort: "Open app", menu: "Menu" },
    langSwitch: "Polski",
    langSwitchLabel: "Ta strona po polsku",
    cta: { start: "Start for free", demo: "See it in action", tryDemo: "Try the live demo", note: "Sign in with Google. No card, no trial, no ads." },
    footer: {
      tagline: "A free, non-profit portfolio tracker for XTB accounts.",
      product: "Product",
      guides: "Guides",
      project: "Project",
      app: "Open the app",
      privacy: "Privacy and data",
      source: "Landing page source",
      disclaimer:
        "portfoliomanager is an independent, non-profit project and is not affiliated with XTB S.A. XTB and xStation are trademarks of their owners. Figures shown on this site come from a demo portfolio with simulated prices. Nothing here is investment or tax advice.",
    },
    demo: {
      label: "Demo portfolio",
      window: "portfolio.starpedia.pl",
      tabs: {
        dashboard: ["Dashboard", "The whole portfolio at a glance"],
        import: ["XTB import", "From .xlsx to a portfolio"],
        benchmark: ["Benchmarks", "Your return vs the market"],
        dividends: ["Dividends", "Every payout, net of tax"],
        alerts: ["Alerts", "A message when it matters"],
      },
      value: "Portfolio value",
      today: "today",
      total: "Total result",
      live: "live",
      invested: "Net deposits",
      unrealized: "Unrealised gain",
      divs12: "Dividends, 12 months",
      xirr: "Annual return (XIRR)",
      movers: "Today's movers",
      dropTitle: "Drop your XTB .xlsx files here",
      dropNote: "Parsed in your browser. Re-importing the same period adds nothing twice.",
      parsed: "Parsed",
      ops: "cash operations",
      closed: "closed",
      open: "open positions",
      preview: "Cash operations",
      colTime: "Time",
      colType: "Type",
      colSymbol: "Symbol",
      colAmount: "Amount",
      benchTitle: "Cumulative return since January 2023",
      benchNote: "Time-weighted, indices converted to PLN",
      portfolio: "Your portfolio",
      divTitle: "Net dividends by month",
      divTtm: "Last 12 months",
      divTotal: "All time",
      topPayers: "Top payers",
      channel: "#investing",
      botName: "portfoliomanager",
      typing: "portfoliomanager is typing",
    },
  },
  pl: {
    nav: { features: "Funkcje", how: "Jak to działa", screens: "Ekrany", faq: "FAQ", demo: "Demo", open: "Otwórz aplikację", openShort: "Aplikacja", menu: "Menu" },
    langSwitch: "English",
    langSwitchLabel: "This page in English",
    cta: { start: "Zacznij za darmo", demo: "Zobacz, jak działa", tryDemo: "Wypróbuj demo", note: "Logowanie przez Google. Bez karty, bez okresu próbnego, bez reklam." },
    footer: {
      tagline: "Darmowy tracker portfela dla kont w XTB, prowadzony non-profit.",
      product: "Produkt",
      guides: "Poradniki",
      project: "Projekt",
      app: "Otwórz aplikację",
      privacy: "Prywatność i dane",
      source: "Kod tej strony",
      disclaimer:
        "portfoliomanager to niezależny projekt non-profit, niepowiązany z XTB S.A. XTB i xStation są znakami towarowymi ich właścicieli. Liczby na tej stronie pochodzą z portfela demonstracyjnego z symulowanymi notowaniami. Nic tutaj nie jest rekomendacją inwestycyjną ani poradą podatkową.",
    },
    demo: {
      label: "Portfel demo",
      window: "portfolio.starpedia.pl",
      tabs: {
        dashboard: ["Przegląd", "Cały portfel w jednym widoku"],
        import: ["Import z XTB", "Od pliku .xlsx do portfela"],
        benchmark: ["Na tle indeksów", "Twój wynik kontra rynek"],
        dividends: ["Dywidendy", "Każda wypłata, po podatku"],
        alerts: ["Alerty", "Wiadomość, gdy coś się dzieje"],
      },
      value: "Wartość portfela",
      today: "dziś",
      total: "Wynik całkowity",
      live: "na żywo",
      invested: "Wpłacono netto",
      unrealized: "Zysk niezrealizowany",
      divs12: "Dywidendy, 12 mies.",
      xirr: "Roczna stopa (XIRR)",
      movers: "Dzisiejsze zmiany",
      dropTitle: "Upuść tutaj pliki .xlsx z XTB",
      dropNote: "Pliki czytamy w przeglądarce. Ponowny import tego samego okresu nie tworzy duplikatów.",
      parsed: "Wczytano",
      ops: "operacji gotówkowych",
      closed: "zamkniętych",
      open: "otwartych pozycji",
      preview: "Operacje gotówkowe",
      colTime: "Czas",
      colType: "Typ",
      colSymbol: "Symbol",
      colAmount: "Kwota",
      benchTitle: "Skumulowany zwrot od stycznia 2023",
      benchNote: "Stopa ważona czasem, indeksy przeliczone na PLN",
      portfolio: "Twój portfel",
      divTitle: "Dywidendy netto w miesiącach",
      divTtm: "Ostatnie 12 miesięcy",
      divTotal: "Od początku",
      topPayers: "Najwięcej wypłacili",
      channel: "#inwestycje",
      botName: "portfoliomanager",
      typing: "portfoliomanager pisze",
    },
  },
} satisfies Record<Lang, unknown>;

export interface Faq {
  q: string;
  a: string;
}

/** Home page copy. */
export const HOME = {
  en: {
    title: "Free XTB Portfolio Tracker with Dividends and PIT-38 | portfoliomanager",
    description:
      "Free, non-profit portfolio tracker for XTB. Import xStation .xlsx exports and get live valuation, dividends, a PIT-38 estimate and a comparison with the S&P 500.",
    eyebrow: "Free and non-profit, made for XTB accounts",
    h1: "Free XTB portfolio tracker",
    h1Sub: "that reads your exports",
    lead:
      "Export your account history from xStation, drop the .xlsx files in, and see what the portfolio is worth today, how it did against the S&P 500, what it paid in dividends and roughly how much PIT-38 tax you owe.",
    sources: ["Quotes from Yahoo Finance and Stooq", "Exchange rates from NBP", "Import from XTB xStation (.xlsx)", "IKE and IKZE supported", "PLN, USD and EUR views"],
    how: {
      eyebrow: "How it works",
      h2: "From an XTB export to a full dashboard in about a minute",
      steps: [
        {
          t: "Export from xStation",
          d: "Open the account history in xStation or the XTB app and export the report to XLSX. One file per account: PLN, USD, EUR, IKE or IKZE.",
        },
        {
          t: "Drop the files in",
          d: "The files are parsed in your browser. Importing an overlapping period is safe: every operation is matched by its XTB ID, so nothing is counted twice.",
        },
        {
          t: "Read the numbers",
          d: "Positions are valued at current prices, foreign holdings are converted at NBP rates, and every chart follows the accounts and currency you pick.",
        },
      ],
    },
    features: {
      eyebrow: "Features",
      h2: "What an XTB investor checks every week, without the spreadsheet",
      lead: "One login, all your XTB accounts, and the figures your broker's app does not show in one place.",
      items: [
        { k: "live", t: "Live valuation", d: "Quotes for shares and ETFs from Warsaw, New York, Frankfurt and London, with today's change for every position." },
        { k: "returns", t: "Returns you can compare", d: "Time-weighted return (TWR) to compare with indices, and XIRR for what your money actually earned." },
        { k: "bench", t: "S&P 500 and Nasdaq-100", d: "Indices converted to your currency, plus a simulation: what if every deposit had gone into the index instead?" },
        { k: "div", t: "Dividends", d: "Gross, withholding tax and net for every payout, by month and by year, with a trailing 12-month yield." },
        { k: "tax", t: "PIT-38 estimate", d: "Capital gains and foreign dividends converted at the NBP rate from the business day before each transaction." },
        { k: "ike", t: "IKE and IKZE", d: "Tax-sheltered accounts sit next to the others in every chart and stay out of the tax estimate." },
        { k: "alerts", t: "Slack and Discord alerts", d: "Rules for daily moves, price levels and portfolio value, checked every weekday after the US close." },
        { k: "public", t: "Public portfolio page", d: "Share a read-only summary under your own address, with percentages only if you prefer." },
        { k: "deposits", t: "Deposit statistics", d: "Your average monthly contribution, the typical and the largest deposit, and how regularly you add money, by year and by account." },
      ],
    },
    bench: {
      eyebrow: "Benchmarks",
      h2: "Are you actually beating the market?",
      lead:
        "A good year can hide a weak strategy. portfoliomanager puts your time-weighted return next to the S&P 500 and the Nasdaq-100, converted to your base currency, so deposits and withdrawals do not distort the picture.",
      points: [
        "Time-weighted return for a fair comparison with indices",
        "Indices converted at NBP rates to PLN, USD or EUR",
        "Simulation of the same deposits invested in the index",
      ],
      more: "Read more about benchmarking",
      ranges: { y1: "1Y", y3: "3Y", all: "All" },
    },
    screens: {
      eyebrow: "Real screens",
      h2: "The actual app, running on the demo portfolio",
      lead: "No mock-ups. These are screenshots of portfoliomanager with a demo XTB portfolio of three accounts (PLN, USD and IKE) and simulated prices. The same portfolio runs in the live demo.",
      tabs: [
        { k: "overview", t: "Overview", alt: "portfoliomanager overview: portfolio value, KPI tiles, value chart and comparison with indices" },
        { k: "performance", t: "Performance", alt: "Performance tab with a monthly returns heatmap and yearly results" },
        { k: "holdings", t: "Holdings", alt: "Holdings table with quantity, average price, value and gain per position" },
        { k: "dividends", t: "Dividends", alt: "Dividends tab with net payouts per month and a payout history" },
        { k: "deposits", t: "Deposits", alt: "Deposits tab with the average monthly contribution, the largest deposit and deposits per month" },
        { k: "taxes", t: "Taxes", alt: "PIT-38 estimate with revenue, costs, income and tax per year" },
        { k: "alerts", t: "Alerts", alt: "Alerts tab with Discord and Slack webhooks and alert rules" },
      ],
      themesTitle: "Pick a look",
      themes: ["Indigo, dark", "Indigo, light", "Amber, light", "Amber, dark"],
      phoneTitle: "Made for the phone too",
      phoneText: "A floating tab bar keeps the main sections one tap away. Charts and tables adapt to a narrow screen instead of shrinking.",
      phoneAlt: "portfoliomanager on a phone: portfolio value, sparkline and KPI tiles",
    },
    tax: {
      eyebrow: "PIT-38",
      h2: "A PIT-38 estimate built from your own XTB history",
      lead:
        "Every sale from the Closed Positions sheet comes with its purchase cost. Both sides are converted at the NBP rate from the business day before the transaction, the way the tax office expects. Foreign dividends get the 19% calculation with credit for tax withheld abroad.",
      year: "Tax year 2025, demo portfolio",
      rows: { revenue: "Revenue", cost: "Costs", income: "Income", tax: "Tax at 19%", div: "Foreign dividends, tax to pay" },
      note: "An estimate to check against the PIT-8C from your broker. Not tax advice.",
      more: "How the PIT-38 estimate works",
    },
    alerts: {
      eyebrow: "Alerts",
      h2: "Alerts in the channel you already read",
      lead:
        "Add a Slack or Discord webhook, set a rule and get a short message after the session closes: a daily move of the whole portfolio, a price level on a single stock, or the portfolio value crossing a threshold. Each alert is sent once per trading day, even if the job runs twice.",
      points: ["Daily move of a position or of the whole portfolio", "Price level of a single instrument", "Portfolio value above or below a threshold", "One-off or recurring rules"],
      note: "Messages are written in Polish, like the app.",
    },
    public: {
      eyebrow: "Public portfolio",
      h2: "Show your portfolio, keep the amounts to yourself",
      lead:
        "Publish a read-only page with your holdings, allocation and returns against the indices. Amounts are hidden unless you opt in. Account numbers and transaction history never leave your private dashboard, and unpublishing deletes the page.",
      more: "About public portfolio pages",
      mockTitle: "Long-term portfolio",
      mockMeta: "Shares and returns only",
      cols: ["Holding", "Share", "Result"],
    },
    privacy: {
      eyebrow: "Privacy",
      h2: "Your data stays yours",
      items: [
        { t: "Google sign-in only", d: "No passwords to leak. We store your name, email address and profile photo, nothing else from Google." },
        { t: "Encrypted at rest", d: "Portfolio data is compressed and encrypted with AES-256-GCM before it reaches the database. Webhook addresses too." },
        { t: "Yours to take or delete", d: "Download a full JSON backup whenever you like, or delete the account together with every byte of data." },
        { t: "No ads, no trackers", d: "Apart from your Google profile photo, the app loads nothing from third parties in your browser. The project is non-profit and has nothing to sell." },
      ],
      more: "Privacy and data handling",
    },
    compare: {
      eyebrow: "Why not a spreadsheet?",
      h2: "Free, and built around the XTB export",
      cols: ["", "portfoliomanager", "Spreadsheet", "Paid trackers"],
      rows: [
        ["Price", "Free", "Free", "Monthly subscription"],
        ["XTB .xlsx import", "Native, all three sheets", "Copy and paste", "Often CSV only"],
        ["Live prices", "Yes", "Formulas to maintain", "Yes"],
        ["PIT-38 with NBP rates", "Yes", "By hand", "Depends on plan"],
        ["Dividends with withholding tax", "Yes", "By hand", "Usually"],
        ["Slack and Discord alerts", "Yes", "No", "Rarely"],
        ["Public portfolio page", "Yes", "Shared file", "Some"],
      ],
    },
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is portfoliomanager really free?",
        a: "Yes. It is a non-profit project with no paid plan, no trial and no ads. Running costs are kept low on purpose: the app sleeps when nobody is using it and the daily job runs for about a minute.",
      },
      {
        q: "Can I try it without an account?",
        a: "Yes. The live demo runs the full app on a sample XTB portfolio with three accounts and simulated prices. Nothing you do there is saved.",
      },
      {
        q: "Is it affiliated with XTB?",
        a: "No. It is an independent project that reads the standard account export from xStation. XTB is a trademark of XTB S.A.",
      },
      {
        q: "Which files do I need from XTB?",
        a: "The account history export in XLSX format, one file per account. It contains the Cash Operations, Closed Positions and Open Positions sheets, and portfoliomanager uses all three.",
      },
      {
        q: "Do I have to give it my XTB login?",
        a: "No, never. You upload exported files. To bring the portfolio up to date, export the latest period and upload it again; operations that are already there are skipped.",
      },
      {
        q: "How accurate is the PIT-38 estimate?",
        a: "It follows the usual rules: sales come from XTB's Closed Positions with their purchase cost, amounts are converted at the NBP rate from the previous business day, tax is 19%, and foreign dividend tax is credited up to 19%. Treat it as a cross-check of the PIT-8C from your broker, not as tax advice.",
      },
      {
        q: "Where do the prices come from?",
        a: "Quotes from Yahoo Finance with Stooq as a fallback, and NBP table A exchange rates. If a quote is missing, the price from your XTB export is used and the position is marked accordingly.",
      },
      {
        q: "Can I track IKE and IKZE accounts?",
        a: "Yes. They appear in every chart and table next to your other accounts, and they are left out of the PIT-38 estimate.",
      },
      {
        q: "Is the app available in English?",
        a: "The interface is in Polish today. Charts, tickers and numbers read the same in any language, and this page explains every section.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. The layout switches to a floating tab bar on narrow screens, and the whole app works in a mobile browser.",
      },
    ] as Faq[],
    final: {
      h2: "Your XTB portfolio, counted properly. For free.",
      lead: "Sign in with Google, upload your exports and get the full picture in a minute.",
    },
  },
  pl: {
    title: "Darmowy tracker portfela XTB: dywidendy, PIT-38, S&P 500 | portfoliomanager",
    description:
      "Darmowe narzędzie non-profit do śledzenia portfela XTB. Import eksportu .xlsx z xStation, wycena na żywo, dywidendy, szacunek PIT-38 i porównanie z S&P 500.",
    eyebrow: "Darmowe i non-profit, stworzone dla kont w XTB",
    h1: "Darmowy tracker portfela XTB",
    h1Sub: "który czyta Twoje eksporty",
    lead:
      "Wyeksportuj historię konta z xStation, wrzuć pliki .xlsx i zobacz, ile portfel jest wart dziś, jak wypadł na tle S&P 500, ile przyniósł w dywidendach i jaki mniej więcej podatek wyjdzie w PIT-38.",
    sources: ["Notowania z Yahoo Finance i Stooq", "Kursy walut z NBP", "Import z XTB xStation (.xlsx)", "Obsługa IKE i IKZE", "Widok w PLN, USD i EUR"],
    how: {
      eyebrow: "Jak to działa",
      h2: "Od eksportu z XTB do pełnego dashboardu w około minutę",
      steps: [
        {
          t: "Eksport z xStation",
          d: "W xStation albo w aplikacji XTB otwórz historię konta i wyeksportuj raport do XLSX. Jeden plik na konto: PLN, USD, EUR, IKE albo IKZE.",
        },
        {
          t: "Wrzuć pliki",
          d: "Pliki czytamy w Twojej przeglądarce. Import nakładających się okresów jest bezpieczny: każdą operację rozpoznajemy po jej ID z XTB, więc nic nie liczy się podwójnie.",
        },
        {
          t: "Czytaj wyniki",
          d: "Pozycje wyceniamy po bieżących kursach, zagraniczne przeliczamy po kursach NBP, a każdy wykres pokazuje wybrane konta i walutę.",
        },
      ],
    },
    features: {
      eyebrow: "Funkcje",
      h2: "To, co inwestor z XTB sprawdza co tydzień, bez arkusza kalkulacyjnego",
      lead: "Jedno logowanie, wszystkie konta w XTB i liczby, których aplikacja brokera nie zbiera w jednym miejscu.",
      items: [
        { k: "live", t: "Wycena na żywo", d: "Notowania akcji i ETF-ów z Warszawy, Nowego Jorku, Frankfurtu i Londynu oraz dzisiejsza zmiana każdej pozycji." },
        { k: "returns", t: "Stopy zwrotu do porównań", d: "Stopa ważona czasem (TWR) do porównania z indeksami i XIRR, czyli ile faktycznie zarobiły Twoje pieniądze." },
        { k: "bench", t: "S&P 500 i Nasdaq-100", d: "Indeksy przeliczone na Twoją walutę i symulacja: co, gdyby każda wpłata trafiła do indeksu?" },
        { k: "div", t: "Dywidendy", d: "Brutto, podatek u źródła i netto dla każdej wypłaty, w miesiącach i latach, ze stopą dywidendy z 12 miesięcy." },
        { k: "tax", t: "Szacunek PIT-38", d: "Zyski kapitałowe i dywidendy zagraniczne przeliczone po kursie NBP z dnia roboczego przed transakcją." },
        { k: "ike", t: "IKE i IKZE", d: "Konta z ulgą podatkową widać obok pozostałych na każdym wykresie, a z szacunku podatku są wyłączone." },
        { k: "alerts", t: "Alerty na Slacku i Discordzie", d: "Reguły dla dziennego ruchu, poziomu ceny i wartości portfela, sprawdzane w dni robocze po zamknięciu sesji w USA." },
        { k: "public", t: "Publiczna strona portfela", d: "Udostępnij podsumowanie portfela pod własnym adresem, jeśli chcesz, to tylko z procentami." },
        { k: "deposits", t: "Statystyki wpłat", d: "Średnia miesięczna wpłata, typowa i największa wpłata oraz to, jak regularnie dopłacasz, w latach i na kontach." },
      ],
    },
    bench: {
      eyebrow: "Porównanie z indeksami",
      h2: "Czy naprawdę wygrywasz z rynkiem?",
      lead:
        "Dobry rok potrafi ukryć słabą strategię. portfoliomanager zestawia stopę zwrotu ważoną czasem z S&P 500 i Nasdaq-100 przeliczonymi na Twoją walutę, więc wpłaty i wypłaty nie zakłamują obrazu.",
      points: [
        "Stopa ważona czasem, uczciwa przy porównaniu z indeksem",
        "Indeksy przeliczone po kursach NBP na PLN, USD albo EUR",
        "Symulacja: te same wpłaty zainwestowane w indeks",
      ],
      more: "Więcej o porównaniu z indeksami",
      ranges: { y1: "1R", y3: "3L", all: "Całość" },
    },
    screens: {
      eyebrow: "Prawdziwe ekrany",
      h2: "Tak wygląda aplikacja z portfelem demo",
      lead: "Bez makiet. To zrzuty ekranu portfoliomanagera z demonstracyjnym portfelem XTB złożonym z trzech kont (PLN, USD i IKE) i symulowanymi notowaniami. Ten sam portfel działa w demo.",
      tabs: [
        { k: "overview", t: "Przegląd", alt: "Przegląd w portfoliomanagerze: wartość portfela, kafelki z wynikami, wykres wartości i porównanie z indeksami" },
        { k: "performance", t: "Wyniki", alt: "Zakładka Wyniki z mapą miesięcznych stóp zwrotu i wynikami w latach" },
        { k: "holdings", t: "Aktywa", alt: "Tabela aktywów z ilością, średnią ceną, wartością i wynikiem każdej pozycji" },
        { k: "dividends", t: "Dywidendy", alt: "Zakładka Dywidendy z wypłatami netto w miesiącach i historią wypłat" },
        { k: "deposits", t: "Wpłaty", alt: "Zakładka Wpłaty ze średnią miesięczną wpłatą, największą wpłatą i wpłatami w miesiącach" },
        { k: "taxes", t: "Podatki", alt: "Szacunek PIT-38 z przychodem, kosztami, dochodem i podatkiem w latach" },
        { k: "alerts", t: "Alerty", alt: "Zakładka Alerty z webhookami Discorda i Slacka oraz regułami alertów" },
      ],
      themesTitle: "Wybierz wygląd",
      themes: ["Indygo, ciemny", "Indygo, jasny", "Bursztyn, jasny", "Bursztyn, ciemny"],
      phoneTitle: "Wygodny także na telefonie",
      phoneText: "Pływający pasek zakładek trzyma najważniejsze sekcje pod kciukiem. Wykresy i tabele dopasowują się do wąskiego ekranu, zamiast się zmniejszać.",
      phoneAlt: "portfoliomanager na telefonie: wartość portfela, wykres i kafelki z wynikami",
    },
    tax: {
      eyebrow: "PIT-38",
      h2: "Szacunek PIT-38 policzony z Twojej historii w XTB",
      lead:
        "Każda sprzedaż z arkusza Closed Positions ma swój koszt zakupu. Obie strony przeliczamy po kursie NBP z ostatniego dnia roboczego przed transakcją, tak jak wymaga urząd skarbowy. Dla dywidend zagranicznych liczymy 19% z odliczeniem podatku pobranego za granicą.",
      year: "Rok podatkowy 2025, portfel demo",
      rows: { revenue: "Przychód", cost: "Koszty", income: "Dochód", tax: "Podatek 19%", div: "Dywidendy zagraniczne, do dopłaty" },
      note: "Szacunek do porównania z PIT-8C od brokera. To nie jest porada podatkowa.",
      more: "Jak liczymy PIT-38",
    },
    alerts: {
      eyebrow: "Alerty",
      h2: "Alerty tam, gdzie i tak zaglądasz",
      lead:
        "Dodaj webhook Slacka albo Discorda, ustaw regułę i dostawaj krótką wiadomość po zamknięciu sesji: dzienny ruch całego portfela, poziom ceny jednej spółki albo przekroczenie wartości portfela. Każdy alert wychodzi raz na dzień sesyjny, nawet jeśli zadanie uruchomi się dwa razy.",
      points: ["Dzienny ruch pozycji albo całego portfela", "Poziom ceny pojedynczego instrumentu", "Wartość portfela powyżej lub poniżej progu", "Reguły jednorazowe albo stałe"],
      note: "",
    },
    public: {
      eyebrow: "Publiczny portfel",
      h2: "Pokaż portfel, kwoty zostaw dla siebie",
      lead:
        "Opublikuj stronę tylko do odczytu ze składem portfela, alokacją i wynikami na tle indeksów. Kwoty są ukryte, dopóki sam ich nie włączysz. Numery kont i historia transakcji nigdy nie opuszczają prywatnego panelu, a wyłączenie publikacji usuwa stronę.",
      more: "Więcej o publicznym portfelu",
      mockTitle: "Portfel długoterminowy",
      mockMeta: "Tylko udziały i wyniki",
      cols: ["Pozycja", "Udział", "Wynik"],
    },
    privacy: {
      eyebrow: "Prywatność",
      h2: "Twoje dane zostają Twoje",
      items: [
        { t: "Tylko logowanie przez Google", d: "Nie ma haseł, które mogłyby wyciec. Zapisujemy imię, adres e-mail i zdjęcie profilowe, nic więcej z Google." },
        { t: "Szyfrowanie w bazie", d: "Dane portfela są kompresowane i szyfrowane AES-256-GCM, zanim trafią do bazy. Adresy webhooków również." },
        { t: "Pobierz albo usuń", d: "Pełną kopię w JSON pobierzesz w każdej chwili, możesz też usunąć konto razem ze wszystkimi danymi." },
        { t: "Bez reklam i śledzenia", d: "Poza zdjęciem profilowym z Google aplikacja nie ładuje w przeglądarce niczego od firm trzecich. Projekt jest non-profit i nie ma czego sprzedawać." },
      ],
      more: "Prywatność i przetwarzanie danych",
    },
    compare: {
      eyebrow: "Po co, skoro jest arkusz?",
      h2: "Za darmo i od początku pod eksport z XTB",
      cols: ["", "portfoliomanager", "Arkusz", "Płatne trackery"],
      rows: [
        ["Cena", "0 zł", "0 zł", "Abonament"],
        ["Import .xlsx z XTB", "Natywny, wszystkie trzy arkusze", "Kopiuj i wklej", "Często tylko CSV"],
        ["Notowania na żywo", "Tak", "Formuły do pilnowania", "Tak"],
        ["PIT-38 po kursach NBP", "Tak", "Ręcznie", "Zależy od planu"],
        ["Dywidendy z podatkiem u źródła", "Tak", "Ręcznie", "Zwykle"],
        ["Alerty na Slacku i Discordzie", "Tak", "Nie", "Rzadko"],
        ["Publiczna strona portfela", "Tak", "Udostępniony plik", "Niektóre"],
      ],
    },
    faqTitle: "Najczęściej zadawane pytania",
    faq: [
      {
        q: "Czy portfoliomanager jest naprawdę darmowy?",
        a: "Tak. To projekt non-profit bez płatnego planu, okresu próbnego i reklam. Koszty utrzymania są celowo niskie: aplikacja usypia, gdy nikt z niej nie korzysta, a codzienne zadanie działa około minuty.",
      },
      {
        q: "Czy mogę wypróbować bez zakładania konta?",
        a: "Tak. Demo uruchamia całą aplikację na przykładowym portfelu XTB z trzema kontami i symulowanymi notowaniami. Nic, co tam zrobisz, nie jest zapisywane.",
      },
      {
        q: "Czy to narzędzie XTB?",
        a: "Nie. To niezależny projekt, który czyta standardowy eksport historii konta z xStation. XTB jest znakiem towarowym XTB S.A.",
      },
      {
        q: "Jakich plików z XTB potrzebuję?",
        a: "Eksportu historii konta w formacie XLSX, jeden plik na konto. Zawiera arkusze Cash Operations, Closed Positions i Open Positions, a portfoliomanager korzysta ze wszystkich trzech.",
      },
      {
        q: "Czy muszę podać login do XTB?",
        a: "Nie, nigdy. Wgrywasz wyeksportowane pliki. Żeby zaktualizować portfel, wyeksportuj ostatni okres i wgraj go ponownie; operacje, które już są, zostaną pominięte.",
      },
      {
        q: "Na ile dokładny jest szacunek PIT-38?",
        a: "Liczymy według typowych zasad: sprzedaże z arkusza Closed Positions z ich kosztem zakupu, przeliczenie po kursie NBP z poprzedniego dnia roboczego, podatek 19% i odliczenie podatku od dywidend zagranicznych do 19%. Traktuj go jako sprawdzenie PIT-8C od brokera, a nie jako poradę podatkową.",
      },
      {
        q: "Skąd pochodzą notowania?",
        a: "Z Yahoo Finance, zapasowo ze Stooq, a kursy walut z tabeli A NBP. Gdy notowania brakuje, używamy ceny z eksportu XTB i oznaczamy to przy pozycji.",
      },
      {
        q: "Czy obsługuje konta IKE i IKZE?",
        a: "Tak. Widać je na każdym wykresie i w każdej tabeli obok pozostałych kont, a z szacunku PIT-38 są wyłączone.",
      },
      {
        q: "Czy działa na telefonie?",
        a: "Tak. Na wąskim ekranie nawigacja zamienia się w pływający pasek zakładek, a cała aplikacja działa w przeglądarce mobilnej.",
      },
      {
        q: "Gdzie są przechowywane moje dane?",
        a: "W bazie Postgres w regionie Amsterdam, jako jeden zaszyfrowany dokument na użytkownika. Baza nie jest dostępna z internetu, tylko z sieci prywatnej aplikacji.",
      },
    ] as Faq[],
    final: {
      h2: "Portfel z XTB policzony porządnie. Za darmo.",
      lead: "Zaloguj się przez Google, wgraj eksporty i zobacz pełny obraz w minutę.",
    },
  },
};
