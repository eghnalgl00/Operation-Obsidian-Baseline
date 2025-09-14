### XP Tracker (auto from today's checkboxes)
```dataviewjs
const today = dv.pages('"Daily_Logs"')
  .where(p => p.date && p.date.toISODate() === dv.date('today').toISODate())
  .first();

if (!today) {
  dv.paragraph("No daily log found for today.");
} else {
  const tasks = today.file.tasks ?? [];
  const bySection = (name) => tasks.filter(t => (t.section?.path ?? "").toLowerCase().startsWith(name.toLowerCase()));
  const done = (arr) => arr.filter(t => t.completed).length;
  const total = (arr) => arr.length;

  const acad = bySection("academics");
  const fit  = bySection("fitness");
  const rec  = bySection("recovery");
  const sched = bySection("schedule");

  const m = sched.find(t => t.text.toLowerCase().startsWith("morning"));
  const d = sched.find(t => t.text.toLowerCase().startsWith("midday"));
  const e = sched.find(t => t.text.toLowerCase().startsWith("evening"));

  dv.table(["Pillar","Done","Total"], [
    ["Academics", done(acad), total(acad)],
    ["Fitness",   done(fit),  total(fit) ],
    ["Recovery",  done(rec),  total(rec) ]
  ]);

  dv.header(4, "Continuity (auto from Schedule)");
  dv.list([
    `Morning: ${m?.completed ? "✅" : "⬜"}`,
    `Midday: ${d?.completed ? "✅" : "⬜"}`,
    `Evening: ${e?.completed ? "✅" : "⬜"}`
  ]);
}
```
