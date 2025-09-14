// .obsidian/scripts/updateXP.js
// Scans today's Daily Log, updates numbers in YAML frontmatter (nodes/layers/connections)
// based on checked tasks (very lightweight heuristic to keep cockpit live).

async function updateXP(tp) {
  try {
    const vault = app.vault;
    const adapter = vault.adapter;
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const filePath = `Daily_Logs/${dateStr}.md`;

    if (!(await adapter.exists(filePath))) {
      new Notice("No daily log yet. Creating one first...");
      // Try to create it
      if (tp && tp.user && typeof tp.user.dailyLog === "function") {
        await tp.user.dailyLog(tp);
      }
    }

    const file = await vault.getAbstractFileByPath(filePath);
    if (!file) {
      new Notice("updateXP: couldn't load today's file"); 
      return;
    }

    let content = await vault.read(file);

    // Parse YAML frontmatter (simple regex)
    const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let yaml = yamlMatch ? yamlMatch[1] : "";
    let body = yamlMatch ? content.slice(yamlMatch[0].length) : content;

    function getSectionCount(sectionHeader) {
      const sectionRegex = new RegExp(`^##\\s+${sectionHeader}[\\s\\S]*?(?=^##\\s+|\\Z)`, "m");
      const s = body.match(sectionRegex);
      if (!s) return 0;
      const checks = s[0].match(/- \[x\]/gi);
      return checks ? checks.length : 0;
    }

    const A = getSectionCount("Academics");
    const F = getSectionCount("Fitness");
    const R = getSectionCount("Recovery");

    // Update simple counts in YAML (nodes/layers/connections)
    function setField(blockName, a, f, r) {
      const blockRegex = new RegExp(`${blockName}:\\n([\\s\\S]*?)(?=\\n[a-zA-Z_]+:|\\Z)`);
      const newBlock = `${blockName}:\n  academics: ${a}\n  fitness: ${f}\n  recovery: ${r}`;
      if (yaml.match(blockRegex)) {
        yaml = yaml.replace(blockRegex, newBlock);
      } else {
        yaml += `\n${newBlock}\n`;
      }
    }

    setField("nodes", A, F, R);
    setField("layers", Math.max(0, A-1), Math.max(0, F-1), Math.max(0, R-1));
    setField("connections", A>0?1:0, F>0?1:0, R>0?1:0);

    // Done flags by schedule checkboxes
    function scheduleDone(which) {
      const re = new RegExp(`^- \\[x\\].*${which}`, "mi");
      return re.test(body);
    }
    const doneBlock = `done:\n  morning: ${scheduleDone("Morning")}\n  midday: ${scheduleDone("Midday")}\n  evening: ${scheduleDone("Evening")}`;
    yaml = yaml.replace(/done:\n([\s\S]*?)(?=\n[a-zA-Z_]+:|\Z)/, doneBlock);

    const newContent = `---\n${yaml.trim()}\n---\n${body}`;
    await vault.modify(file, newContent);
    new Notice("XP updated for today");
  } catch (e) {
    console.error("updateXP error:", e);
    new Notice("updateXP error — check console");
  }
}

module.exports = { updateXP };
