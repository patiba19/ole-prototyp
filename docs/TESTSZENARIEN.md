# Fünf konkrete Akzeptanztests

**Ausgangszustand:** „Demo zurücksetzen“ verwenden und die Startansicht aufrufen. Bei Bedarf Browser-LocalStorage leeren. Keine realen Daten benutzen.

## 1. Evaluation als Studierende vollständig durchführen

**Vorbedingung:** Studierendenrolle auswählen, Kurs „User Experience Design“ ist aktiv.

1. „Evaluation starten“ anklicken.
2. Erste Frage mit **4** beantworten; „Weiter“ anklicken.
3. Alle weiteren Skalenfragen bewerten; zur Freitextfrage navigieren.
4. Eine aussagekräftige Antwort eingeben und „Anonym absenden“ betätigen.
5. Die Bestätigungsansicht prüfen und zur Übersicht zurückkehren.

**Erwartung:** Fortschrittsbalken entwickelt sich von 0 auf 100 %, leere Pflichtantwort blockiert das Vorwärtsnavigieren/Absenden; Bestätigungsansicht erscheint; Kurs als „Abgeschlossen“ markiert; im QM erhöht sich die Antwortanzahl um 1. In `ole-poc-data-v1` hat die neue Submission keine Benutzerkennung.

## 2. Mehrfachteilnahme verhindert; Rollenwechsel

**Vorbedingung:** Test 1 abgeschlossen.

1. In der Studierendenübersicht versuchen, „User Experience Design“ erneut zu starten.
2. Über die Seitenleiste „Rolle wechseln“, danach wieder „Studierende“ auswählen.
3. Browserseite aktualisieren und den Status prüfen.

**Erwartung:** „Teilgenommen“ ist deaktiviert, keine zweite Abgabe möglich, auch nach Rollenwechsel und Reload. Ein anderer aktiver Kurs bleibt evaluierbar. **Limit:** In einem neuen Browserprofil ist die Demo-Sperre nicht vorhanden.

## 3. KI-Vorschläge, Redigieren und QM-Freigabe

**Vorbedingung:** QM-Rolle, Kurs „Agiles Projektmanagement“ auswählen.

1. Syllabus um Begriffe „Scrum“, „Kanban“, „Retrospektiven“, „Projektbericht“ ergänzen.
2. „KI-Fragen generieren“ wählen.
3. Im Fragen-Tab einen Fragetext ändern und eine zusätzliche Skalenfrage hinzufügen.
4. Inhalt ausfüllen und „Fragen freigeben“ drücken.
5. Im Zeitraum-Tab Beginn auf heute oder früher setzen und „Evaluation veröffentlichen“, falls nicht schon veröffentlicht.
6. Als Studierende anmelden und den Kurs öffnen.

**Erwartung:** Passende Vorschläge entstehen, Änderungen bleiben erhalten, nach Freigabe wird genau die bearbeitete Liste im Studierendenfragebogen angezeigt. Vor Freigabe dürfen Entwürfe nicht im Fragebogen erscheinen.

## 4. Termingrenzen, Pause und Ergebnisfreigabe

**Vorbedingung:** QM-Rolle, Kurs „Data Analytics & Visualization“ auswählen.

1. „Evaluation pausieren“ klicken, dann als Studierende starten versuchen.
2. Pause im QM aufheben und Zeitraum auf aktuelle Daten prüfen.
3. Als Lehrende prüfen, dass bei nicht freigegebenen Kursen keine Auswertung angezeigt wird (für „Agiles Projektmanagement“), danach zurück zum QM wechseln.
4. Bei „Agiles Projektmanagement“ die Ergebnisse freigeben und als Lehrende erneut öffnen.

**Erwartung:** Pausierte Kurse nicht startbar; nach Aufheben wieder startbar, wenn veröffentlicht und innerhalb des Zeitraums. Bis zur Freigabe bleibt Ergebnisansicht gesperrt; danach werden ggf. „0 Antworten“/leeres Diagramm oder neue Antworten angezeigt.

## 5. Aggregierte Auswertung und vorsichtige KI-Hinweise

**Vorbedingung:** QM-Rolle, „User Experience Design“, Tab „Ergebnisse & Hinweise“.

1. Kennzahlen, Balkendiagramm und Freitextantworten vergleichen.
2. Unter „KI-Hinweise zur Antwortqualität“ die markierte Seed-Antwort mit identischen Bewertungen und kurzem Freitext finden.
3. Nach einer zusätzlichen Studierenden-Evaluation die Ergebniszahlen erneut prüfen.
4. Demo zurücksetzen und verifizieren, dass die Ausgangsanzahl wiederhergestellt ist.

**Erwartung:** Durchschnitte werden aus den vorhandenen numerischen Antworten berechnet; Antworten erscheinen ohne Benutzer-ID. KI-Hinweise erläutern nur ein mögliches auffälliges Muster und disqualifizieren keine Abgabe. Reset stellt den Seed-Zustand her.
