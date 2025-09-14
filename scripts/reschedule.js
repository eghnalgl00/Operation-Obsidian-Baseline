// reschedule.js
// Exported as a direct function so Templater can call: <%* await tp.user.reschedule() %>
// Carries unchecked items from today's "## Schedule" to tomorrow's note under "### Rescheduled".
module.exports = async function(tp) {
  try {
    const pad = (n)=>String(n).padStart(2,'0');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = pad(today.getMonth() + 1);
    const dd = pad(today.getDate());
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const tomorrow = new Date(today.getTime() + 24*60*60*1000);
    const tyyyy = tomorrow.getFullYear();
    const tmm = pad(tomorrow.getMonth()+1);
    const tdd = pad(tomorrow.getDate());
    const nextStr = `${tyyyy}-${tmm}-${tdd}`;

    const todayPath = `Daily_Logs/${dateStr}.md`;
    const nextPath  = `Daily_Logs/${nextStr}.md`;

    const tfile = app.vault.getAbstractFileByPath(todayPath);
    if(!tfile){ new Notice('Reschedule: today log not found'); return; }

    let data = await app.vault.read(tfile);
    const parts = data.split('## Schedule');
    if (parts.length < 2) { new Notice('Reschedule: no Schedule section'); return; }
    const tail = parts[1];
    const afterSchedule = tail.indexOf('## ')>=0 ? tail.slice(tail.indexOf('## ')) : '';
    const scheduleText  = tail.replace(afterSchedule,'');

    // capture unchecked lines
    const lines = scheduleText.split('\n');
    const unchecked = lines.filter(l=>/^\s*\-\s\[\s\]\s/.test(l));
    if (unchecked.length===0) { new Notice('Reschedule: nothing to carry'); return; }

    // remove carried lines from today
    const kept = lines.filter(l=>!/^\s*\-\s\[\s\]\s/.test(l));
    const newSchedule = kept.join('\n');
    data = parts[0] + '## Schedule' + newSchedule + afterSchedule;
    await app.vault.modify(tfile, data);

    // Ensure tomorrow exists (create minimal if missing)
    let nx = app.vault.getAbstractFileByPath(nextPath);
    if(!nx){
      const minimal = `---
date: ${nextStr}
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

# Daily Log — ${nextStr}

## Schedule
- [ ] Morning → Academics depth block (Recursion/Probability drills)
- [ ] Midday → Fitness — Program X strength session
- [ ] Evening → Recovery — LISS walk + Car‑tech surprise
`;
      await app.vault.create(nextPath, minimal);
      nx = app.vault.getAbstractFileByPath(nextPath);
    }

    // Append a "Rescheduled" section
    let nxdata = await app.vault.read(nx);
    if(!/### Rescheduled/.test(nxdata)){
      nxdata += `\n\n### Rescheduled\n`;
    }
    nxdata += unchecked.map(l=>l.replace('- [ ]','- [ ]')).join('\n') + '\n';
    await app.vault.modify(nx, nxdata);

    new Notice(`Rescheduled ${unchecked.length} item(s) to ${nextStr}`);
  } catch (e) {
    console.error('reschedule error:', e);
    new Notice('Reschedule error — check console');
  }
};
