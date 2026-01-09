# ⏱️ Time & Space Complexity Analysis

> **Learn to analyze how efficient your code is**

---

## 🎯 Why This Matters

Before you write a single line of code in interviews:
- **Interviewers will ask:** "What's the time complexity?"
- **You need to know:** Is my solution fast enough?
- **Optimization starts here:** Understanding current complexity

**Rule:** You can't optimize what you can't measure.

---

## 📚 Table of Contents

1. [What is Big O Notation?](#1-what-is-big-o)
2. [Common Time Complexities](#2-common-complexities)
3. [How to Calculate Time Complexity](#3-calculate-time-complexity)
4. [Space Complexity](#4-space-complexity)
5. [Best, Average, Worst Cases](#5-best-average-worst)
6. [Common Patterns Recognition](#6-patterns)
7. [Practice Examples](#7-practice)

---

## 1. What is Big O?

### **Simple Definition:**
Big O describes **how runtime grows as input size increases**.

### **What We Care About:**
- **Not exact time** (that depends on computer)
- **Growth rate** as input gets larger
- **Worst-case scenario** (usually)

### **Analogy:**
Imagine counting people in a room:
- **O(1):** You have a people counter at the door (instant)
- **O(n):** You count each person one by one (linear)
- **O(n²):** You ask each person to shake hands with everyone else (quadratic)

---

## 2. Common Complexities

### **From Best to Worst:**

| Notation | Name | Example | Description |
|----------|------|---------|-------------|
| **O(1)** | Constant | Array access: `arr[5]` | Always same time, regardless of input size |
| **O(log n)** | Logarithmic | Binary search | Divides problem in half each time |
| **O(n)** | Linear | Loop through array | Grows directly with input size |
| **O(n log n)** | Linearithmic | Merge sort, Quick sort | Efficient sorting algorithms |
| **O(n²)** | Quadratic | Nested loops | Loop inside a loop |
| **O(n³)** | Cubic | Triple nested loops | Three loops deep |
| **O(2ⁿ)** | Exponential | Fibonacci (naive recursion) | Doubles with each input increase |
| **O(n!)** | Factorial | Generate all permutations | Explodes very quickly |

### **Visual Comparison:**

```
Time →
│                                                    O(n!)
│                                               O(2ⁿ)
│                                          O(n³)
│                                     O(n²)
│                               O(n log n)
│                          O(n)
│                    O(log n)
│               O(1)
└─────────────────────────────────────────────→ Input Size (n)
```

### **Practical Numbers:**

For n = 1000:
- O(1) = 1 operation
- O(log n) ≈ 10 operations
- O(n) = 1,000 operations
- O(n log n) ≈ 10,000 operations
- O(n²) = 1,000,000 operations (1 million!)
- O(2ⁿ) = ... (universe doesn't have enough atoms)

---

## 3. Calculate Time Complexity

### **Rule 1: Drop Constants**

```python
# Both are O(n), not O(2n) or O(3n)
def example1(arr):
    for item in arr:        # O(n)
        print(item)
    for item in arr:        # O(n)
        print(item)
    # Total: O(n) + O(n) = O(2n) → O(n)

def example2(arr):
    for i in range(3):      # O(3n) → O(n)
        for item in arr:
            print(item)
```

**Why?** As n grows large, constants don't matter:
- When n = 1,000,000: Does 1M vs 2M really change the scale?

---

### **Rule 2: Drop Lower Order Terms**

```python
# O(n² + n) becomes O(n²)
def example(arr):
    for i in arr:           # O(n)
        print(i)
    
    for i in arr:           # O(n²)
        for j in arr:
            print(i, j)
    
    # Total: O(n) + O(n²) = O(n² + n) → O(n²)
```

**Why?** n² dominates n when n is large:
- n = 1000: n² = 1,000,000 vs n = 1,000
- The n becomes negligible

---

### **Rule 3: Different Inputs = Different Variables**

```python
# This is O(a + b), NOT O(n)
def example(arr1, arr2):
    for item in arr1:       # O(a)
        print(item)
    for item in arr2:       # O(b)
        print(item)
```

---

### **Rule 4: Single Loop = O(n)**

```python
def linear(arr):
    for item in arr:        # O(n)
        print(item)
```

---

### **Rule 5: Nested Loops = Multiply**

```python
# O(n * m) if different arrays
def nested_different(arr1, arr2):
    for i in arr1:          # O(n)
        for j in arr2:      # O(m)
            print(i, j)
    # Total: O(n * m)

# O(n²) if same array
def nested_same(arr):
    for i in arr:           # O(n)
        for j in arr:       # O(n)
            print(i, j)
    # Total: O(n * n) = O(n²)
```

---

### **Rule 6: Consecutive Loops = Add**

```python
def consecutive(arr):
    for item in arr:        # O(n)
        print(item)
    
    for item in arr:        # O(n)
        print(item)
    
    # Total: O(n) + O(n) = O(2n) → O(n)
```

---

### **Rule 7: Binary Search = O(log n)**

```python
# Dividing problem in half = logarithmic
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:    # How many times? log n
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
    # Time: O(log n)
```

**Why log n?**
- Each step eliminates half the remaining elements
- n → n/2 → n/4 → n/8 → ... → 1
- How many divisions? log₂(n)

---

### **Rule 8: Recursion = Analyze the Tree**

```python
# Fibonacci - BAD implementation
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

# Time: O(2ⁿ) - exponential!
```

**Recursion Tree:**
```
                fib(5)
               /      \
           fib(4)    fib(3)
          /    \      /    \
      fib(3) fib(2) fib(2) fib(1)
      ...
```
- Height = n
- Each level doubles = 2ⁿ nodes = O(2ⁿ)

---

## 4. Space Complexity

### **What Counts:**
- Variables you create
- Data structures you allocate
- Recursive call stack

### **What Doesn't Count:**
- Input size (that's given)
- Output (usually)

### **Examples:**

```python
# O(1) space - constant
def constant_space(arr):
    total = 0               # One variable
    for item in arr:        # Reuses same memory
        total += item
    return total

# O(n) space - linear
def linear_space(n):
    arr = [0] * n           # Array of size n
    return arr

# O(n) space - recursive stack
def recursive_space(n):
    if n <= 0:
        return
    recursive_space(n - 1)  # n recursive calls = n stack frames
```

---

## 5. Best, Average, Worst Cases

### **Example: Linear Search**

```python
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1
```

**Cases:**
- **Best Case: O(1)** - Target is first element
- **Average Case: O(n/2) → O(n)** - Target is in middle
- **Worst Case: O(n)** - Target is last or not present

**In Interviews:** Always discuss **worst case** unless asked otherwise.

---

## 6. Common Patterns

### **Pattern 1: Single Loop**
```python
for i in range(n):
    # O(1) operation
# Time: O(n)
```

### **Pattern 2: Nested Loops**
```python
for i in range(n):
    for j in range(n):
        # O(1) operation
# Time: O(n²)
```

### **Pattern 3: Two Separate Loops**
```python
for i in range(n):
    # O(1) operation

for j in range(m):
    # O(1) operation
# Time: O(n + m)
```

### **Pattern 4: Half Loop**
```python
for i in range(n // 2):
    # O(1) operation
# Time: O(n/2) → O(n)
```

### **Pattern 5: Log Loop**
```python
i = 1
while i < n:
    i *= 2  # i doubles each time
# Time: O(log n)
```

### **Pattern 6: Nested with Different Ranges**
```python
for i in range(n):
    for j in range(i):  # Inner loop depends on i
        # O(1) operation
# Time: O(n²)
# Why? 0+1+2+...+(n-1) = n(n-1)/2 = O(n²)
```

---

## 7. Practice Examples

### **Example 1:**
```python
def mystery1(arr):
    for i in range(len(arr)):
        print(arr[i])
```
**Answer:** O(n) time, O(1) space

---

### **Example 2:**
```python
def mystery2(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            print(arr[i], arr[j])
```
**Answer:** O(n²) time, O(1) space

---

### **Example 3:**
```python
def mystery3(arr):
    if len(arr) == 0:
        return
    print(arr[0])
    mystery3(arr[1:])
```
**Answer:** O(n) time, O(n) space (recursive stack + slice creates new array)

---

### **Example 4:**
```python
def mystery4(n):
    i = 1
    while i < n:
        i *= 2
```
**Answer:** O(log n) time, O(1) space

---

### **Example 5:**
```python
def mystery5(arr):
    arr.sort()
    for item in arr:
        print(item)
```
**Answer:** O(n log n) time (sort dominates), O(1) or O(n) space (depends on sort implementation)

---

### **Example 6:**
```python
def mystery6(arr):
    result = []
    for i in arr:
        result.append(i * 2)
    return result
```
**Answer:** O(n) time, O(n) space (new array)

---

## 🎯 Quick Reference

### **Time Complexity Cheat Sheet:**

| Code Pattern | Complexity |
|--------------|------------|
| `arr[i]` | O(1) |
| `for i in arr:` | O(n) |
| `for i in arr: for j in arr:` | O(n²) |
| `while i < n: i *= 2` | O(log n) |
| `arr.sort()` | O(n log n) |
| `binary_search()` | O(log n) |
| Recursion (tree with 2 branches, depth n) | O(2ⁿ) |

---

## 💡 Interview Tips

### **When Asked About Complexity:**

1. **Think through the code:**
   - Count loops
   - Identify nested structures
   - Consider recursive calls

2. **Explain your reasoning:**
   - "The outer loop runs n times..."
   - "The inner loop runs n times..."
   - "So total is n × n = O(n²)"

3. **Discuss both time AND space:**
   - Interviewers appreciate thorough analysis

4. **Compare approaches:**
   - "This brute force is O(n²), but with a hash map we can do O(n)"

---

## ✅ Complexity Checklist

Can you:
- [ ] Identify O(1), O(n), O(n²) code?
- [ ] Calculate complexity of nested loops?
- [ ] Recognize O(log n) patterns?
- [ ] Analyze recursive functions?
- [ ] Calculate space complexity?
- [ ] Explain trade-offs between time and space?

If yes, you're ready to move forward!

---

## 🚀 Next Steps

**Ready for real data structures?**

👉 Go to [03-arrays-strings/README.md](../03-arrays-strings/README.md) and start solving problems!

---

**Last Updated:** January 7, 2026
