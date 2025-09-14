// updateXP.js
// Exported as a direct function so Templater can call: <%* await tp.user.updateXP() %>
// Writes native YAML booleans + per-slot completion flags; lightweight counts.
module.exports = async function(tp) {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const file = `Daily_Logs/${yyyy}-${mm}-${dd}.md`;

    const tfile = app.vault.getAbstractFileByPath(file);
    if (!tfile) { new Notice('XP: today log not found'); return; }

    let data = await app.vault.read(tfile);

    // Parse schedule checkboxes
    const scheduleBlock = data.split('## Schedule')[1]?.split('##')[0] || '';
    const doneMorning = /\- \[(x|X)\].*Morning/.test(scheduleBlock);
    const doneMidday  = /\- \[(x|X)\].*Midday/.test(scheduleBlock);
    const doneEvening = /\- \[(x|X)\].*Evening/.test(scheduleBlock);

    // Light pillar counts (checked items per pillar section)
    function countChecked(sectionName) {
      const sect = data.split(`## ${sectionName}`)[1]?.split('##')[0] || '';
      const matches = sect.match(/\- \[(x|X)\]/g);
      return matches ? matches.length : 0;
    }
    const A = countChecked('Academics');
    const F = countChecked('Fitness');
    const R = countChecked('Recovery');

    // ---- YAML update helpers ----
    const fmMatch = data.match(/^---\n([\s\S]*?)\n---/);
    const fmText = fmMatch ? fmMatch[1] : '';
    const body = fmMatch ? data.slice(fmMatch[0].length) : data;

    // Load YAML (simple)
    function parseYaml(text) {
      const obj = { nodes:{academics:0,fitness:0,recovery:0}, layers:{academics:0,fitness:0,recovery:0}, connections:{academics:0,fitness:0,recovery:0}, done:{morning:false,midday:false,evening:false} };
      text.split('\n').forEach(line => {
        const m = line.match(/^(\w+):\s*(.*)$/);
        if (m) {
          const key = m[1]; const val = m[2];
          if (key === 'date' || key === 'pillar') obj[key] = val;
        }
        const nested = line.match(/^\s{2}(\w+):\s*(.*)$/);
        if (nested) {
          const k = nested[1]; const v = nested[2];
          const parentLine = (text.split('\n').slice(0, text.split('\n').indexOf(line)).reverse().find(l=>/^\w+:$/.test(l))||'').trim().replace(':','');
          if (['nodes','layers','connections','done'].includes(parentLine)) {
            if (parentLine==='done') obj.done[k] = v.trim()==='true';
            else {
              const n = parseInt(v.trim(),10);
              if (!isNaN(n)) obj[parentLine][k]=n;
            }
          }
        }
      });
      return obj;
    }

    function toYaml(obj){
      return [
        '---',
        `date: ${obj.date || ''}`.trim(),
        `pillar: ${obj.pillar || 'daily'}`.trim(),
        'nodes:',
        `  academics: ${obj.nodes.academics}`,
        `  fitness: ${obj.nodes.fitness}`,
        `  recovery: ${obj.nodes.recovery}`,
        'layers:',
        `  academics: ${obj.layers.academics}`,
        `  fitness: ${obj.layers.fitness}`,
        `  recovery: ${obj.layers.recovery}`,
        'connections:',
        `  academics: ${obj.connections.academics}`,
        `  fitness: ${obj.connections.fitness}`,
        `  recovery: ${obj.connections.recovery}`,
        'done:',
        `  morning: ${obj.done.morning}`,
        `  midday: ${obj.done.midday}`,
        `  evening: ${obj.done.evening}`,
        '---\n'
      ].join('\n');
    }

    const meta = parseYaml(fmText);
    meta.done.morning = doneMorning;
    meta.done.midday  = doneMidday;
    meta.done.evening = doneEvening;
    // Use checked-counts as "connections" — harmless & visible in cockpit
    meta.connections.academics = A;
    meta.connections.fitness   = F;
    meta.connections.recovery  = R;

    const newData = toYaml(meta) + body;
    await app.vault.modify(tfile, newData);
    new Notice('XP updated');
  } catch (e) {
    console.error('updateXP error:', e);
    new Notice('XP update error — check console');
  }
};
