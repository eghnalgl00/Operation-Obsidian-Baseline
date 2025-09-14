# 🗓️ Weekly Timeline (last 7 days)

Click any day to jump to that log.

```dataview
TABLE
  file.link AS "Daily Log",
  dateformat(date, "EEE, MMM d") AS "When"
FROM "Daily_Logs"
WHERE date >= (date(today) - dur(7 days))
SORT date ASC
```
