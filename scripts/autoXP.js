// scripts/autoXP.js
// Auto-update XP whenever a Daily_Logs note is modified.

async function ensureXpUpdaterLoaded() {
  if (!window.__opobs_xpUpdater) {
    try {
      const mod = await app.plugins.plugins["templater-obsidian"]
        .templater
        .user_functions.import_file("scripts/xp_updater.js");
      window.__opobs_xpUpdater = mod && (mod.updateXP || mod.default || mod);
    } catch (e) {
      console.error("[autoXP] Could not load xp_updater.js", e);
    }
  }
  return window.__opobs_xpUpdater;
}

async function handleModify(file) {
  try {
    if (!file || !file.path) return;
    if (!file.path.startsWith("Daily_Logs/") || !file.path.endsWith(".md")) return;

    const upd = await ensureXpUpdaterLoaded();
    if (!upd) return;

    await upd({ app, file });
    console.log("[autoXP] XP updated for", file.path);
  } catch (e) {
    console.error("[autoXP] modify error", e);
  }
}

async function autoXP() {
  if (window.__opobs_autoXP_registered) return "autoXP already active";
  window.__opobs_autoXP_registered = true;

  app.vault.on("modify", handleModify);
  console.log("[autoXP] listener registered");
  return "autoXP registered";
}

module.exports = { autoXP };
