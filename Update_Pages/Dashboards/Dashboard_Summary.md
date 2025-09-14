# 📊 Dashboard Summary (last 7 days)

Quick rollup of nodes / layers / connections and completion flags pulled from each daily log's frontmatter.

```dataview
TABLE
  dateformat(date, "yyyy-MM-dd") AS "Day",
  nodes.academics AS "A-nodes", layers.academics AS "A-layers", connections.academics AS "A-conn",
  nodes.fitness AS "F-nodes", layers.fitness AS "F-layers", connections.fitness AS "F-conn",
  nodes.recovery AS "R-nodes", layers.recovery AS "R-layers", connections.recovery AS "R-conn",
  done.morning AS "done.morning", done.midday AS "done.midday", done.evening AS "done.evening"
FROM "Daily_Logs"
WHERE date >= (date(today) - dur(7 days))
SORT date DESC
```
