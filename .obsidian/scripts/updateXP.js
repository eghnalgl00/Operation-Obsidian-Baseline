// .obsidian/scripts/updateXP.js
// Exported as a single function for Templater: <%* await tp.user.updateXP(tp) %>
// It updates today's Daily Log frontmatter: nodes/layers/connections + done flags.

/** Utility: get active file safely */
function getActiveFile() {
  const leaf = app.workspace.getMostRecentLeaf();
  if (!leaf) return null;
  return leaf.view?.file || app.workspace.getActiveFile();
}

/** Utility: extract section text between headings (## Name -> next ##) */
function extractSection(content, heading) {
  const re = new RegExp(`(^|\\n)##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|\\n#\\s+|$)`, "i");
  const m = content.match(re);
  return m ? m[2] : "";
}

/** Utility: count checked boxes in a chunk of text */
function countChecked(chunk) {
  if (!chunk) return 0;
  const matches = chunk.match(/^- \\[x\\] /gim);
  return matches ? matches.length : 0;
}

/** Utility: parse schedule done flags */
function parseSchedule(content) {
  const sched = extractSection(content, "Schedule");
  const flag = (label) => {
    const re = new RegExp(`^- \\[(x|X)\\] .*${label}.*$`, "im");
    return re.test(sched);
  };
  return {
    morning: flag("Morning"),
    midday: flag("Midday"),
    evening: flag("Evening"),
  };
}

/** Main exported function */
async function updateXP(tp) {
  const file = getActiveFile();
  if (!file) {
    new Notice("Update XP: No active file");
    return;
  }

  const content = await app.vault.read(file);

  // Pillar sections
  const acad = extractSection(content, "Academics");
  const fit  = extractSection(content, "Fitness");
  const rec  = extractSection(content, "Recovery");

  // Count checked tasks by pillar
  const aNodes = countChecked(acad);
  const fNodes = countChecked(fit);
  const rNodes = countChecked(rec);

  // Simple mapping: layers = nodes (you can refine later)
  const aLayers = aNodes;
  const fLayers = fNodes;
  const rLayers = rNodes;

  // Simple mapping: connections = number of checked lines that contain "→" or a link
  function countConnections(chunk) {
    if (!chunk) return 0;
    const lines = chunk.split(/\n/);
    return lines.filter(l => /^\s*-\s*\[x\]/i.test(l) && (l.includes("→") || /\[[^\]]+\]\([^)]+\)/.test(l))).length;
  }
  const aConn = countConnections(acad);
  const fConn = countConnections(fit);
  const rConn = countConnections(rec);

  // Parse schedule flags
  const done = parseSchedule(content);

  // Update frontmatter using official API
  await app.fileManager.processFrontMatter(file, (fm) => {
    fm.pillar = fm.pillar || "daily";
    fm.nodes = { academics: aNodes, fitness: fNodes, recovery: rNodes };
    fm.layers = { academics: aLayers, fitness: fLayers, recovery: rLayers };
    fm.connections = { academics: aConn, fitness: fConn, recovery: rConn };
    fm.done = { morning: !!done.morning, midday: !!done.midday, evening: !!done.evening };
  });

  new Notice("XP updated successfully!");
}

module.exports = updateXP;
