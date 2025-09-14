/**
 * Operation Obsidian — Auto Daily Log
 * Place this file in: .obsidian/scripts/dailyLog.js
 * Run via Templater: <%* await tp.user.dailyLog() %>
 */
async function dailyLog() {
  // --- Config (edit if you want) ---
  const AUTO_OPEN_AFTER_CREATE = false; // set true to auto-open today's note after creation
  const LOG_FOLDER = "Daily_Logs";

  // --- Date strings ---
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const { vault, fileManager, workspace, metadataCache } = app;

  // Ensure folder exists
  async function ensureFolder(folderPath) {
    try {
      const folder = metadataCache.getFirstLinkpathDest(folderPath, "");
      if (!folder) {
        await vault.createFolder(folderPath);
      }
    } catch (e) {
      // Folder may already exist; ignore "already exists" errors
      if (!String(e).includes("already exists")) throw e;
    }
  }

  const folder = LOG_FOLDER;
  const filename = `${folder}/${dateStr}.md`;

  // YAML frontmatter for Dataview/automation
  const yaml = [
    "---",
    `date: ${dateStr}`,
    "pillar: daily",
    "nodes:",
    "  academics: 0",
    "  fitness: 0",
    "  recovery: 0",
    "layers:",
    "  academics: 0",
    "  fitness: 0",
    "  recovery: 0",
    "connections:",
    "  academics: 0",
    "  fitness: 0",
    "  recovery: 0",
    "done:",
    "  morning: false",
    "  midday: false",
    "  evening: false",
    "---",
    ""
  ].join("\n");

  const body = `# Daily Log — ${dateStr}

## Schedule
- [ ] Morning → Academics depth block (Recursion/Probability drills)
- [ ] Midday → Fitness — Program X strength session
- [ ] Evening → Recovery — LISS walk + Car‑tech surprise

## Academics
- [ ] Annotated solution: one core concept (depth‑first)
- [ ] Problem set: 5 drills (log wins + drift)
- Links: CS221/CS50/MIT videos (as needed)

## Fitness
- [ ] Program X — Dumbbell + bodyweight (form/tempo focus)
- [ ] Optional finisher: 6×30s fast / 30s easy
- Nutrition: protein‑forward meals

## Recovery
- [ ] 20–30′ LISS walk (evening)
- [ ] Car‑tech surprise (turbo vs. supercharger quick note)
- Dining hall: note high‑protein picks

## Externals
- Erasmus: collect next deadline link
- Hackathons: shortlist 1 opportunity

## Creativity
- [ ] Log one mini‑project idea (2 lines max)
`;

  const content = yaml + body;

  try {
    await ensureFolder(folder);

    // If file already exists, do nothing (idempotent)
    const existing = metadataCache.getFirstLinkpathDest(filename, "");
    if (existing) {
      console.log(`[dailyLog] Already exists: ${filename}`);
      if (AUTO_OPEN_AFTER_CREATE) await workspace.getLeaf(true).openFile(existing);
      return "exists";
    }

    const tfile = await vault.create(filename, content);
    new Notice(`Daily log created: ${filename}`);
    console.log(`[dailyLog] Created: ${filename}`);
    if (AUTO_OPEN_AFTER_CREATE) await workspace.getLeaf(true).openFile(tfile);
    return "created";
  } catch (e) {
    console.error("[dailyLog] error:", e);
    new Notice("dailyLog error — see console");
    return "error";
  }
}

module.exports = { dailyLog };
