# 💻 Die Digitale Schmiede: Code-Krieg (The Digital Forge: Code War)

Dieses Konzept ist ein serverweites Hack-and-Protect-Meta-Game, bei dem User ihre eigenen digitalen **"Nodes"** aufbauen, sich täglich durch **Code-Aufgaben** verbessern und andere User im **PvP "hacken"** können, um Ressourcen zu stehlen und ihren Status zu erhöhen.

## 1. Überblick & Der WOW-Effekt

Die Idee: Jeder User ist ein Hacker, der eine **digitale NODE** (sein System/Basis) verteidigen und erweitern muss. Aktivität im Server wird in **Ressourcen** umgewandelt, die täglich investiert werden müssen, um die NODE zu härten oder Angriffe auf andere zu starten.

Der WOW-Faktor: Die User kämpfen um den Titel **"Server-Root"** und haben sichtbare, persistente **NODE-Visualisierungen** (über Emotes/Custom-Rollen), die ihren aktuellen Schutzstatus und ihr Angriffspotenzial sofort für alle sichtbar machen.

---

## 2. Kernmechanik: Die Digitale NODE

Jeder User startet mit einer **Basis-NODE (Level 1)**. Diese NODE hat drei Kern-Metriken, die täglich verwaltet werden müssen:

| Metrik | Zweck | Erhöhung durch... |
| :--- | :--- | :--- |
| 🛡️ **Schutz-Level (SHD)** | Definiert die Wahrscheinlichkeit, einen Hack-Angriff abzuwehren. | Investition von **Krypt-Tokens**. |
| 💥 **Angriffs-Stärke (ATK)** | Definiert die Wahrscheinlichkeit, einen Hack-Angriff erfolgreich durchzuführen. | Investition von **Datenblöcken**. |
| ⚙️ **Effizienz (EFF)** | Definiert die tägliche Ressourcengewinnung und die Abklingzeit der Befehle. | Tägliche **Code-Aufgaben (Quests)**. |

---

## 3. Der Tägliche Loop: Codieren und Ernten (Das MUSS)

Die User müssen täglich Aufgaben erledigen, um die für das Hacking benötigten Ressourcen zu generieren.

### A. Tägliche Ressourcen-Generierung

Die User erhalten Ressourcen durch normale Discord-Aktivität und spezielle Befehle:

1.  **Krypt-Tokens (KT):** Die **Hauptwährung**, generiert durch **Voice-Aktivität** (alle 15 Minuten) und Reaktionen.
2.  **Datenblöcke (DB):** Die **Angriffsressource**, generiert durch **Text-Aktivität** (alle 20 Nachrichten) und das Lösen von Rätseln.

### B. Die Tägliche Code-Aufgabe (Der MUSS-Faktor)

Jeder User erhält einmal täglich eine **`/coden`**-Aufgabe (z.B. "Simuliere eine Funktion, die eine zufällige Zahl generiert.").

* **Mechanik:** Der User gibt einen simplen, vordefinierten Befehl ein. Der Bot simuliert einen kurzen Ladevorgang und vergibt dann eine Belohnung (z.B. **+10 Effizienz, +5 DB**) **unabhängig von tatsächlichem Code-Wissen.**
* **Anreiz:** Wer die tägliche Aufgabe nicht löst, verliert **-5 Effizienz** und reduziert damit die Erträge der nächsten Tages (Starker Anreiz zur täglichen Beteiligung).

### C. Der Bug-Report (Community-Interaktion)

Regelmäßig (z.B. alle 8 Stunden) postet der Bot einen kleinen, zufälligen **"Log-Fehler"** in einem bestimmten Kanal (z.B. "Fehler: ID-404 in Kanal #allgemein").

* Der erste User, der den Fehler in einer speziellen Syntax (z.B. `/fix ID-404`) meldet, erhält einen großen **Effizienz-Boost** und einen kleinen **KT-Bonus**. (Fördert schnelles, aufmerksames Chat-Lesen).

---

## 4. Kernfunktion: Der Hack-Angriff (Das Fesselnde)

User nutzen ihre gesammelten Ressourcen, um andere User (NODEs) anzugreifen.

### A. Der Standard-Angriff (Bot-gesteuert)

1.  **Angriffsbefehl:** `/hack [Ziel-User] [Einsatz DB]`
2.  **Ressourceneinsatz:** Der Angreifer muss mindestens **50 Datenblöcke (DB)** einsetzen, um den Angriff zu starten. Der Einsatz erhöht die Angriffs-Stärke (ATK) temporär.
3.  **Verteidigungsabzug:** Der Verteidiger-NODE verbraucht einen kleinen Teil seines aktuellen Schutz-Levels (SHD) als "Abwehrversuch".

### B. Die Ergebnisberechnung (Standard)

Das Ergebnis ist ein Rollenspiel-würfelartiger, rein algorithmischer Kampf (keine KI):

$$
\text{Erfolgswahrscheinlichkeit} = \frac{\text{Angreifer ATK}}{\text{Ziel SHD} + \text{Angreifer ATK}} \times 100\%
$$

* **Erfolg (Breach):** Der Angreifer stiehlt einen Prozentsatz der **Krypt-Tokens (KT)** des Ziels (z.B. 10-20%) und erhöht seinen eigenen SHD um 5%.
* **Misserfolg (Firewall):** Der Angreifer verliert **50% der eingesetzten DB** und verliert **-2 Effizienz** (Risiko!). Der Verteidiger erhält einen temporären **+5 SHD-Boost**.

### C. Manueller Code-Override (Injektions-Skripte - NEUE FUNKTION)

Der User kann entscheiden, den Bot zu umgehen und **manuell ein Skript** einzugeben. Dies erhöht das Risiko, aber auch die Belohnung.

1.  **Override-Befehl:** `/hack inject [Ziel-User] [Skript-Code]`
2.  **Das Injektions-Skript (Sehr einfache Syntax):** Das Skript verwendet eine extrem vereinfachte Syntax, die nur 5-7 Schlüsselwörter und Variablen erlaubt, um es für Nicht-Programmierer zugänglich zu machen. Es simuliert eine logische Abfolge (z.B. `IF [Bedingung] THEN [Aktion]`).
    * **Beispiel-Skript:** `IF (ZIEL_SHD < 100) AND (MEIN_ATK > 150) THEN BOOST ATK`
3.  **Belohnungsanpassung (Höherer Einsatz, Höhere Belohnung):**
    * **Erfolg (Advanced Breach):** Der Angreifer stiehlt **15-25% der KT** des Ziels (höher als Standard) und erhält zusätzlich **+1 Effizienz**.
    * **Misserfolg (Critical Failure):** Der Angreifer verliert **75% der eingesetzten DB** (höher als Standard) und verliert **-4 Effizienz** (höheres Risiko!).

**Anreiz:** Der manuelle Code-Override gibt dem User das Gefühl, die Kontrolle zu haben. Durch die logische Verknüpfung von SHD und ATK können sie ihre Erfolgschance maximieren, wenn sie sich sicher sind.

---

## 5. Erweiterte Funktionen (Mehr Tiefe)

### A. Modulare Upgrades (Der Ausbau)

User können ihre KT investieren, um dauerhafte Module für ihre NODE freizuschalten.

| Modul | Kosten (KT) | Effekt |
| :--- | :--- | :--- |
| **Netzwerk-Schild** | 500 KT | Dauerhafter Bonus von **+10 SHD**. |
| **Botnet-Controller** | 750 KT | Erhöht den maximalen DB-Einsatz pro Angriff. |
| **Proxy-Frequenz** | 1000 KT | Reduziert die Abklingzeit der täglichen Code-Aufgabe um 1 Stunde. |

### B. Server-Allianzen (Soziale Komponente)

User können sich zu temporären **Programmier-Allianzen** (Gildensystem) zusammenschließen:

* **Sharing:** Allianzen können Ressourcen bündeln, um große Upgrades (z.B. einen Allianz-Shield) für alle Mitglieder zu kaufen.
* **Targeting:** Hacks gegen Allianz-Mitglieder sind verboten oder mit einem drastischen SHD-Malus belegt.
* **Weekly Raid:** Einmal pro Woche kann eine Allianz einen **"Server-Raid"** auf eine vordefinierte Bot-Ziel-NODE starten, um seltene kosmetische Belohnungen (z.B. **Antike Skripte** für einzigartige Chat-Titel) zu gewinnen.

---

## 6. Kosten-Effizienz

1.  **API-frei:** Das gesamte Spiel läuft über **lokale Bot-Logik** und **Firestore-Datenbanken** zur Speicherung von SHD, ATK und Inventar.
2.  **Einfache Mathematik:** Die Hack-Erfolgschance basiert auf einer einfachen **Verhältnisberechnung** (siehe Punkt 4.B).
3.  **Visualisierung:** NODE-Level und Status werden über **Discord-Rollen** oder **permanente, einzigartige Emoji/SVG-Anhänger** (die der Bot als Teil des Users anzeigen kann) visualisiert, was den "WOW-Faktor" ohne KI-Bildgenerierung erzeugt.