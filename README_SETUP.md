# Operation Obsidian — Automation Pack (Templater)

Folders included:
- `scripts/` → JavaScript user scripts for Templater
  - `dailyLog.js` (creates today's Daily_Logs/YYYY-MM-DD.md if missing)
  - `updateXP.js` (demo updater; marks the note and can be extended)
- `Templates/` → Templater startup templates
  - `Startup_Auto_Daily_Log.md`
  - `Startup_Auto_XP.md`

## Setup (once)
1) Move **scripts** and **Templates** into the **root of your vault** (same level as `Daily_Logs/`). Do *not* put them inside `.obsidian`.
2) Obsidian → Settings → *Community plugins* → **Templater**:
   - **Script files folder location** → select the visible `scripts` folder.
   - **Startup templates** → add:
     - `Templates/Startup_Auto_Daily_Log.md`
     - `Templates/Startup_Auto_XP.md`
3) Command Palette → **Templater: Reload User Scripts**.
4) Test:
   - Command Palette → **Templater: Run template** → `Startup_Auto_Daily_Log` (should create today’s note).
   - Command Palette → **Templater: Run template** → `Startup_Auto_XP` (should show “XP updated successfully”).

You can bind a hotkey for `Templater: Run template` to quickly trigger `Startup_Auto_XP` during evening checkout.
