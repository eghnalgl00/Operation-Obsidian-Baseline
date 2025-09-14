// weeklyReset.js
// Creates a weekly review note on Sundays and (optionally) zeros counters.
// Safe: it only creates a file; it does not delete anything.

async function weeklyReset(app, tp) {
  try {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    // ISO week number helper
    const getWeek = (d) => {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
      return [d.getUTCFullYear(), weekNo];
    };

    const [y, w] = getWeek(now);
    const weekId = `${y}-W${String(w).padStart(2,'0')}`;
    const folder = "Weekly_Reviews";
    const filename = `${folder}/${weekId}.md`;

    // Ensure folder exists
    const adapter = app.vault.adapter;
    if (!(await adapter.exists(folder))) {
      await adapter.mkdir(folder);
    }

    if (await adapter.exists(filename)) {
      new Notice(`Weekly review already exists: ${filename}`);
      return;
    }

    const summary = `---
week: ${weekId}
created: ${now.toISOString()}
---

# Weekly Review — ${weekId}

## Snapshot
- Academics — nodes/layers/connections: <fill>
- Fitness — nodes/layers/connections: <fill>
- Recovery — nodes/layers/connections: <fill>

## Wins
- 

## Misses / Drift
- 

## Fixes for next week (3 bullets max)
- 

## Schedule Anchors (next week)
- Morning: 
- Midday: 
- Evening: 

> Tip: run the XP update (**Cmd/Ctrl+Alt+X**) after you tick the last items today.`;

    await app.vault.create(filename, summary);

    if (day === 0) {
      new Notice(`Created Weekly Review for ${weekId}`);
    } else {
      new Notice(`Manual weekly review created for ${weekId}`);
    }
  } catch (e) {
    console.error("weeklyReset error:", e);
    new Notice("weeklyReset error — check console");
  }
}

module.exports = { weeklyReset };
