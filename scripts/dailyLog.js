
// dailyLog.js
module.exports = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const fs = require('fs');
    const path = require('path');

    const logDir = path.join(app.vault.adapter.basePath, 'Daily_Logs');
    const logFile = path.join(logDir, `${dateStr}.md`);

    if (!fs.existsSync(logFile)) {
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
        fs.writeFileSync(logFile, content);
        console.log(`Created daily log: ${logFile}`);
    } else {
        console.log("Daily log already exists:", logFile);
    }
};
