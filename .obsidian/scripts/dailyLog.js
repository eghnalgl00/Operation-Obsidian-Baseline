// .obsidian/scripts/dailyLog.js
// Exported as a single function for Templater: <%* await tp.user.dailyLog(tp) %>
// Creates today's Daily Log file if missing.

function two(n){return n<10?`0${n}`:`${n}`;}

async function dailyLog(tp) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = two(today.getMonth()+1);
  const dd = two(today.getDate());
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const folder = "Daily_Logs";
  const filename = `${folder}/${dateStr}.md`;

  // Ensure folder exists
  let folderAbstract = app.vault.getAbstractFileByPath(folder);
  if (!folderAbstract) await app.vault.createFolder(folder);

  // If exists, bail
  if (app.vault.getAbstractFileByPath(filename)) {
    new Notice(`Daily log already exists: ${dateStr}`);
    return;
  }

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

  await app.vault.create(filename, content);
  new Notice(`Created daily log: ${dateStr}`);

  // Open it
  const f = app.vault.getAbstractFileByPath(filename);
  if (f) app.workspace.getLeaf(true).openFile(f);
}

module.exports = dailyLog;
