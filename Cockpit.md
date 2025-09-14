---
elite_window:
  start: 2025-09-22
  end: 2025-10-10
timezone: Europe/Istanbul
---

```dataviewjs
const cfg = dv.current().file.frontmatter;
const start = dv.date(cfg.elite_window?.start ?? "2025-09-22");
const end   = dv.date(cfg.elite_window?.end   ?? "2025-10-10");
const today = dv.date("today");

if (!start || !end) {
  dv.paragraph("Elite window not configured.");
} else {
  const dayMs  = 24*60*60*1000;
  const total  = Math.max(1, Math.floor((end.toJSDate() - start.toJSDate())/dayMs) + 1);
  const idx =
    (today < start) ? 0 :
    (today > end)   ? total :
    Math.floor((today.toJSDate() - start.toJSDate())/dayMs) + 1;

  const status =
    (idx === 0)       ? "⏳ Starts soon" :
    (idx >= total)    ? "🏆 Elite Launch Achieved" :
                        `🚀 Elite Upgrade Cycle: Day ${idx}/${total}`;

  const windowLine = `Window: ${start.toFormat("yyyy-LL-dd")} → ${end.toFormat("yyyy-LL-dd")}`;
  const opsLine    = (idx === 0) ? "Status: Daily packs in prep" :
                     (idx >= total) ? "Status: Cockpit = Indestructible" :
                     "Status: Daily packs stable ✅";

  dv.el("pre", `==============================\n${status}\n${windowLine}\n${opsLine}\n==============================`);
}
```

### Live Panels

#### Open Today
```dataview
TABLE file.link AS "Open Today"
FROM "Daily_Logs"
WHERE date = date(today)
LIMIT 1
```

#### Unchecked Tasks (last 7 days)
```dataview
TASK FROM "Daily_Logs"
WHERE !completed AND file.day >= date(today) - dur(7 days)
GROUP BY file.day
SORT file.day DESC
```

#### Numbers Snapshot (this week totals)
```dataview
TABLE
sum(nodes.academics) AS "A·nodes",
sum(layers.academics) AS "A·layers",
sum(connections.academics) AS "A·conn",
sum(nodes.fitness) AS "F·nodes",
sum(layers.fitness) AS "F·layers",
sum(connections.fitness) AS "F·conn",
sum(nodes.recovery) AS "R·nodes",
sum(layers.recovery) AS "R·layers",
sum(connections.recovery) AS "R·conn"
FROM "Daily_Logs"
WHERE file.day.weekyear = date(today).weekyear AND file.day.week = date(today).week
```

#### Continuity Check (this week)
```dataview
TABLE file.day AS Day, done.morning, done.midday, done.evening
FROM "Daily_Logs"
WHERE file.day <= date(today) AND file.day >= date(today) - dur(6 days)
SORT file.day ASC
```
# Operation Obsidian Cockpit

- [Academics](Academics/Academics_Bank.md)
- [Fitness](Fitness/Fitness_Bank.md)
- [Recovery](Recovery/Recovery_Bank.md)
- [Externals](Externals/Externals_Bank.md)
- [Creativity](Creativity/Creativity_Bank.md)

---

## Today
See [Daily Log](Daily_Logs/2025-09-14.md)