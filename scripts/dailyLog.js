// dailyLog.js (FINAL)
// Usage from Templater: <%* await tp.user.dailyLog(tp) %>
// Creates Daily_Logs/YYYY-MM-DD.md if missing and opens it.

async function dailyLog(tp) {
  try {
    const today = window.moment().format("YYYY-MM-DD");
    const filename = `Daily_Logs/${today}.md`;

    const content = `---
date: ${today}
pillar: daily
xp:
  academics: 0
  fitness: 0
  recovery: 0
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

# Daily Log — ${today}

## Schedule
- [ ] Morning → Academics depth block (Recursion/Probability drills)
- [ ] Midday → Fitness — Program X strength session
- [ ] Evening → Recovery — LISS walk + Car-tech surprise

## Academics
- [ ] Annotated solution: one core concept (depth-first)
- [ ] Problem set: 5 drills (log wins + drift)
- Links: CS221/CS50/MIT videos (as needed)

## Fitness
- [ ] Program X — Dumbbell + bodyweight (form/tempo focus)
- [ ] Optional finisher: 6×30s fast / 30s easy
- Nutrition: protein-forward meals

## Recovery
- [ ] 20–30′ LISS walk (evening)
- [ ] Car-tech surprise (turbo vs. supercharger quick note)
- Dining hall: note high-protein picks

## Externals
- Erasmus: collect next deadline link
- Hackathons: shortlist 1 opportunity

## Creativity
- [ ] Log one mini-project idea (2 lines max)

<!-- XP-START -->
XP Snapshot: pending
<!-- XP-END -->
`;

    const folder = "Daily_Logs";
    if (!app.vault.getAbstractFileByPath(folder)) {
      await app.vault.createFolder(folder);
    }

    if (!app.vault.getAbstractFileByPath(filename)) {
      const tfile = await app.vault.create(filename, content);
      const leaf = app.workspace.getLeaf(true);
      await leaf.openFile(tfile);
      new Notice(`Daily log created: ${filename}`);
    } else {
      console.log("Daily log exists:", filename);
    }

    return "";
  } catch (e) {
    console.error("dailyLog error:", e);
    new Notice("dailyLog error — check console");
    return "";
  }
}

module.exports = dailyLog;
