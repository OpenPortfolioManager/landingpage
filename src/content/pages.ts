import type { Lang, RouteKey } from "../lib/site";
import type { Faq } from "./copy";

export interface Section {
  h2: string;
  p?: string[];
  list?: string[];
}

export interface FeaturePage {
  title: string;
  description: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  image?: { src: string; alt: string; caption: string };
  sections: Section[];
  faq?: Faq[];
  related: RouteKey[];
}

// Placeholders like {ttm} are filled with demo numbers at build time (see FeatureLayout).
export const PAGES: Record<Exclude<RouteKey, "home">, Record<Lang, FeaturePage>> = {
  dividends: {
    en: {
      title: "XTB Dividend Tracker: net payouts, withholding tax, yield | portfoliomanager",
      description:
        "Track dividends from your XTB accounts for free: gross, withholding tax and net per payout, monthly and yearly totals and a 12-month yield. Import the xStation report.",
      crumb: "Dividend tracker",
      eyebrow: "Dividends",
      h1: "XTB dividend tracker",
      lead:
        "Every dividend from your XTB accounts in one table: the gross amount, the tax withheld at source, what actually landed in the account, and the same in your base currency. Free, built from the export you already have.",
      image: { src: "desk-dywidendy", alt: "Dividends tab in portfoliomanager with monthly net payouts and the payout history", caption: "Dividends tab, demo portfolio" },
      sections: [
        {
          h2: "Where the numbers come from",
          p: [
            "XTB records each payout in the Cash Operations sheet of the account export and books the withholding tax as a separate line. portfoliomanager pairs the two, so you see gross, tax and net side by side instead of rows you have to match yourself.",
            "Amounts stay in the account currency for the record. Totals and charts use your base currency, converted at NBP rates for the day of the payout.",
          ],
        },
        {
          h2: "What the dividends tab shows",
          list: [
            "Net dividends from the last 12 months and the yield on today's portfolio value",
            "A monthly chart covering the last 24 months",
            "Yearly totals: gross, tax withheld and net",
            "The shares and ETFs that paid you the most",
            "The full payout history with the date and the account",
          ],
        },
        {
          h2: "Withholding tax and PIT-38",
          p: [
            "Tax withheld abroad, for example 15% on US shares with a W-8BEN form on file, counts towards the 19% Polish tax. The PIT-38 estimate uses the same records to show what is left to pay.",
            "Dividends paid into IKE and IKZE accounts are shown with everything else and kept out of the tax estimate.",
          ],
        },
        {
          h2: "The demo portfolio in numbers",
          p: ["The demo portfolio on this site received {ttm} net over the last 12 months and {total} since January 2023, mostly from Polish banks and US large caps."],
        },
      ],
      faq: [
        { q: "Does it handle dividends in USD and EUR?", a: "Yes. Each payout is kept in its own currency and converted at the NBP rate for totals in PLN, USD or EUR." },
        { q: "Can I look at one account only?", a: "Yes. The account filter at the top of the app applies to the dividends tab too, so you can check the IKE account on its own." },
        { q: "Is the dividend tracker free?", a: "Yes. Like the rest of portfoliomanager it is free and non-profit, with no paid tier." },
      ],
      related: ["tax", "benchmark", "public"],
    },
    pl: {
      title: "Dywidendy z XTB: netto, podatek u źródła, stopa dywidendy | portfoliomanager",
      description:
        "Darmowe śledzenie dywidend z kont XTB: brutto, podatek u źródła i netto dla każdej wypłaty, sumy miesięczne i roczne oraz stopa dywidendy z 12 miesięcy. Import raportu z xStation.",
      crumb: "Dywidendy z XTB",
      eyebrow: "Dywidendy",
      h1: "Dywidendy z XTB w jednej tabeli",
      lead:
        "Każda dywidenda z Twoich kont w XTB w jednym miejscu: kwota brutto, podatek pobrany u źródła, to, co faktycznie wpłynęło na konto, i to samo w walucie bazowej. Za darmo, z eksportu, który już masz.",
      image: { src: "desk-dywidendy", alt: "Zakładka Dywidendy w portfoliomanagerze z wypłatami netto w miesiącach i historią wypłat", caption: "Zakładka Dywidendy, portfel demo" },
      sections: [
        {
          h2: "Skąd biorą się liczby",
          p: [
            "XTB zapisuje każdą wypłatę w arkuszu Cash Operations eksportu konta, a podatek u źródła księguje osobną linią. portfoliomanager łączy je w parę, więc widzisz brutto, podatek i netto obok siebie, a nie wiersze do ręcznego dopasowania.",
            "Kwoty zostają w walucie konta, żeby zgadzały się z wyciągiem. Sumy i wykresy pokazujemy w walucie bazowej, po kursie NBP z dnia wypłaty.",
          ],
        },
        {
          h2: "Co pokazuje zakładka Dywidendy",
          list: [
            "Dywidendy netto z ostatnich 12 miesięcy i stopę dywidendy liczoną od dzisiejszej wartości portfela",
            "Wykres miesięczny z ostatnich 24 miesięcy",
            "Sumy roczne: brutto, podatek u źródła i netto",
            "Spółki i ETF-y, które wypłaciły najwięcej",
            "Pełną historię wypłat z datą i kontem",
          ],
        },
        {
          h2: "Podatek u źródła a PIT-38",
          p: [
            "Podatek pobrany za granicą, na przykład 15% od akcji amerykańskich przy złożonym formularzu W-8BEN, odlicza się od 19% podatku w Polsce. Szacunek PIT-38 korzysta z tych samych danych i pokazuje, ile zostaje do dopłaty.",
            "Dywidendy wypłacone na IKE i IKZE widać razem z pozostałymi, ale nie wchodzą do szacunku podatku.",
          ],
        },
        {
          h2: "Portfel demo w liczbach",
          p: ["Portfel demonstracyjny z tej strony dostał {ttm} netto w ostatnich 12 miesiącach i {total} od stycznia 2023, głównie od polskich banków i dużych spółek z USA."],
        },
      ],
      faq: [
        { q: "Czy obsługuje dywidendy w USD i EUR?", a: "Tak. Każda wypłata zostaje w swojej walucie, a do sum w PLN, USD albo EUR przeliczamy ją po kursie NBP." },
        { q: "Czy mogę zobaczyć tylko jedno konto?", a: "Tak. Filtr kont u góry aplikacji działa również w zakładce Dywidendy, więc konto IKE sprawdzisz osobno." },
        { q: "Czy śledzenie dywidend jest płatne?", a: "Nie. Jak cały portfoliomanager jest darmowe i non-profit, bez płatnej wersji." },
      ],
      related: ["tax", "benchmark", "public"],
    },
  },
  tax: {
    en: {
      title: "PIT-38 Calculator for XTB: tax estimate with NBP rates | portfoliomanager",
      description:
        "Free PIT-38 estimate for XTB investors: gains from Closed Positions and foreign dividends converted at the NBP rate from the previous business day, with loss carry-forward.",
      crumb: "PIT-38 calculator",
      eyebrow: "PIT-38",
      h1: "PIT-38 calculator for XTB investors",
      lead:
        "Check the numbers before you file. portfoliomanager builds a PIT-38 estimate from your XTB exports: revenue, costs and income from sales, tax on foreign dividends, and losses you can still deduct.",
      image: { src: "desk-podatki", alt: "Taxes tab in portfoliomanager with the PIT-38 estimate per year", caption: "Taxes tab, demo portfolio" },
      sections: [
        {
          h2: "How the estimate is calculated",
          list: [
            "Sales come from the Closed Positions sheet, each with its own purchase price and date.",
            "Revenue and cost are converted to PLN at the NBP table A rate from the last business day before the sale and before the purchase.",
            "Income is revenue minus cost, and tax is 19% of the income rounded to whole złoty.",
            "Losses from the previous five years can be deducted, up to half of each year's loss per year.",
            "Foreign dividends: 19% of the gross amount minus the tax withheld abroad, credited up to 19%.",
          ],
        },
        {
          h2: "Which accounts count",
          p: [
            "Standard accounts in PLN, USD and EUR. IKE and IKZE accounts are excluded, because gains there are not reported in PIT-38 as long as the account rules are kept.",
            "Shares and ETFs are listed separately from derivatives such as CFDs, the way the form splits them.",
            "Each space has its own estimate, so a family member's portfolio kept in another space does not mix with yours.",
          ],
        },
        {
          h2: "The demo year 2025",
          p: [
            "For the demo portfolio the estimate shows {revenue} of revenue, {cost} of costs and {income} of income, which gives {tax} of tax. Foreign dividends add {div} to pay after the credit for tax withheld in the US.",
          ],
        },
        {
          h2: "Check it against your PIT-8C",
          p: [
            "XTB sends a PIT-8C with its own totals. Small differences usually come from rounding, corporate actions or fees. Every transaction in the estimate is listed with the rates used, so you can find the line that differs.",
          ],
        },
      ],
      faq: [
        { q: "Does it fill in the PIT-38 form?", a: "No. It shows the amounts that go into the form. You still file through e-Urząd Skarbowy or your own software." },
        { q: "Is this tax advice?", a: "No. It is an estimate based on the data in your exports. For anything unusual, such as mergers or inherited shares, check with a tax adviser." },
        { q: "Which years are covered?", a: "Every year that appears in the exports you upload, from the oldest closed position to today." },
      ],
      related: ["dividends", "benchmark", "privacy"],
    },
    pl: {
      title: "Kalkulator PIT-38 dla XTB: szacunek podatku po kursach NBP | portfoliomanager",
      description:
        "Darmowy szacunek PIT-38 dla inwestorów XTB: zyski z Closed Positions i dywidendy zagraniczne po kursie NBP z poprzedniego dnia roboczego, z odliczeniem strat.",
      crumb: "Kalkulator PIT-38",
      eyebrow: "PIT-38",
      h1: "Kalkulator PIT-38 dla inwestorów XTB",
      lead:
        "Sprawdź liczby, zanim złożysz zeznanie. portfoliomanager liczy szacunek PIT-38 z eksportów XTB: przychód, koszty i dochód ze sprzedaży, podatek od dywidend zagranicznych i straty, które możesz jeszcze odliczyć.",
      image: { src: "desk-podatki", alt: "Zakładka Podatki w portfoliomanagerze z szacunkiem PIT-38 w latach", caption: "Zakładka Podatki, portfel demo" },
      sections: [
        {
          h2: "Jak liczymy szacunek",
          list: [
            "Sprzedaże bierzemy z arkusza Closed Positions, każdą z jej ceną i datą zakupu.",
            "Przychód i koszt przeliczamy na złote po kursie NBP z tabeli A z ostatniego dnia roboczego przed sprzedażą i przed zakupem.",
            "Dochód to przychód minus koszty, a podatek to 19% dochodu zaokrąglonego do pełnych złotych.",
            "Straty z pięciu poprzednich lat można odliczyć, maksymalnie połowę straty z danego roku rocznie.",
            "Dywidendy zagraniczne: 19% kwoty brutto minus podatek pobrany za granicą, odliczany do wysokości 19%.",
          ],
        },
        {
          h2: "Które konta się liczą",
          p: [
            "Zwykłe konta w PLN, USD i EUR. IKE i IKZE są wyłączone, bo zysków z nich nie wykazuje się w PIT-38, dopóki spełniasz warunki konta.",
            "Akcje i ETF-y pokazujemy osobno od instrumentów pochodnych, takich jak CFD, tak jak dzieli je formularz.",
            "Każda przestrzeń ma własny szacunek, więc portfel kogoś z rodziny trzymany w innej przestrzeni nie miesza się z Twoim.",
          ],
        },
        {
          h2: "Rok 2025 w portfelu demo",
          p: [
            "Dla portfela demonstracyjnego szacunek pokazuje {revenue} przychodu, {cost} kosztów i {income} dochodu, co daje {tax} podatku. Dywidendy zagraniczne dokładają {div} do dopłaty po odliczeniu podatku pobranego w USA.",
          ],
        },
        {
          h2: "Porównaj z PIT-8C",
          p: [
            "XTB przysyła PIT-8C z własnymi sumami. Drobne różnice wynikają zwykle z zaokrągleń, operacji korporacyjnych albo opłat. W szacunku każda transakcja ma podane kursy, więc łatwo znaleźć wiersz, który się nie zgadza.",
          ],
        },
      ],
      faq: [
        { q: "Czy wypełnia formularz PIT-38?", a: "Nie. Pokazuje kwoty, które trafiają do formularza. Zeznanie składasz jak zwykle, przez e-Urząd Skarbowy albo własny program." },
        { q: "Czy to porada podatkowa?", a: "Nie. To szacunek na podstawie danych z eksportów. W nietypowych sytuacjach, takich jak fuzje czy akcje z dziedziczenia, skonsultuj się z doradcą podatkowym." },
        { q: "Za które lata liczy podatek?", a: "Za każdy rok, który pojawia się w wgranych eksportach, od najstarszej zamkniętej pozycji do dziś." },
      ],
      related: ["dividends", "benchmark", "privacy"],
    },
  },
  benchmark: {
    en: {
      title: "Compare Your Portfolio with the S&P 500 (TWR and XIRR) | portfoliomanager",
      description:
        "See whether your XTB portfolio beats the S&P 500 and the Nasdaq-100: time-weighted return, XIRR and an index simulation of your own deposits in PLN, USD or EUR. Free.",
      crumb: "Compare with the S&P 500",
      eyebrow: "Benchmarks",
      h1: "Compare your XTB portfolio with the S&P 500",
      lead: "Your balance went up. Was that good picks, a rising market or simply new deposits? portfoliomanager separates the three.",
      image: { src: "desk-wyniki", alt: "Performance tab in portfoliomanager with a monthly returns heatmap and yearly results", caption: "Performance tab, demo portfolio" },
      sections: [
        {
          h2: "Two returns for two questions",
          p: [
            "Time-weighted return (TWR) tells you how well your investments did, no matter when you added money. It is the figure to compare with an index.",
            "XIRR tells you what your money earned per year, taking the timing and size of every deposit into account. It is the figure to compare with a savings account or a bond.",
          ],
        },
        {
          h2: "Indices in your currency",
          p: [
            "The S&P 500, the Nasdaq-100 and the Nasdaq Composite are converted at NBP rates to PLN, USD or EUR. A Polish investor holding US shares carries currency risk, and a fair benchmark should carry it as well.",
          ],
        },
        {
          h2: "What if everything had gone into the index?",
          p: [
            "The simulation takes your portfolio value at the start of the period plus every later deposit and withdrawal, and invests them in the index on the same days. The difference shows what your own choices added or cost.",
          ],
        },
        {
          h2: "More than one chart",
          list: [
            "Returns for 1 and 3 months, year to date, 1 and 3 years and since inception",
            "A monthly returns heatmap with yearly totals",
            "Yearly results in your currency",
            "Maximum drawdown and volatility",
          ],
        },
        {
          h2: "The demo portfolio",
          p: ["Since January 2023 the demo portfolio returned {twr} time-weighted, against {sp} for the S&P 500 and {ndx} for the Nasdaq-100, all measured in PLN."],
        },
      ],
      faq: [
        { q: "Which indices can I compare with?", a: "The S&P 500, the Nasdaq-100 and the Nasdaq Composite." },
        { q: "Can I change the period?", a: "Yes: 1 month, 3 months, year to date, 1 year, 3 years or since the first deposit." },
        { q: "Why is my return different from the one in xStation?", a: "xStation shows the profit on open positions. portfoliomanager measures the whole account over time, including closed positions, dividends, fees and currency effects." },
      ],
      related: ["dividends", "tax", "public"],
    },
    pl: {
      title: "Porównanie portfela z S&P 500 (TWR i XIRR) | portfoliomanager",
      description:
        "Sprawdź, czy Twój portfel XTB wygrywa z S&P 500 i Nasdaq-100: stopa ważona czasem, XIRR i symulacja wpłat zainwestowanych w indeks, w PLN, USD albo EUR. Za darmo.",
      crumb: "Porównanie z S&P 500",
      eyebrow: "Porównanie z indeksami",
      h1: "Porównaj portfel z XTB z S&P 500",
      lead: "Saldo urosło. Tylko czy to zasługa dobrych wyborów, rosnącego rynku, czy po prostu nowych wpłat? portfoliomanager rozdziela te trzy rzeczy.",
      image: { src: "desk-wyniki", alt: "Zakładka Wyniki w portfoliomanagerze z mapą miesięcznych stóp zwrotu i wynikami w latach", caption: "Zakładka Wyniki, portfel demo" },
      sections: [
        {
          h2: "Dwie stopy zwrotu, dwa pytania",
          p: [
            "Stopa ważona czasem (TWR) mówi, jak radziły sobie Twoje inwestycje, niezależnie od tego, kiedy dokładałeś pieniądze. To ją porównujemy z indeksem.",
            "XIRR mówi, ile rocznie zarobiły Twoje pieniądze, z uwzględnieniem terminów i wielkości każdej wpłaty. To ją porównasz z lokatą albo obligacjami.",
          ],
        },
        {
          h2: "Indeksy w Twojej walucie",
          p: [
            "S&P 500, Nasdaq-100 i Nasdaq Composite przeliczamy po kursach NBP na PLN, USD albo EUR. Inwestor z Polski, który trzyma amerykańskie akcje, ponosi ryzyko walutowe, więc uczciwy punkt odniesienia też powinien je zawierać.",
          ],
        },
        {
          h2: "A gdyby wszystko poszło w indeks?",
          p: [
            "Symulacja bierze wartość portfela na początku okresu oraz każdą późniejszą wpłatę i wypłatę i inwestuje je w indeks w tych samych dniach. Różnica pokazuje, ile dodały albo kosztowały Twoje własne decyzje.",
          ],
        },
        {
          h2: "Więcej niż jeden wykres",
          list: [
            "Stopy zwrotu za 1 i 3 miesiące, od początku roku, za rok, 3 lata i od początku",
            "Mapa miesięcznych stóp zwrotu z sumą za każdy rok",
            "Wyniki w latach w Twojej walucie",
            "Maksymalne obsunięcie i zmienność",
          ],
        },
        {
          h2: "Portfel demo",
          p: ["Od stycznia 2023 portfel demonstracyjny zarobił {twr} w ujęciu ważonym czasem, wobec {sp} dla S&P 500 i {ndx} dla Nasdaq-100, wszystko liczone w złotych."],
        },
      ],
      faq: [
        { q: "Z jakimi indeksami mogę porównać portfel?", a: "Z S&P 500, Nasdaq-100 i Nasdaq Composite." },
        { q: "Czy mogę zmienić okres?", a: "Tak: 1 miesiąc, 3 miesiące, od początku roku, rok, 3 lata albo od pierwszej wpłaty." },
        { q: "Dlaczego wynik różni się od tego w xStation?", a: "xStation pokazuje zysk na otwartych pozycjach. portfoliomanager mierzy całe konto w czasie, razem z zamkniętymi pozycjami, dywidendami, opłatami i wpływem kursów walut." },
      ],
      related: ["dividends", "tax", "public"],
    },
  },
  public: {
    en: {
      title: "Public Portfolio Page: share your XTB portfolio safely | portfoliomanager",
      description:
        "Publish a free, read-only page of your XTB portfolio: holdings, allocation and returns against indices. Amounts hidden by default, no account numbers, not indexed.",
      crumb: "Public portfolio page",
      eyebrow: "Public portfolio",
      h1: "A public page for your portfolio",
      lead:
        "For a blog, a forum thread or friends who keep asking what you hold. Publish a summary that updates itself and decide exactly what it shows.",
      image: { src: "public", alt: "Public portfolio page with returns against indices and allocation, without amounts", caption: "Public page of the demo portfolio, amounts hidden" },
      sections: [
        {
          h2: "What the page shows",
          list: [
            "Holdings with their share of the portfolio and their result",
            "Allocation by asset class, currency and market",
            "Time-weighted return against the S&P 500 and the Nasdaq",
            "Returns for standard periods, from 1 month to since inception",
            "Amounts in your currency, only if you switch them on",
          ],
        },
        {
          h2: "What it never shows",
          list: ["Account numbers", "Transaction history and the dates of your trades", "Deposits and withdrawals", "Your name or email address, unless you put them in the title"],
        },
        {
          h2: "How it stays up to date",
          p: [
            "The page is a snapshot that is rebuilt every weekday after the US close, and whenever you ask for a refresh. Turning publishing off deletes the snapshot at once.",
            "It lives at an address you choose, under portfolio.starpedia.pl/p/.",
            "Each space has its own public page, so you can publish one portfolio and keep another private.",
          ],
        },
        {
          h2: "Search engines",
          p: ["Public pages carry a noindex tag. People see the page when you share the link; search engines are asked not to list it."],
        },
      ],
      faq: [
        { q: "Do I have to publish anything?", a: "No. Publishing is off by default and needs your explicit consent." },
        { q: "Can I choose the address?", a: "Yes. You pick the address when you publish and can change it later." },
        { q: "Does it cost anything?", a: "No. Public pages are part of the free app." },
      ],
      related: ["benchmark", "privacy", "dividends"],
    },
    pl: {
      title: "Publiczny portfel inwestycyjny: udostępnij portfel XTB bezpiecznie | portfoliomanager",
      description:
        "Opublikuj za darmo stronę swojego portfela XTB tylko do odczytu: skład, alokacja i wyniki na tle indeksów. Kwoty domyślnie ukryte, bez numerów kont, bez indeksowania.",
      crumb: "Publiczny portfel",
      eyebrow: "Publiczny portfel",
      h1: "Publiczna strona Twojego portfela",
      lead:
        "Na bloga, do wątku na forum albo dla znajomych, którzy pytają, co masz w portfelu. Opublikuj podsumowanie, które samo się aktualizuje, i zdecyduj, co dokładnie pokazuje.",
      image: { src: "public", alt: "Publiczna strona portfela z wynikami na tle indeksów i alokacją, bez kwot", caption: "Publiczna strona portfela demo, kwoty ukryte" },
      sections: [
        {
          h2: "Co pokazuje strona",
          list: [
            "Pozycje z udziałem w portfelu i wynikiem",
            "Alokację według klas aktywów, walut i rynków",
            "Stopę zwrotu ważoną czasem na tle S&P 500 i Nasdaq",
            "Wyniki za standardowe okresy, od miesiąca do całej historii",
            "Kwoty w Twojej walucie, tylko jeśli je włączysz",
          ],
        },
        {
          h2: "Czego nigdy nie pokazuje",
          list: ["Numerów kont", "Historii transakcji i dat Twoich zleceń", "Wpłat i wypłat", "Imienia ani adresu e-mail, chyba że wpiszesz je w tytuł"],
        },
        {
          h2: "Jak strona pozostaje aktualna",
          p: [
            "Strona to migawka przeliczana w każdy dzień roboczy po zamknięciu sesji w USA i na Twoją prośbę. Wyłączenie publikacji od razu ją usuwa.",
            "Działa pod wybranym przez Ciebie adresem w portfolio.starpedia.pl/p/.",
            "Każda przestrzeń ma własną publiczną stronę, więc jeden portfel możesz opublikować, a drugi zostawić prywatny.",
          ],
        },
        {
          h2: "Wyszukiwarki",
          p: ["Strony publiczne mają znacznik noindex. Zobaczą je osoby, którym wyślesz link; wyszukiwarki dostają prośbę, żeby ich nie indeksować."],
        },
      ],
      faq: [
        { q: "Czy muszę cokolwiek publikować?", a: "Nie. Publikacja jest domyślnie wyłączona i wymaga Twojej wyraźnej zgody." },
        { q: "Czy mogę wybrać adres strony?", a: "Tak. Wybierasz go przy publikacji i możesz później zmienić." },
        { q: "Czy to coś kosztuje?", a: "Nie. Publiczna strona jest częścią darmowej aplikacji." },
      ],
      related: ["benchmark", "privacy", "dividends"],
    },
  },
  privacy: {
    en: {
      title: "Privacy and data handling | portfoliomanager",
      description:
        "What portfoliomanager stores, how portfolio data is encrypted, where it is kept and how to export or delete it. Plus what this website does not collect.",
      crumb: "Privacy",
      eyebrow: "Privacy",
      h1: "Privacy and data handling",
      lead: "A short, plain description of what the app keeps, why, and how you stay in control of it.",
      sections: [
        {
          h2: "What the app stores",
          list: [
            "From Google: your name, email address and profile photo. No Google tokens are kept after sign-in.",
            "Your portfolios: the operations and positions from the XTB reports you upload, one portfolio per space, plus your settings.",
            "Optional: Slack or Discord webhook addresses, alert rules and the public page settings, if you use them.",
          ],
        },
        {
          h2: "How it is protected",
          list: [
            "Your whole portfolio is compressed and encrypted with AES-256-GCM before it is stored. The encryption key is kept separately from the data.",
            "Webhook addresses are encrypted the same way and never shown again after you save them.",
            "E-mail alerts are sent from alerts@starpedia.pl through Resend, an e-mail delivery service, and only to the address of your Google account. A message holds the alert lines, such as a price or the portfolio value.",
            "Everything is stored on servers in Europe.",
            "Sessions use signed cookies, and every change to your data is checked for the same origin.",
          ],
        },
        {
          h2: "Your controls",
          list: [
            "Download a full JSON backup of your portfolio at any time.",
            "Delete an account from the portfolio, a whole space, or everything together with your user account.",
            "Signing out also clears the market data cached in your browser.",
          ],
        },
        {
          h2: "What happens in your browser",
          p: [
            "XTB reports, the .zip as well as .xlsx files, are read in your browser; only the parsed operations are sent to the server. Market data comes through the app's own server from Yahoo Finance, Stooq and NBP, so your browser does not talk to those services directly. Those services only receive instrument symbols and currency codes, never your positions or amounts.",
          ],
        },
        {
          h2: "This website",
          p: [
            "This landing page is a static site on GitHub Pages. It sets no cookies, runs no analytics and loads its fonts from its own address. GitHub, as the host, may keep standard server logs.",
          ],
        },
      ],
      related: ["public", "tax", "dividends"],
    },
    pl: {
      title: "Prywatność i przetwarzanie danych | portfoliomanager",
      description:
        "Co przechowuje portfoliomanager, jak szyfrujemy dane portfela, gdzie są trzymane i jak je pobrać albo usunąć. Oraz czego nie zbiera ta strona.",
      crumb: "Prywatność",
      eyebrow: "Prywatność",
      h1: "Prywatność i przetwarzanie danych",
      lead: "Krótko i zwyczajnie: co aplikacja zapisuje, po co i jak zachowujesz nad tym kontrolę.",
      sections: [
        {
          h2: "Co zapisuje aplikacja",
          list: [
            "Z Google: imię, adres e-mail i zdjęcie profilowe. Po zalogowaniu nie przechowujemy tokenów Google.",
            "Portfele: operacje i pozycje z wgranych raportów XTB, osobno dla każdej przestrzeni, oraz Twoje ustawienia.",
            "Opcjonalnie: adresy webhooków Slacka lub Discorda, reguły alertów i ustawienia publicznej strony, jeśli z nich korzystasz.",
          ],
        },
        {
          h2: "Jak chronimy dane",
          list: [
            "Cały portfel jest kompresowany i szyfrowany AES-256-GCM, zanim zostanie zapisany. Klucz szyfrujący jest przechowywany oddzielnie od danych.",
            "Adresy webhooków szyfrujemy tak samo i po zapisaniu już ich nie wyświetlamy.",
            "Alerty e-mail wysyłamy z alerts@starpedia.pl przez Resend, usługę wysyłki e-maili, i tylko na adres Twojego konta Google. Wiadomość zawiera treść alertu, na przykład cenę albo wartość portfela.",
            "Wszystko jest przechowywane na serwerach w Europie.",
            "Sesje opierają się na podpisanych ciasteczkach, a każda zmiana danych jest sprawdzana pod kątem pochodzenia z tej samej strony.",
          ],
        },
        {
          h2: "Twoja kontrola",
          list: [
            "W każdej chwili pobierzesz pełną kopię portfela w JSON.",
            "Możesz usunąć pojedyncze konto z portfela, całą przestrzeń albo wszystko razem z kontem użytkownika.",
            "Wylogowanie czyści też dane rynkowe zapisane w przeglądarce.",
          ],
        },
        {
          h2: "Co dzieje się w przeglądarce",
          p: [
            "Raporty XTB, zarówno plik .zip, jak i pliki .xlsx, czytamy w przeglądarce, a na serwer trafiają tylko odczytane operacje. Dane rynkowe pobiera serwer aplikacji z Yahoo Finance, Stooq i NBP, więc Twoja przeglądarka nie łączy się z tymi serwisami bezpośrednio. Te serwisy dostają wyłącznie symbole instrumentów i kody walut, nigdy Twoje pozycje ani kwoty.",
          ],
        },
        {
          h2: "Ta strona",
          p: [
            "Ta strona to statyczna witryna na GitHub Pages. Nie ustawia ciasteczek, nie ma analityki i ładuje fonty z własnego adresu. GitHub jako hosting może prowadzić standardowe logi serwera.",
          ],
        },
      ],
      related: ["public", "tax", "dividends"],
    },
  },
};
