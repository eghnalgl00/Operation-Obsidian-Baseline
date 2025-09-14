# Weekly Add‑On (Operation Obsidian)

This pack adds:
- `.obsidian/scripts/weeklyReset.js`
- `Templates/Startup_Auto_Weekly_Reset.md`

## How to install
1) Unzip and drop the folders into your vault root (merge with existing `.obsidian` and `Templates`).
2) Obsidian → Settings → **Community plugins → Templater**:
   - Script files folder: `.obsidian/scripts`
   - **Startup templates** → add: `Templates/Startup_Auto_Weekly_Reset.md`
3) Optional hotkey:
   - Settings → **Templater** → *Template hotkeys* → add `Templates/Startup_Auto_Weekly_Reset.md` and bind `Cmd/Ctrl+Alt+W`.

**What it does**
- On Sundays (or on demand), creates `Weekly_Reviews/YYYY-WW.md` with a review scaffold.
- Non‑destructive: it does **not** delete or reset anything automatically.
