# Recursion Decks — Enriched (P1–P6)

> Tip: After solving, log nodes/layers/connections in [[Indestructible_Systems/XP_Tracker_and_Heatmaps]].

## P1 — Factorial
```python
def fact(n: int) -> int:
    return 1 if n <= 1 else n * fact(n-1)
```
Test: `fact(5) == 120`

## P2 — Fibonacci (memoized)
```python
from functools import lru_cache
@lru_cache(None)
def fib(n: int) -> int:
    if n < 2: return n
    return fib(n-1) + fib(n-2)
```
Check: `fib(10) == 55`

## P3 — Binary Search (recursive)
```python
def bsearch(a, x, lo=0, hi=None):
    if hi is None: hi = len(a)-1
    if lo > hi: return -1
    mid = (lo + hi)//2
    if a[mid] == x: return mid
    if a[mid] < x: return bsearch(a, x, mid+1, hi)
    return bsearch(a, x, lo, mid-1)
```
## P4 — Tower of Hanoi
```python
def hanoi(n, src, aux, dst, moves):
    if n == 0: return
    hanoi(n-1, src, dst, aux, moves)
    moves.append((src, dst))
    hanoi(n-1, aux, src, dst, moves)
```
Moves: `2**n - 1`

## P5 — Digit Sum
```python
def digit_sum(n: int) -> int:
    if n < 10: return n
    return n % 10 + digit_sum(n // 10)
```

## NEW — P6: Palindrome Check
```python
def is_palindrome(s: str) -> bool:
    if len(s) <= 1: return True
    if s[0] != s[-1]: return False
    return is_palindrome(s[1:-1])
```

---
Next: reflect in [[Academics/AI_Driven_Solutions_Explainers]].  
⬅️ Back to [[Academics/Academics]] • [[Cockpit]]
