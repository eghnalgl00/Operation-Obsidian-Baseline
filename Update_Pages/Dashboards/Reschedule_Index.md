# 🔁 Reschedule Index

Daily logs that recorded rescheduling (via frontmatter or a `### Rescheduled` section).

```dataview
TABLE
  file.link AS "File",
  dateformat(date, "yyyy-MM-dd") AS "Day",
  default(reschedule.count, 0) AS "Frontmatter Count",
  default(reschedule.rolled, 0) AS "Rolled Tasks"
FROM "Daily_Logs"
WHERE default(reschedule.count, 0) > 0 OR default(reschedule.rolled, 0) > 0
SORT date DESC
```
