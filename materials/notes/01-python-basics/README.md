# 🐍 Python Essentials for DSA

> **You know Python basics. Here's what you ACTUALLY need for DSA.**

This isn't "Python 101". This is "Python techniques that make DSA easier."

---

## 🎯 What's Covered Here

- Python's built-in data structures (the DSA-relevant parts)
- List comprehensions & generator expressions
- Important built-in functions you'll use daily
- Common gotchas and how to avoid them
- Python-specific tricks that save time in interviews
- Time complexity of Python operations

---

## 📚 Table of Contents

1. [Lists - The Array Equivalent](#1-lists)
2. [Strings - Immutable Sequences](#2-strings)
3. [Dictionaries - Hash Maps](#3-dictionaries)
4. [Sets - For Uniqueness](#4-sets)
5. [Tuples - Immutable Lists](#5-tuples)
6. [Collections Module](#6-collections-module)
7. [Heapq Module](#7-heapq-module)
8. [Essential Built-in Functions](#8-essential-built-in-functions)
9. [List Comprehensions](#9-list-comprehensions)
10. [Time Complexity Cheatsheet](#10-time-complexity-cheatsheet)

---

## 1. Lists

### **What You Need to Know:**

Lists are Python's **dynamic arrays**. They're the most used data structure in DSA.

### **Creation:**
```python
# Different ways to create lists
arr = []                    # Empty list
arr = [1, 2, 3, 4, 5]      # Direct initialization
arr = [0] * 10             # List of 10 zeros
arr = list(range(5))       # [0, 1, 2, 3, 4]
```

### **Common Operations:**

```python
arr = [1, 2, 3, 4, 5]

# Access
first = arr[0]              # 1 (first element)
last = arr[-1]              # 5 (last element)
second_last = arr[-2]       # 4

# Slicing (creates new list)
arr[1:4]                    # [2, 3, 4] (index 1 to 3)
arr[:3]                     # [1, 2, 3] (first 3)
arr[2:]                     # [3, 4, 5] (from index 2 to end)
arr[::2]                    # [1, 3, 5] (every 2nd element)
arr[::-1]                   # [5, 4, 3, 2, 1] (reversed!)

# Modify
arr.append(6)               # Add to end: [1,2,3,4,5,6]
arr.pop()                   # Remove from end: [1,2,3,4,5]
arr.pop(0)                  # Remove from beginning: [2,3,4,5]
arr.insert(0, 1)            # Insert at index: [1,2,3,4,5]
arr.remove(3)               # Remove first occurrence: [1,2,4,5]

# Search
3 in arr                    # True (membership test)
arr.index(4)                # 2 (first index of 4)
arr.count(2)                # 1 (how many times 2 appears)

# Sorting
arr.sort()                  # Sort in place (modifies arr)
arr.sort(reverse=True)      # Sort descending
sorted_arr = sorted(arr)    # Returns new sorted list
```

### **Two Pointer Setup:**
```python
# Very common in DSA!
left, right = 0, len(arr) - 1

while left < right:
    # Do something
    left += 1
    right -= 1
```

### **⚠️ Gotcha - References:**
```python
# WRONG: Both refer to same list!
arr1 = [1, 2, 3]
arr2 = arr1          # arr2 points to same list
arr2.append(4)       # arr1 is also [1,2,3,4]!

# CORRECT: Create a copy
arr2 = arr1[:]       # or arr1.copy() or list(arr1)
```

### **Time Complexity:**
| Operation | Time Complexity |
|-----------|----------------|
| `arr[i]` (access) | O(1) |
| `arr.append(x)` | O(1) amortized |
| `arr.pop()` | O(1) |
| `arr.pop(0)` | O(n) ⚠️ |
| `arr.insert(0, x)` | O(n) ⚠️ |
| `x in arr` | O(n) |
| `arr.sort()` | O(n log n) |

---

## 2. Strings

### **Key Point:** Strings are **IMMUTABLE** in Python!

```python
s = "hello"
# s[0] = 'H'  # ❌ ERROR! Can't modify string

# To modify, convert to list
chars = list(s)
chars[0] = 'H'
s = ''.join(chars)  # "Hello"
```

### **Common Operations:**

```python
s = "hello world"

# Access (same as lists)
s[0]                    # 'h'
s[-1]                   # 'd'
s[0:5]                  # 'hello'

# Methods
s.upper()               # 'HELLO WORLD'
s.lower()               # 'hello world'
s.split()               # ['hello', 'world']
s.split('o')            # ['hell', ' w', 'rld']
s.replace('world', 'there')  # 'hello there'
s.strip()               # Remove whitespace from ends

# Check
s.startswith('hello')   # True
s.endswith('world')     # True
s.isdigit()             # False
s.isalpha()             # False (has space)
'o' in s                # True

# Join (reverse of split)
words = ['hello', 'world']
' '.join(words)         # 'hello world'
''.join(words)          # 'helloworld'
```

### **String Building (Important!):**

```python
# WRONG: O(n²) time complexity
result = ""
for char in some_list:
    result += char      # Creates new string each time!

# CORRECT: O(n) time complexity
result = []
for char in some_list:
    result.append(char)
s = ''.join(result)     # Join once at the end
```

### **Common Patterns:**

```python
# Check palindrome
def is_palindrome(s):
    return s == s[::-1]

# Reverse words
def reverse_words(s):
    return ' '.join(s.split()[::-1])

# Count characters
from collections import Counter
char_count = Counter("hello")  # {'h':1, 'e':1, 'l':2, 'o':1}
```

---

## 3. Dictionaries (Hash Maps)

### **The Most Powerful DSA Tool in Python!**

Dictionaries give you **O(1) average** lookup, insert, and delete.

### **Creation:**
```python
# Different ways
d = {}                          # Empty dict
d = {'a': 1, 'b': 2}           # Direct
d = dict(a=1, b=2)             # Using constructor
d = {i: i**2 for i in range(5)} # Dict comprehension
```

### **Operations:**

```python
d = {'a': 1, 'b': 2, 'c': 3}

# Access
d['a']                  # 1
d.get('a')              # 1
d.get('z', 0)           # 0 (default if key doesn't exist)

# Add/Modify
d['d'] = 4              # Add new key-value
d['a'] = 10             # Update existing

# Delete
del d['b']              # Remove key 'b'
d.pop('c')              # Remove and return value
d.pop('z', None)        # Remove if exists, else return None

# Check
'a' in d                # True (check if key exists)
'z' in d                # False

# Iterate
for key in d:           # Iterate over keys
    print(key, d[key])

for key, value in d.items():  # Iterate over key-value pairs
    print(key, value)

for value in d.values():  # Iterate over values only
    print(value)

# Get all keys/values
list(d.keys())          # ['a', 'd']
list(d.values())        # [10, 4]
```

### **Common Patterns:**

```python
# Frequency counter (VERY COMMON!)
from collections import Counter
arr = [1, 2, 2, 3, 3, 3]
freq = Counter(arr)     # {1: 1, 2: 2, 3: 3}

# Group by key
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)

# Two sum pattern
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

### **Time Complexity:**
| Operation | Average | Worst Case |
|-----------|---------|------------|
| `d[key]` | O(1) | O(n) |
| `d[key] = value` | O(1) | O(n) |
| `del d[key]` | O(1) | O(n) |
| `key in d` | O(1) | O(n) |

---

## 4. Sets

### **For Uniqueness & Fast Lookup**

Sets are unordered collections with **no duplicates** and **O(1) lookup**.

### **Creation:**
```python
s = set()               # Empty set
s = {1, 2, 3}          # Direct (note: {} is empty dict, not set!)
s = set([1, 2, 2, 3])  # From list: {1, 2, 3}
```

### **Operations:**

```python
s = {1, 2, 3, 4, 5}

# Add/Remove
s.add(6)                # {1,2,3,4,5,6}
s.remove(3)             # {1,2,4,5,6} (error if not exists)
s.discard(3)            # No error if not exists
s.pop()                 # Remove arbitrary element

# Check
3 in s                  # False
len(s)                  # 5

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}

a | b                   # Union: {1,2,3,4,5}
a & b                   # Intersection: {3}
a - b                   # Difference: {1,2}
a ^ b                   # Symmetric difference: {1,2,4,5}
```

### **Common Patterns:**

```python
# Remove duplicates
arr = [1, 2, 2, 3, 3, 3]
unique = list(set(arr))  # [1, 2, 3]

# Check if all elements are unique
def all_unique(arr):
    return len(arr) == len(set(arr))

# Find common elements
def intersection(arr1, arr2):
    return list(set(arr1) & set(arr2))
```

---

## 5. Tuples

### **Immutable Lists**

Tuples are like lists but **can't be modified**. Useful for:
- Return multiple values
- Use as dictionary keys (lists can't!)
- Slightly faster than lists

```python
# Creation
t = ()                  # Empty tuple
t = (1,)                # Single element (note the comma!)
t = (1, 2, 3)          # Multiple elements
t = 1, 2, 3            # Parentheses optional

# Access (same as lists)
t[0]                    # 1
t[-1]                   # 3
t[1:3]                  # (2, 3)

# Unpacking (VERY USEFUL!)
a, b, c = (1, 2, 3)     # a=1, b=2, c=3
first, *rest = (1, 2, 3, 4)  # first=1, rest=[2,3,4]

# Multiple return values
def min_max(arr):
    return min(arr), max(arr)

minimum, maximum = min_max([1, 2, 3, 4, 5])
```

---

## 6. Collections Module

### **Specialized Data Structures**

```python
from collections import defaultdict, Counter, deque, OrderedDict

# 1. defaultdict - Never worry about key errors!
d = defaultdict(int)    # Default value is 0
d['count'] += 1         # No KeyError!

d = defaultdict(list)   # Default value is []
d['items'].append(1)    # No KeyError!

# 2. Counter - Frequency counting made easy
from collections import Counter
arr = [1, 2, 2, 3, 3, 3]
freq = Counter(arr)     # Counter({3: 3, 2: 2, 1: 1})

freq.most_common(2)     # [(3, 3), (2, 2)] (top 2 frequent)
freq['new'] = 5         # Can add/modify
freq.update([1, 1, 1])  # Add more elements

# 3. deque - Double-ended queue (pronounced "deck")
from collections import deque
q = deque([1, 2, 3])

q.append(4)             # Add to right: [1,2,3,4]
q.appendleft(0)         # Add to left: [0,1,2,3,4]
q.pop()                 # Remove from right: [0,1,2,3]
q.popleft()             # Remove from left: [1,2,3] ⚡ O(1)!

# Use deque when you need O(1) operations at both ends!
```

---

## 7. Heapq Module

### **Priority Queue / Min Heap**

Python's `heapq` is a **min heap** (smallest element first).

```python
import heapq

# Create heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)  # heap is now [1, 3, 4]

# Or convert list to heap
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)       # O(n) - convert in place

# Extract minimum
min_val = heapq.heappop(heap)  # Returns 1

# Peek (don't remove)
min_val = heap[0]        # Just access first element

# Top K elements
k_largest = heapq.nlargest(3, arr)   # [5, 4, 3]
k_smallest = heapq.nsmallest(3, arr) # [1, 1, 3]

# For max heap, use negative numbers!
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
max_val = -heapq.heappop(max_heap)  # Returns 3 (original max)
```

---

## 8. Essential Built-in Functions

### **Functions You'll Use Every Day:**

```python
# Aggregates
arr = [1, 2, 3, 4, 5]
sum(arr)                # 15
min(arr)                # 1
max(arr)                # 5
len(arr)                # 5

# Enumerate (get index + value)
for i, val in enumerate(arr):
    print(f"Index {i}: {val}")

# Start from different index
for i, val in enumerate(arr, start=1):
    print(f"Position {i}: {val}")

# Zip (combine multiple iterables)
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# Range
range(5)                # 0, 1, 2, 3, 4
range(1, 5)             # 1, 2, 3, 4
range(0, 10, 2)         # 0, 2, 4, 6, 8

# Map (apply function to each element)
arr = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, arr))  # [1, 4, 9, 16]

# Filter (keep only elements that match condition)
arr = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, arr))  # [2, 4, 6]

# Any / All
arr = [True, False, True]
any(arr)                # True (at least one True)
all(arr)                # False (not all True)

# Sorted (returns new sorted list)
arr = [3, 1, 4, 1, 5]
sorted(arr)             # [1, 1, 3, 4, 5]
sorted(arr, reverse=True)  # [5, 4, 3, 1, 1]

# Custom sorting
arr = [(1, 'b'), (2, 'a'), (3, 'c')]
sorted(arr, key=lambda x: x[1])  # Sort by second element
```

---

## 9. List Comprehensions

### **Pythonic Way to Create Lists**

```python
# Basic syntax: [expression for item in iterable if condition]

# Instead of:
squares = []
for i in range(10):
    squares.append(i**2)

# Do this:
squares = [i**2 for i in range(10)]

# With condition
evens = [i for i in range(10) if i % 2 == 0]  # [0,2,4,6,8]

# Nested loops
pairs = [(i, j) for i in range(3) for j in range(3)]
# [(0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2)]

# Matrix creation
matrix = [[0] * 3 for _ in range(3)]  # 3x3 matrix of zeros
# [[0,0,0], [0,0,0], [0,0,0]]

# ⚠️ WRONG way to create matrix:
matrix = [[0] * 3] * 3  # All rows reference same list!

# Dictionary comprehension
squares_dict = {i: i**2 for i in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}

# Set comprehension
unique_squares = {i**2 for i in range(-5, 6)}  # {0,1,4,9,16,25}
```

---

## 10. Time Complexity Cheatsheet

### **Know These By Heart!**

| Data Structure | Operation | Time Complexity |
|----------------|-----------|-----------------|
| **List** | Access | O(1) |
| | Append | O(1) amortized |
| | Pop last | O(1) |
| | Pop first | O(n) |
| | Insert | O(n) |
| | Search | O(n) |
| | Sort | O(n log n) |
| **Dict** | Get/Set/Delete | O(1) average |
| | Check key exists | O(1) average |
| **Set** | Add/Remove | O(1) average |
| | Check membership | O(1) average |
| | Union/Intersection | O(len(s1) + len(s2)) |
| **Deque** | Append/Pop (both ends) | O(1) |
| | Access middle | O(n) |
| **Heap** | Push/Pop | O(log n) |
| | Heapify | O(n) |
| | Peek min | O(1) |

---

## 🎯 Quick Interview Tips

### **1. Choose Right Data Structure:**
- Need fast lookup? → **Dict** or **Set**
- Need ordered elements? → **List**
- Need unique elements? → **Set**
- Need counting? → **Counter**
- Need queue? → **deque**
- Need priority queue? → **heapq**

### **2. Common Patterns:**
```python
# Two sum → Dict
# Frequency counting → Counter
# Remove duplicates → Set
# Sliding window → Deque
# Top K elements → Heap
```

### **3. Space-Time Tradeoffs:**
```python
# Use extra space (dict/set) to improve time
# O(n²) → O(n) with hash map
```

---

## ✅ Practice Exercises

Test your understanding:

1. **Remove duplicates from list while preserving order**
2. **Find all pairs in array that sum to target**
3. **Group anagrams together**
4. **Find top K frequent elements**
5. **Implement LRU Cache** (uses dict + deque!)

Solutions are in the `01-python-basics/exercises/` folder.

---

## 🚀 Next Steps

You now know the Python tools for DSA!

👉 Next: [02-complexity/README.md](../02-complexity/README.md) - Learn to analyze your code's efficiency!

---

**Last Updated:** January 7, 2026
