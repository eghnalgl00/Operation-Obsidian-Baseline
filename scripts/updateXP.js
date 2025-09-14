async function updateXP(tp) {
    try {
        const pages = await app.vault.getMarkdownFiles();
        let totalNodes = 0, totalLayers = 0, totalConnections = 0;

        for (let file of pages) {
            if (file.path.startsWith("Daily_Logs/")) {
                const content = await app.vault.read(file);
                if (content.includes("Academics")) totalNodes++;
                if (content.includes("Fitness")) totalLayers++;
                if (content.includes("Recovery")) totalConnections++;
            }
        }

        const cockpitFile = app.vault.getAbstractFileByPath("Operation_Obsidian_Baseline/Cockpit.md");
        if (cockpitFile) {
            let cockpitContent = await app.vault.read(cockpitFile);
            cockpitContent += `\n\nXP Update (${window.moment().format("YYYY-MM-DD")}): Nodes=${totalNodes}, Layers=${totalLayers}, Connections=${totalConnections}`;
            await app.vault.modify(cockpitFile, cockpitContent);
            new Notice("XP updated in Cockpit");
        }
    } catch (e) {
        console.error("updateXP error:", e);
        new Notice("updateXP error — check console");
    }
}
module.exports = { updateXP };
