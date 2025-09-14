// .obsidian/scripts/dailyLog.js
// Creates today's Daily_Logs/YYYY-MM-DD.md with baseline content if missing.
async function dailyLog(tp) {
  try {
    const vault = app.vault;
    const adapter = vault.adapter;
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const dir = "Daily_Logs";
    const filename = `${dir}/${dateStr}.md`;

    // Ensure folder exists
    if (!(await adapter.exists(dir))) {
      await vault.createFolder(dir);
    }

    if (!(await adapter.exists(filename))) {
      const content = `---
date: ${dateStr}
pillar: daily
nodes:
  academics: 0
  fitness: 0
  recovery: 0
layers:
  academics: 0
  fitness: 0
  recovery: 0
connections:
  academics: 0
  fitness: 0
  recovery: 0
done:
  morning: false
  midday: false
  evening: false
---

# Daily Log — ${dateStr}

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
      await vault.create(filename, content);
      new Notice(`Daily log created: ${filename}`);
    } else {
      // Optionally open today's note if it already exists
      // const leaf = app.workspace.getLeaf(true);
      // await leaf.openFile(await vault.getAbstractFileByPath(filename));
      console.log("Daily log already exists:", filename);
    }
  } catch (e) {
    console.error("dailyLog error:", e);
    new Notice("dailyLog error — check console");
  }
}

module.exports = { dailyLog };
