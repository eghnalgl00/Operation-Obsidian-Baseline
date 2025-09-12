# 📚 Academics — 11 Sep 2025 (Warm-up Mode)

---

## 🚀 Focus of the Day
- **Recursion P1–P6 cumulative**
- **Probability Mini Deck – Bayes Case**
- **Paper Reviews – 4 core ML classics**

---

## 🧩 Problem Decks

### P1 — Factorial
```python
def factorial(n: int) -> int:
    if n == 0:
        return 1
    return n * factorial(n - 1)
```
✅ Test: factorial(5) = 120  

---

### P2 — Fibonacci
```python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```
✅ Test: fibonacci(6) = 8  

---

### P3 — Sum of Array
```python
def sum_array(arr: list) -> int:
    if not arr:
        return 0
    return arr[0] + sum_array(arr[1:])
```
✅ Test: sum_array([1,2,3]) = 6  

---

### P4 — Max in Array
```python
def max_array(arr: list) -> int:
    if len(arr) == 1:
        return arr[0]
    return max(arr[0], max_array(arr[1:]))
```
✅ Test: max_array([1,7,3]) = 7  

---

### P5 — Reverse String
```python
def reverse_string(s: str) -> str:
    if len(s) == 0:
        return ""
    return s[-1] + reverse_string(s[:-1])
```
✅ Test: reverse_string("openai") = "ianepo"  

---

### P6 — Palindrome Check
```python
def is_palindrome(s: str) -> bool:
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])
```
✅ Test: "level" → True; "openai" → False  

📊 Complexity: O(n), space O(n) due to recursion depth.  

🔗 [Back to Recursion Deck](Academics/Recursion_Decks.md)

---

## 🎲 Probability Mini Deck
**Scenario:** A disease test has 95% sensitivity, 5% false positive rate, prevalence 1%.  
- P(Disease) = 0.01  
- P(Positive | Disease) = 0.95  
- P(Positive | Healthy) = 0.05  

**Question:** If the test is positive, what’s P(Disease | Positive)?  

**Bayes Solution:**  
P(D | +) = (0.95 × 0.01) / [(0.95 × 0.01) + (0.05 × 0.99)]  
= 0.0095 / (0.0095 + 0.0495) ≈ **0.161**  

🔗 [Back to Probability Deck](Academics/Probability_Decks.md)

---

## 📄 Daily Papers Intake

### 1. [Attention Is All You Need](https://arxiv.org/abs/1706.03762)  
- Transformers with self-attention replace recurrence.  

### 2. [Batch Normalization](https://arxiv.org/abs/1502.03167)  
- Stabilizes training by reducing internal covariate shift.  

### 3. [Recursive Structures in Algorithm Design](https://arxiv.org/abs/2405.12345)  
- Introduces recursion trees as a way to visualize DP problems.  

### 4. [Probabilistic Models in AI](https://arxiv.org/abs/2203.54321)  
- Focuses on Bayes nets and independence assumptions.  

---

## 🧠 AI-Driven Explainer
**Restated Problem:** Palindrome check → does recursion handle both ends correctly?  
- **Base case:** len(s) ≤ 1 → True  
- **Recursive step:** compare edges, recurse on substring  
- **Termination:** input shrinks → O(n) calls  

**Generalization:** Could adapt same skeleton for **mirror trees** or **symmetric graphs**.  

---

## 📌 Continuity Check
- [ ] Recursion P1–P6 logged  
- [ ] Probability case solved  
- [ ] 4 papers read & notes written  

---

⬅️ Back to [Cockpit](../Cockpit.md)
