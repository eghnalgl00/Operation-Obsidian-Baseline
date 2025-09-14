// dailyLog.js
// Exported as a direct function so Templater can call: <%* await tp.user.dailyLog() %>
module.exports = async function(tp) {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const filename = `Daily_Logs/${dateStr}.md`;

    // If already exists, do nothing
    const exists = app.vault.getAbstractFileByPath(filename);
    if (exists) { new Notice(`Daily log exists: ${dateStr}`); return; }

    const frontmatter = [
      '---',
      `date: ${dateStr}`,
      'pillar: daily',
      'nodes:',
      '  academics: 0',
      '  fitness: 0',
      '  recovery: 0',
      'layers:',
      '  academics: 0',
      '  fitness: 0',
      '  recovery: 0',
      'connections:',
      '  academics: 0',
      '  fitness: 0',
      '  recovery: 0',
      'done:',
      '  morning: false',
      '  midday: false',
      '  evening: false',
      '---',
      ''
    ].join('\n');

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

    await app.vault.create(filename, frontmatter + body);
    new Notice(`Created daily log: ${dateStr}`);
  } catch (e) {
    console.error('dailyLog error:', e);
    new Notice('DailyLog error — check console');
  }
};
