# OLE | Interaktiver Proof of Concept

Lauffähige React-/TypeScript-Demo mit Tailwind CSS und Recharts. **Keine Produktionsanwendung.** Alle Identitäten, HIS-Daten, Auswertungen und KI-Vorschläge sind fiktiv/simuliert.

## Voraussetzungen

- Node.js 20.19+ oder 22+
- npm und Internetzugang für das erstmalige Installieren der Projekt-Abhängigkeiten

## Startanleitung

```bash
npm install
npm run dev
```

Danach im Browser die von Vite angezeigte Adresse öffnen (gewöhnlich **http://localhost:5173**). Keine API-Keys oder weiteren Zugangsdaten erforderlich.

Produktions-Bundle lokal erstellen:

```bash
npm run build
npm run preview
```

## Bedienung

1. Auf der Startseite per Klick als **Studierende**, **Lehrende** oder **Qualitätsmanagement** anmelden (simuliertes Login).
2. **Studierende:** eine aktive Evaluation starten, Fragen mittels 1–5-Skala und Freitext ausfüllen und anonym absenden. Derselbe Demo-Studierende kann denselben Kurs im aktuellen Browser nicht erneut evaluieren.
3. **Qualitätsmanagement:** Kurs wählen, Syllabus einfügen bzw. TXT/MD/CSV hochladen, **KI-Fragen generieren**, bearbeiten, freigeben; Termine und Veröffentlichung steuern; Ergebnisse freigeben; Hinweise zu Antwortmustern ansehen.
4. **Lehrende:** zwischen zugeordneten Kursen wechseln, Syllabus bearbeiten und vom QM freigegebene Auswertungen betrachten.
5. Unter **Demo zurücksetzen** werden Änderungen und Teilnahmemarkierungen gelöscht.

## Projektstruktur

```text
src/
  App.tsx                 Shell, Navigation, Rollenauswahl, State
  main.tsx                Einstiegspunkt
  index.css               Tailwind und UI-Basisklassen
  types.ts                Fachliche Datentypen
  views/
    Login.tsx             Login und Rollenauswahl
    Student.tsx           Übersicht, Fragebogen, Bestätigung
    QM.tsx                Syllabus, Fragen, Termine, Auswertung, Flags
    Teacher.tsx           Lehrendenportal, Ergebnisse
  components/
    UI.tsx                Wiederverwendbare Status-/UI-Komponenten
    Charts.tsx            Aggregation und responsive Diagramme
  lib/
    seed.ts               Fiktive HIS-/Kurs-/Antwortdaten
    ai.ts                 Austauschbarer AIService + Mock-Adapter
    storage.ts            Persistenz / separate Teilnahmeberechtigung
```

## KI-Service austauschen

`src/lib/ai.ts` enthält das Interface `AIService` mit `generateQuestions()` und `detectPatterns()`. Aktuell erzeugt `mockAI` plausible syllabusbezogene Fragen anhand von Schlüsselwörtern; Prüfhinweise werden anhand transparenter Heuristiken erzeugt. Für echte KI-Anbindung einen Server-Adapter implementieren und **Server-seitig** autorisieren, protokollieren und datenschutzrechtlich prüfen. Keine API-Keys im Frontend einbauen. Alle Vorschläge benötigen vor der Veröffentlichung eine QM-Freigabe.

## Datenhaltung, Trennung und Grenzen

- `localStorage['ole-poc-data-v1']`: Kurse, freigegebene Fragen, anonyme Evaluationseingaben. `Submission` enthält nur zufällige Antwort-ID, Kurs-ID, Zeitstempel und Antwortinhalt – **keine Person/Studierenden-ID**.
- `localStorage['ole-poc-participation-v1']`: gesonderte Zuordnung aus Demo-Benutzerkennung und Kurs zu einem Teilnahme-Boolean. Diese Markierung ist nicht mit einer `Submission`-ID verknüpft.
- Das ist **keine kryptografische oder echte Anonymisierung**: Freitext kann selbstidentifizierende Angaben enthalten; Zeitstempel können korrelieren. Browser-Speicher kann manipuliert/gelöscht werden. Keine echten personenbezogenen Daten eingeben.
- Die Teilnahmesperre gilt nur im selben Browser/Profil. Echter Schutz vor Mehrfachteilnahme, HIS-Anbindung, SSO, Autorisierung, Betrugsprävention, Löschfristen, Audit-Trails, K-Anonymitäts-/Mindestfallzahllogik und DSGVO-konforme Speicherung erfordern ein Backend und ein geprüftes Datenschutzkonzept.
- Zum Hochladen werden **TXT, MD, CSV bis 1 MB** unterstützt, **kein PDF/DOCX**; paste von Syllabus-Text ist möglich.
- Die Diagramme basieren auf wenigen fiktiven Seed-Antworten. KI-Flagging ist nur ein manueller Prüfhilweis und darf keine automatische Disqualifikation auslösen.
- Das Erscheinungsbild ist ein eigenständiges Demo-Design mit den Farben Grün (#91C32D), Türkis (#42B9D0) und Blau (#0064A6). Es stellt keine Zugehörigkeit zu einer bestimmten Bildungseinrichtung dar.

## Tests

Siehe [docs/TESTSZENARIEN.md](docs/TESTSZENARIEN.md) für fünf vollständige Akzeptanztests samt erwartetem Ergebnis.

## Build-/Verifikationsstand

TypeScript-/TSX-Syntax aller Quelltexte wurde mit dem lokalen TypeScript-Compiler überprüft. In der Erstellungsumgebung war `registry.npmjs.org` wegen DNS-Fehler (`EAI_AGAIN`) nicht erreichbar; deshalb konnten `npm install`, `npm run build` und ein Browser-End-to-End-Test **hier nicht durchgeführt** werden. Das Projekt ist so angelegt, dass es in einer regulären Node-Umgebung über obige Befehle installiert und gestartet werden kann.
