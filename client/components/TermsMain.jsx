import dynamic from "next/dynamic";
import React from "react";
const Container = dynamic(() => import("@material-ui/core/Container"));
import en from "./../lib/locales/en/en";
import en_terms from "./../lib/locales/en/terms";
import pl from "./../lib/locales/pl/pl";
import pl_terms from "./../lib/locales/pl/terms";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "85px 15px 0 15px",
    },
    padding: "85px 30px 0 30px",
  },
  border: {
    "&:before": {
      display: "none",
    },
  },
  container: {
    textAlign: "center",
  },
}));

export default function TermsMain(props) {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;
  const t_spec = locale === "pl" ? pl_terms : en_terms;

  return (
    <section className={classes.root} id={`terms-of-policy`}>
      <style>
        {`
    article > * {
      text-align: left;
       font-family: sans-serif;
     }
     h2 {
      font-size: 2rem;
     margin-top: 2.5rem
     }
     article a {
      color: #428bca;
      text-decoration: underline;
  }
  article a:hover, article a:focus {
    color: #2a6496;
    text-decoration: underline;
}
article {
  margin-bottom: 4em;
}
     `}
      </style>
      <Container maxWidth={`md`} className={classes.container}>
        <Typography
          variant="h1"
          component="h1"
          style={{ textAlign: "center" }}
          className={classes.border}
        >
          {t_spec.heading}
        </Typography>

        <>
          <article>
            <h2>I. Pojęcia ogólne</h2>
            <ul>
              <li>
                <strong>Regulamin</strong> – niniejszy regulamin
              </li>
              <li>
                <strong>Serwis</strong> – serwis internetowych
                &quot;naszechoinki.pl&quot;, działających pod adresem
                https://naszechoinki.pl/
              </li>
              <li>
                <strong>Usługodawca</strong> – firma &quot;Firma Bednarz
                Mieczysław Bednarz&quot; z adresem siedziby: Wolica 124, 28-130
                Stopnica, NIP: 6551022087,{" "}
              </li>
              <li>
                <strong>Usługobiorca</strong> – każda osoba fizyczna, uzyskująca
                dostęp do Serwisu i korzystająca z usług świadczonych za
                pośrednictwem Serwisu przez Usługodawcę.
              </li>
              <li>
                <strong>Komunikacja Drogą Elektroniczną</strong> – Komunikacja
                pomiędzy stronami za pośrednictwem poczty elektronicznej
                (e-mail) oraz formularzy kontaktowych dostępnych na stronie www.
              </li>
            </ul>
            <h2>II. Postanowienia ogólne</h2>
            <ul>
              <li>
                Regulamin, określa zasady funkcjonowania i użytkowania Serwisu
                oraz określa zakres praw i obowiązków Usługobiorców i
                Usługodawcy związanych z użytkowaniem Serwisu.
              </li>
              <li>
                Przedmiotem usług Usługodawcy jest udostępnienie nieodpłatnych
                narzędzi w postaci Serwisu, umożliwiających Usługobiorcom dostęp
                do treści w postaci wpisów, artykułów i materiałów
                audiowizualnych lub aplikacji internetowych i formularzy
                elektronicznych
              </li>
              <li>
                Wszelkie ewentualne treści, artykuły i informacje zawierające
                cechy wskazówek lub porad publikowane na łamach Serwisu są
                jedynie ogólnym zbiorem informacji i nie są kierowane do
                poszczególnych Usługobiorców. Usługodawca nie ponosi
                odpowiedzialności za wykorzystanie ich przez Usługobiorców.
              </li>
              <li>
                Usługobiorca bierze na siebie pełną odpowiedzialno za sposób
                wykorzystania materiałów udostępnianych w ramach Serwisu w tym
                za wykorzystanie ich zgodnie z obowiązującymi przepisami prawa.
              </li>
              <li>
                Usługodawca nie udziela żadnej gwarancji co do przydatności
                materiałów umieszczonych w Serwisie.
              </li>
              <li>
                Usługodawca nie ponosi odpowiedzialności z tytułu ewentualnych
                szkód poniesionych przez Usługobiorców Serwisu lub osoby trzecie
                w związku z korzystaniem z Serwisu. Wszelkie ryzyko związane z
                korzystaniem z Serwisu, a w szczególności z używaniem i
                wykorzystywaniem informacji umieszczonych w Serwisie, ponosi
                Usługobiorca korzystający z usług Serwisu.
              </li>
            </ul>
            <h2>III. Warunki używania Serwisu</h2>
            <ul>
              <li>
                Używanie Serwisu przez każdego z Usługobiorców jest nieodpłatne
                i dobrowolne.
              </li>
              <li>
                Usługobiorcy mają obowiązek zapoznania się z Regulaminem oraz
                pozostałymi dokumentami stanowiącymi jego integralną część i
                muszą zaakceptować w całości jego postanowienia w celu dalszego
                korzystania z Serwisu.
              </li>
              <li>
                Usługobiorcy nie mogą wykorzystywać żadnych pozyskanych w
                Serwisie danych osobowych do celów marketingowych.
              </li>{" "}
              <li>
                Wymagania techniczne korzystania z Serwisu:
                <ul>
                  <li>
                    urządzenie z wyświetlaczem umożliwiające wyświetlanie stron
                    internetowych,
                  </li>
                  <li>połączenie z internetem,</li>
                  <li>
                    dowolna przeglądarka internetowa, która wyświetla strony
                    internetowe zgodnie ze standardami i postanowieniami
                    Konsorcjum W3C i obsługuje strony www udostępniane w języku
                    HTML5,
                  </li>
                  <li>włączoną obsługę skryptów JavaScript,</li>
                  <li>włączoną obsługę plików Cookie</li>
                </ul>
              </li>
              <li>
                W celu zapewnienia bezpieczeństwa Usługodawcy, Usługobiorcy oraz
                innych Usługobiorców korzystających z Serwisu, wszyscy
                Usługobiorcy korzystający z Serwisu powinni stosować się do
                ogólnie przyjętych{" "}
                <a href="https://nety.pl/cyberbezpieczenstwo/zasady-ogolne-korzystania-z-sieci-internet/"  rel="nofollow external">
                  zasad bezpieczeństwa w sieci
                </a>
                ,
              </li>{" "}
              <li>
                Zabrania się działań wykonywanych osobiście przez Usługobiorców
                lub przy użyciu oprorgamowania:
                <ul>
                  <li>
                    bez zgody pisemnej, dekompilacji i analizy kodu źródłowego,
                  </li>
                  <li>
                    bez zgody pisemnej, powodujących nadmierne obciążenie
                    serwera Serwisu,
                  </li>
                  <li>
                    bez zgody pisemnej, prób wykrycia luk w zabezpieczeniach
                    Serwisu i konfiguracji serwera,
                  </li>
                  <li>
                    podejmowania prób wgrywania lub wszczykiwania na serwer i do
                    bazy danych kodu, skryptów i oprogramowania mogących
                    wyrządzić szkodę oprogramowaniu Serwisu, innym Usługobiorcom
                    lub Usługodawcy,
                  </li>
                  <li>
                    podejmowania prób wgrywania lub wszczykiwania na serwer i do
                    bazy danych kodu, skryptów i oprogramowania mogących śledzić
                    lub wykradać dane Usługobiorców lub Usługodawcy,
                  </li>
                  <li>
                    podejmowania jakichkolwiek działań mających na celu
                    uszkodzenie, zablokowanie działania Serwisu lub
                    uniemożliwienie realizacji celu w jakim działa Serwis.
                  </li>
                </ul>
              </li>
              <li>
                W przypadku wykrycia zaistnienia lub potencjalnej możliwości
                zaistnienia incydentu Cyberbezpieczeństwa lub naruszenia RODO,
                Usługobiorcy w pierwszej kolejności powinni zgłosić ten fakt
                Usługodawcy w celu szybkiego usunięcia problemu / zagrożenia i
                zabezpieczenia interesów wszystkich Usługobiorców Serwisu.
              </li>
            </ul>
            <h2>IV. Warunki oraz zasady rejestracji</h2>
            <ul>
              <li>
                Usługobiorcy mogą korzystać z Serwisu bez konieczności
                rejestracji.
              </li>
              <li>
                Usługobiorcy muszą być zarejestrowani i posiadać konto w
                Serwisie by korzystać z dodatkowych usług świadczonych w
                Serwisie, dostępnych jedynie dla Usługobiorców po zalogowaniu.
              </li>
              <li>Rejestracja w Serwisie jest dobrowolna.</li>
              <li>Rejestracja w Serwisie jest nieodpłatna.</li>
              <li>
                Każdy Usługobiorca może posiadać tylko jedno konto w Serwisie.
              </li>{" "}
              <li>
                Wymagania techniczne związane z rejestracją konta:
                <ul>
                  <li>
                    posiadanie indywidualnego konta poczty elektronicznej
                    e-mail,
                  </li>
                </ul>
              </li>
              <li>
                Rejestrujący się w Serwisie Usługobiorcy wyrażają zgodę na
                przetwarzanie ich danych osobowych przez Usługobiorcę w zakresie
                w jakim zostały one wprowadzone do Serwisu podczas procesu
                rejestracji oraz ich późniejszych zmianom lub usunięciu.
              </li>
              <li>
                Usługodawca ma prawo zawieszać lub usuwać konta Usługobiorców
                według własnego uznania, uniemożliwiając lub ograniczając w ten
                sposób dostęp do poszczególnych lub wszystkich usług, treści,
                materiałów i zasobów Serwisu, w szczególności jeżeli
                Usługobiorca dopuści się łamania Regulaminu, powszechnie
                obowiązujących przepisów prawa, zasad współżycia społecznego lub
                działa na szkodę Usługodawcy lub innych Usługobiorców,
                uzasadnionego interesu Usługodawcy oraz podmiotów trzecich
                współpracujących lub nie z Usługodawcą.
              </li>
              <li>
                Wszelkie usługi Serwisu mogą być zmieniane co do ich treści i
                zakresu, dodawane lub odejmowane, a także czasowo zawieszane lub
                dostęp do nich może być ograniczany, według swobodnej decyzji
                Usługodawcy, bez możliwości wnoszenia sprzeciwu w tym zakresie
                przez Usługobiorców.
              </li>
              <li>
                Dodatkowe zasady bezpieczeństwa w zakresie korzystania z konta:
                <ul>
                  <li>
                    Zabrania się Usługobiorcom zarejestrowanym w Serwisie do
                    udostępniania loginu oraz hasła do swojego konta osobom
                    trzecim.
                  </li>
                  <li>
                    Usługodawca nie ma prawa i nigdy nie będzie zażądać od
                    Usługobiorcy hasła do wybranego konta.
                  </li>
                </ul>
              </li>
              <li>
                Usuwanie konta:
                <ul>
                  <li>
                    Każdy Usługobiorca posiadający konto w Serwisie ma możliwość
                    samodzielnego usunięcia konta z Serwisu.
                  </li>
                  <li>
                    Usługobiorcy mogą to uczynić po zalogowaniu się w panelu w
                    Serwisie.
                  </li>
                  <li>
                    Usunięcie konta skutkuje usunięciem wszelkich danych
                    identyfikacyjnych Usługobiorcy oraz anonimizacją nazwy
                    użytkownika i adresu e-mail.
                  </li>
                </ul>
              </li>
            </ul>
            <h2>
              V. Warunki komunikacji i świadczenia pozostałych usług w Serwisie
            </h2>
            <ul>
              <li>
                Serwis udostępnia usługi i narzędzia umożliwiające Usługobiorcom
                interakcję z Serwisem w postaci:
                <ul>
                  <li>Formularz kontaktowy</li>
                  <li>
                    Publikowanie własnych treści w postaci materiałów
                    graficznych i multimedialnych
                  </li>
                </ul>
              </li>
              <li>
                Serwis udostępnia dane kontaktowe w postaci:
                <ul>
                  <li>Adresu e-mail</li>
                  <li>Telefonu kontaktowego</li>
                </ul>
              </li>
              <li>
                W przypadku kontaktu Usługobiorcy z Usługodawcą, dane osobowe
                Usługobiorców będa przetwarzane zgodnie z &quot;
                <a href="https://naszechoinki.pl/polityka-prywatnosci">
                  Polityką Prywatności
                </a>
                &quot;, stanowiącą integralną część Regulaminu.
              </li>
              <li>
                Warunki umieszczania treści przez Usługobiorców w Serwisie:
                <ul>
                  <li>
                    Zabrania się umieszczania w Serwisie treści obraźliwych lub
                    oszczerczych względem Usługodawcy, pozostałych
                    Usługobiorców, osób trzecich oraz podmiotów trzecich,
                  </li>
                  <li>
                    Zabrania się umieszczania w Serwisie materiałów tekstowcyh,
                    graficznych, audiowizualnych, skryptów, programów i innych
                    utworów, na które Usługobiorca nie posiada się licencji, lub
                    których autor praw majątkowych nie wyraził zgody na darmową
                    publikację,
                  </li>
                  <li>
                    Zabrania się umieszczania w Serwisie treści wulgarnych,
                    pornograficznych, erotycznych i niezgodnych z polskim i
                    europejskim prawem a także odnośników do stron zawierających
                    wskazane treści,
                  </li>
                  <li>
                    Zabrania się umieszczania w Serwisie skryptów i programów
                    nadmiernie obciążających serwer, oprogramowania
                    nielegalnego, oprogramowania służącego do naruszania
                    zabezpieczeń oraz innych podobnych działań a także
                    odnośników do stron zawierających wskazane materiały,
                  </li>
                  <li>
                    Zabrania się umieszczania w Serwisie treści merketingowych i
                    reklamujących inne serwisy komercyjne, produkty, usługi czy
                    komercyjne strony internetowe
                  </li>
                </ul>
              </li>
            </ul>
            <h2>VI. Gromadzenie danych o Usługobiorcach</h2>
            <p>
              W celu prawidłowego świadczenia usług przez Serwis, zabezpieczenia
              prawnego interesu Usługodawcy oraz w celu zapewnienia zgodności
              działania Serwisu z obowiązującym prawem, Usługodawca za
              pośrednictwem Serwisu gromadzi i przetwarza niektóre dane o
              Użytkownikach.
            </p>
            <p>
              W celu prawidłowego świadczenia usług, Serwis wykorzystuje i
              zapisuje niektóre anonimowe informacje o Usługobiorcy w plikach
              cookies.
            </p>
            <p>
              Zakres, cele, sposób oraz zasady przetwarzania danych dostępne są
              w załącznikach do Regulaminu: &#8222;
              <a href="https://naszechoinki.pl/rodo">
                Obowiązek informacyjny RODO
              </a>
              &#8221; oraz w &#8222;
              <a href="https://naszechoinki.pl/polityka-prywatnosci">
                Polityce prywatności
              </a>
              &#8222;, stanowiących integralną część Regulaminu.
            </p>
            <ul>
              <li>
                <em>Dane zbierane automatycznie:</em>
                <br />
                Do sprawnego działania Serwisu oraz do statystyk zbieramy
                automatycznie niektóre dane o Usługobiorcy. Do danych tych
                należą:
                <ul>
                  <li>Adres IP</li>
                  <li>Typ przeglądarki</li>
                  <li>Rozdzielczość ekranu</li>
                  <li>Przybliżona lokalizacja</li>
                  <li>Otwierane podstrony serwisu</li>
                  <li>Czas spędzony na odpowiedniej podstronie serwisu</li>
                  <li>Rodzaj systemu operacyjnego</li>
                  <li>Adres poprzedniej podstrony</li>
                  <li>Adres strony odsyłającej</li>
                  <li>Język przeglądarki</li>
                  <li>Predkość łącza internetowego</li>
                  <li>Dostawca usług internetowych</li>
                  <li>
                    Anonimowe dane demograficzne na podstawie danych Google
                    Analytics:{" "}
                    <ul>
                      <li>Płeć</li>
                      <li>Wiek</li>
                      <li>Zainteresowania</li>
                    </ul>
                  </li>
                  <li>
                    Anonimowe dane niezbędne do serwowania reklam:{" "}
                    <ul>
                      <li>Dane związane z remarketingiem</li>
                      <li>
                        Dane związane z raportowaniem o wyświetlanych reklamach
                      </li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Powyższe dane uzyskiwane są poprzez skrypt Google Analytics i
                  są anonimowe.
                </p>
              </li>
              <li>
                <em>Dane zbierane podczas rejestracji:</em>
                <br />
                Nazwa użytkownika, imię i nazwisko, adres e-mail
                <p>
                  W przypadku Usługobiorców zalogowanych (posiadających konto w
                  Serwisie), w plikach cookies zapisywanych na urządzeniu
                  Usługobiorcy może być umieszczony identyfikator Usługobiorcy
                  powiązany z kontem Usługobiorcy
                </p>
              </li>
            </ul>
            <h2>VII. Prawa autorskie</h2>
            <ul>
              <li>
                Właścicielem Serwisu oraz praw autorskich do serwisu jest
                Usługodawca.
              </li>
              <li>
                Część danych zamieszczonych w Serwisie są chronione prawami
                autorskimi należącymi do firm, instytucji i osób trzecich,
                niepowiązanych w jakikolwiek sposób z Usługodawcą, i są
                wykorzystywane na podstawie uzyskanych licencji, lub opartych na
                licencji darmowej.
              </li>
              <li>
                Na podstawie Ustawy z dnia 4 lutego 1994 o prawie autorskim
                zabrania się wykorzystywania, kopiowania, reprodukowania w
                jakiejkolwiek formie oraz przetrzymywania w systemach
                wyszukiwania z wyłączeniem wyszukiwarki Google, Bing, Yahoo,
                NetSprint, DuckDuckGo, Facebook oraz LinkedIn jakichkolwiek
                artykułów, opisów, zdjęć oraz wszelkich innych treści,
                materiałów graficznych, wideo lub audio znajdujących się w
                Serwisie bez pisemnej zgody lub zgody przekazanej za pomocą
                Komunikacji Drogą Elektroniczną ich prawnego właściciela.
              </li>
              <li>
                Zgodnie z Ustawą z dnia 4 lutego 1994 o prawie autorskim
                ochronie nie podlegają proste informacje prasowe, rozumiane jako
                same informacje, bez komentarza i oceny ich autora. Autor
                rozumie to jako możliwość wykorzystywania informacji z
                zamieszczonych w serwisie tekstów, ale już nie kopiowania
                całości lub części artykułów o ile nie zostało to oznaczone w
                poszczególnym materiale udostępnionym w Serwisie.
              </li>
            </ul>
            <h2>VIII. Zmiany Regulaminu</h2>
            <ul>
              <li>
                Wszelkie postanowienia Regulaminu mogą być w każdej chwili
                jednostronnie zmieniane przez Usługodawcę, bez podawania
                przyczyn.
              </li>
              <li>
                Informacja o zmianie Regulaminu będzie rozsyłana Drogą
                Elektroniczną do Usługobiorców zarejestrowanych w Serwisie.
              </li>
              <li>
                W przypadku zmiany Regulaminu jego postanowienia wchodzą w życie
                natychmiast po jego publikacji dla Usługobiorców
                nieposiadających konta w Serwisie.
              </li>
              <li>
                W przypadku zmiany Regulaminu jego postanowienia wchodzą w życie
                z 7-dniowym okresem przejściowym dla Usługobiorców posiadających
                konta w Serwisie zarejestrowane przez zmianą Regulaminu.
              </li>
              <li>
                Traktuje się iż każdy Usługobiorca, kontynuujący korzystanie z
                Serwisu po zmianie Regulaminu akceptuje go w całości.
              </li>
            </ul>
            <h2>IX. Postanowienia końcowe</h2>
            <ul>
              <li>
                Usługodawca nie odpowiada w żaden sposób, jak tylko pozwalają na
                to obowiązujące przepisy prawa, za treści przekazywane i
                publikowane w Serwisie przez Usługobiorców, za ich prawdziwość,
                rzetelność, autentyczność czy wady prawne.
              </li>
              <li>
                Usługodawca dokona wszelkich starań by usługi Serwisu były
                oferowane w sposób ciągły. Nie ponosi on jednak żadnej
                odpowiedzialności za zakłócenia spowodowane siłą wyższą lub
                niedozwoloną ingerencją Usługobiorców, osób trzecich czy
                działalnością zewnętrznych automatycznych programów.
              </li>
              <li>
                Usługodawca zastrzega sobie prawo do zmiany jakichkolwiek
                informacji umieszczonych w Serwisie w wybranym przez Usługodawcę
                terminie, bez konieczności uprzedniego powiadomienia
                Usługobiorców korzystających z usług Serwisu.
              </li>
              <li>
                Usługodawca zastrzega sobie prawo do czasowego, całkowitego lub
                częściowego wyłączenia Serwisu w celu jego ulepszenia, dodawania
                usług lub przeprowadzania konserwacji, bez wcześniejszego
                uprzedzania o tym Usługobiorców.
              </li>
              <li>
                Usługodawca zastrzega sobie prawo do wyłączenia Serwisu na
                stałe, bez wcześniejszego uprzedzania o tym Usługobiorców.
              </li>
              <li>
                Usługodawca zastrzega sobie prawo do dokonania cesji w części
                lub w całości wszelkich swoich praw i obowiązków związanych z
                Serwisem, bez zgody i możliwości wyrażania jakichkolwiek
                sprzeciwów przez Usługobiorców.
              </li>
              <li>
                Obowiązujące oraz poprzednie Regulaminy Serwisu znajduję się na
                tej podstronie pod aktualnym Regulaminem.
              </li>
              <li>
                We wszelkich sprawach związanych z działalnością Serwisu należy
                kontaktować się z Usługodawcę korzystając z jednej z poniższych
                form kontaktu:
                <ul>
                  <li>
                    Używając formularza kontaktowego dostępnego w Serwisie
                  </li>
                  <li>
                    Wysyłając wiadomość na adres e-mail:
                    choinkibednarz@gmail.com
                  </li>
                  <li>
                    Poprzez połączenie telefoniczne z numerem: +48 604 771 938
                    oraz +48 696 443 291
                  </li>
                </ul>
                Kontakt przy użyciu wskazanych środków komunikacji wyłącznie w
                sprawach związanych z prowadzonym Serwisem.
              </li>
            </ul>
          </article>
        </>
      </Container>
    </section>
  );
}
