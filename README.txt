# Operation Obsidian — Automation Pack (ALL)

This pack gives you **one‑shot** automation for:
- Daily log creation
- XP update (booleans + pillar activity counts to YAML)
- Rescheduling unchecked Schedule items to tomorrow

## What’s inside
- `.obsidian/scripts/dailyLog.js`
- `.obsidian/scripts/updateXP.js`
- `.obsidian/scripts/reschedule.js`
- `Templates/Startup_Auto_Daily_Log.md`
- `Templates/Startup_Auto_XP.md`
- `Templates/Startup_Auto_Reschedule.md`
- `Templates/Run_Daily_Log_Now.md`
- `Templates/Run_XP_Now.md`
- `Templates/Run_Reschedule_Now.md`

## Install
1) Unzip this into the **root of your vault** (merge folders if asked).
2) Obsidian → **Settings → Community plugins → Templater**:
   - **Script files folder location:** `scripts`
   - **Startup templates:** add
     - `Templates/Startup_Auto_Daily_Log.md`
     - `Templates/Startup_Auto_XP.md`
     - `Templates/Startup_Auto_Reschedule.md`
3) Optional hotkeys:
   - Bind a key to Templater “Replace templates in the active file” and use
     - `Templates/Run_Daily_Log_Now.md`
     - `Templates/Run_XP_Now.md`
     - `Templates/Run_Reschedule_Now.md`

## Notes
- Dataview tables will update after any edit/tab switch.
- YAML is written with native booleans and numbers (no JSON strings).
- If anything fails, open **View → Toggle Developer Tools → Console** and look for errors from `dailyLog`, `updateXP`, or `reschedule`.
