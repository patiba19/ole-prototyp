# OLE-Prototyp auf GitHub Pages bereitstellen

**Keine Installation auf dem Rechner notwendig.** Das Build erfolgt in GitHub Actions. Besucher benötigen nur einen Browser.

## Veröffentlichen

1. Bei https://github.com/new anmelden und ein Repository erstellen, z. B. `ole-prototyp`. Für GitHub Free das Repository **Public** wählen (damit auch Pages verfügbar ist). Keine zusätzlichen Dateien automatisch generieren.
2. ZIP entpacken. **Die Inhalte** des Ordners hochladen, sodass `package.json`, `index.html`, `vite.config.ts`, `src/` und `.github/workflows/deploy.yml` direkt im Stamm des Repositorys liegen (nicht in einem Unterordner). GitHub: `Add file` > `Upload files`, Dateien per Drag-and-drop, `Commit changes`. Versteckte Ordner wie `.github` ggf. separat über die Weboberfläche anlegen (siehe unten).
3. `Settings` > `Pages` > `Build and deployment` > `Source: GitHub Actions` auswählen.
4. `Actions` > `OLE auf GitHub Pages veröffentlichen` öffnen. Falls noch kein erfolgreicher Lauf erfolgt ist, `Run workflow` auslösen. Beim ersten Push wird der Workflow normalerweise automatisch gestartet.
5. Nach erfolgreichem Lauf erscheint die URL unter `Settings` > `Pages`, üblicherweise `https://BENUTZERNAME.github.io/ole-prototyp/`.

## Wichtig: Workflow prüfen

Die Datei `.github/workflows/deploy.yml` muss exakt an diesem Pfad existieren. Falls sie nicht mit hochgeladen wurde: GitHub > `Add file` > `Create new file` > als Dateiname `.github/workflows/deploy.yml` eingeben und den Inhalt aus dem ZIP hineinkopieren.

Die Vite-Konfiguration erkennt bei GitHub Actions automatisch den Repository-Namen und setzt den Pfad für CSS/JavaScript korrekt. Die App benutzt keine URL-basierte Router-Navigation und benötigt daher keine SPA-404-Umleitung.

## Hinweise für den Test

- Login, HIS-Daten und KI sind simuliert.
- Änderungen, Antworten und Teilnahmesperren bleiben **nur im jeweiligen Browser** gespeichert; kein gemeinsamer Datenbestand zwischen Testpersonen.
- Die Website ist öffentlich erreichbar, auch wenn ein privates Repository in einem unterstützten Tarif benutzt würde. Keine echten personenbezogenen oder sensiblen Daten verwenden.
- Für gemeinsame, persistent gespeicherte Umfragen oder echten Zugriffsschutz ist ein Backend nötig.
- GitHub Pages ist ein statisches Hosting und führt keine serverseitige KI oder Authentifizierung aus.

## Fehlerbehebung

- **Leere Seite:** Ist `vite.config.ts` vorhanden? Läuft die Bereitstellung über `GitHub Actions`? Browser-Konsole auf 404 bei Assets prüfen.
- **Workflow nicht gefunden:** Liegt `.github/workflows/deploy.yml` im Repository (nicht unter `ole-prototyp/`)?
- **Build-Fehler:** Im Tab `Actions` auf den fehlgeschlagenen Lauf und den Schritt klicken. `npm install` erfordert Internetzugang auf GitHub, aber nicht auf deinem Rechner.
- **Kein Pages-Link:** Unter `Settings` > `Pages` prüfen, ob GitHub Actions als Quelle eingestellt ist.
