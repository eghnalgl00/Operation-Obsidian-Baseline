# Operation Obsidian — Templater Auto Daily Pack

## What’s in this zip
- `.obsidian/scripts/dailyLog.js` → Templater user script that creates today's Daily Log if missing.
- `Templates/Daily_Log_Template.md` → the template the script copies from.
- `Templates/Cockpit_Insert_XP_Tracker.md` → copy-paste panel to show XP/Continuity in Cockpit.

## One-time setup
1) Obsidian → Settings → Community plugins → Install & enable **Templater**.
2) Obsidian → Settings → Templater:
   - **Template folder** → set to your `Templates` folder in this vault.
   - **User Script Commands** → add `.obsidian/scripts/dailyLog.js`.
   - **Run user script on vault open** → enable, select `dailyLog.js`.

> Folder assumptions: your daily logs live in `Daily_Logs/` at the vault root.

## Daily behavior
- On vault open, if `Daily_Logs/YYYY-MM-DD.md` does not exist, it will be created from `Templates/Daily_Log_Template.md`.
- Cockpit panels that query `date = today` will immediately see it.

## Optional — add XP/Continuity to Cockpit
- Open `Templates/Cockpit_Insert_XP_Tracker.md` and copy the **dataviewjs** block into your `Cockpit.md` (under Live Panels).
- Ensure **Dataview** plugin is enabled.
