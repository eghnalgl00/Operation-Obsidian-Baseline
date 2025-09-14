---
title: Log Calendar
tags: [dashboard, calendar]
---

# 📅 Log Calendar (grouped by month)

```dataview
TABLE WITHOUT ID file.link AS "Log", date
FROM "Daily_Logs"
GROUP BY dateformat(date, "yyyy MMMM") AS Month
SORT file.name DESC
```
