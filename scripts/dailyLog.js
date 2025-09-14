async function dailyLog(tp) {
    const today = window.moment().format("YYYY-MM-DD");

    const content = `# Daily Log — ${today}

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
- [ ] Log one mini‑project idea (2 lines max)`;

    try {
        const filename = `Daily_Logs/${today}.md`;
        const tfile = await app.vault.create(filename, content);
        new Notice(`Daily log created: ${filename}`);
        console.log(`Created daily log: ${filename}`);
    } catch (e) {
        console.error("dailyLog error:", e);
        new Notice("dailyLog error — check console");
    }
}
module.exports = { dailyLog };
