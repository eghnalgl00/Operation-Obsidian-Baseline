// xpUpdate.js
// Usage from Templater: <%* await tp.user.xpUpdate(tp) %>
// Reads today's Daily_Logs/YYYY-MM-DD.md, counts checked tasks per pillar and
// writes results into frontmatter (xp/nodes/layers/connections) and between
// <!-- XP-START --> ... <!-- XP-END --> markers.

async function xpUpdate(tp) {
  const today = window.moment().format("YYYY-MM-DD");
  const path = `Daily_Logs/${today}.md`;
  const file = app.vault.getAbstractFileByPath(path);
  if (!file) {
    new Notice("xpUpdate: today's log not found — run dailyLog first");
    return "";
  }

  const data = await app.vault.read(file);

  // Simple counts: count checked tasks under each section heading.
  function countChecked(sectionName) {
    const re = new RegExp(`##\\s*${sectionName}[\\s\\S]*?(?=\\n##\\s|\\Z)`, "i");
    const m = data.match(re);
    if (!m) return 0;
    const block = m[0];
    const checks = block.match(/\- \[x\]/gi);
    return checks ? checks.length : 0;
  }

  const a = countChecked("Academics");
  const f = countChecked("Fitness");
  const r = countChecked("Recovery");

  // Derive nodes/layers/connections trivially (you can tune weights later).
  const xp = { academics: a, fitness: f, recovery: r };
  const nodes = { academics: a, fitness: f, recovery: r };
  const layers = { academics: Math.max(0, a-1), fitness: Math.max(0, f-1), recovery: Math.max(0, r-1) };
  const connections = { academics: Math.floor(a/2), fitness: Math.floor(f/2), recovery: Math.floor(r/2) };

  // Update frontmatter
  function replaceFrontmatter(text, key, obj) {
    const yamlBlock = /^---[\s\S]*?---/;
    if (!yamlBlock.test(text)) {
      // Insert new frontmatter
      const fm = `---
date: ${today}
pillar: daily
xp:
  academics: ${xp.academics}
  fitness: ${xp.fitness}
  recovery: ${xp.recovery}
nodes:
  academics: ${nodes.academics}
  fitness: ${nodes.fitness}
  recovery: ${nodes.recovery}
layers:
  academics: ${layers.academics}
  fitness: ${layers.fitness}
  recovery: ${layers.recovery}
connections:
  academics: ${connections.academics}
  fitness: ${connections.fitness}
  recovery: ${connections.recovery}
done:
  morning: false
  midday: false
  evening: false
---
`;
      return fm + text;
    } else {
      // Replace each group individually with regex.
      function replGroup(name, valObj) {
        const re = new RegExp(`${name}:[\\s\\S]*?(?=\\n[a-z]+:|\\n---|\\Z)`, "i");
        const block = `${name}:
  academics: ${valObj.academics}
  fitness: ${valObj.fitness}
  recovery: ${valObj.recovery}`;
        if (re.test(text)) {
          return text.replace(re, block);
        } else {
          // Insert before closing '---'
          return text.replace(/---\s*$/, `${block}\n---`);
        }
      }
      let out = text;
      out = replGroup("xp", xp);
      out = out.replace(text, out);
      out = replGroup("nodes", nodes);
      out = replGroup("layers", layers);
      out = replGroup("connections", connections);
      return out;
    }
  }

  let updated = replaceFrontmatter(data, "xp", xp);

  // Update XP snapshot block
  const snap = `<!-- XP-START -->
XP Snapshot: A:${a}  F:${f}  R:${r}
<!-- XP-END -->`;
  if (/<!-- XP-START -->[\s\S]*?<!-- XP-END -->/m.test(updated)) {
    updated = updated.replace(/<!-- XP-START -->[\s\S]*?<!-- XP-END -->/m, snap);
  } else {
    updated += `\n\n${snap}\n`;
  }

  await app.vault.modify(file, updated);
  new Notice("XP updated");
  return "";
}

module.exports = xpUpdate;
