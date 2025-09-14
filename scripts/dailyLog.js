// dailyLog.js
// Templater user script: tp.user.dailyLog()
// Creates Daily_Logs/YYYY-MM-DD.md if it doesn't exist.

async function dailyLog(tp) {
  try {
    const today = window.moment().format("YYYY-MM-DD");
    const folder = "Daily_Logs";
    const filename = `${folder}/${today}.md`;

    if (!(await app.vault.adapter.exists(folder))) {
      await app.vault.createFolder(folder);
    }
    if (await app.vault.adapter.exists(filename)) {
      console.log(`Daily log already exists: ${filename}`);
      return;
    }

    const content = `---
date: ${"${today}"}
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

# Daily Log — ${"${today}"}

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
`;

    const tfile = await app.vault.create(filename, content);
    // Uncomment next line if you want it to auto-open:
    // await app.workspace.getLeaf(true).openFile(tfile);
    new Notice(`Daily log created: ${filename}`);
    console.log(`Created daily log: ${filename}`);
  } catch (e) {
    console.error("dailyLog error:", e);
    new Notice("dailyLog error — check console");
  }
}

module.exports = { dailyLog };
