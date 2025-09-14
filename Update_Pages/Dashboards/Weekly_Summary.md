---
tags: [dashboard, weekly]
---

# 📊 Weekly Summary (Past 7 Days)

```dataview
TABLE WITHOUT ID
  file.link AS "Day",
  date AS "Date",
  nodes.academics AS "A·nodes",
  nodes.fitness AS "F·nodes",
  nodes.recovery AS "R·nodes",
  layers.academics AS "A·layers",
  layers.fitness AS "F·layers",
  layers.recovery AS "R·layers",
  connections.academics AS "A·conn",
  connections.fitness AS "F·conn",
  connections.recovery AS "R·conn",
  done.morning AS "Morning✓",
  done.midday AS "Midday✓",
  done.evening AS "Evening✓"
FROM "Daily_Logs"
WHERE date >= date(today) - dur(7 days)
SORT date ASC
```

---

## Totals (7 Days)

```dataview
TABLE
  sum(nodes.academics) AS "A·nodes",
  sum(nodes.fitness) AS "F·nodes",
  sum(nodes.recovery) AS "R·nodes",
  sum(layers.academics) AS "A·layers",
  sum(layers.fitness) AS "F·layers",
  sum(layers.recovery) AS "R·layers",
  sum(connections.academics) AS "A·conn",
  sum(connections.fitness) AS "F·conn",
  sum(connections.recovery) AS "R·conn",
  sum(done.morning) AS "Morning✓",
  sum(done.midday) AS "Midday✓",
  sum(done.evening) AS "Evening✓"
FROM "Daily_Logs"
WHERE date >= date(today) - dur(7 days)
```

