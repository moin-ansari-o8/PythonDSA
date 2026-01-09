# ⚡ Python Quick Reference for Interviews

> **Essential Python syntax you'll use in every interview**

---

## 🎯 Purpose

This is your **1-page cheat sheet** for interviews. Bookmark this!

---

## 📚 Data Structures

### **List (Array)**
```python
arr = [1, 2, 3]
arr.append(4)           # [1,2,3,4]
arr.pop()               # 4, arr = [1,2,3]
arr.pop(0)              # 1, arr = [2,3]
arr.insert(0, 1)        # [1,2,3]
len(arr)                # 3
arr[::-1]               # [3,2,1] (reversed)
arr[1:3]                # [2,3] (slice)
sorted(arr)             # Returns new sorted list
arr.sort()              # Sort in place
min(arr), max(arr), sum(arr)
```

### **Dictionary (Hash Map)**
```python
d = {}
d = {'a': 1, 'b': 2}
d['c'] = 3              # Add/update
d.get('a', 0)           # Get with default
'a' in d                # True
del d['a']              # Delete key
d.pop('b', None)        # Remove and return
d.keys(), d.values(), d.items()

# Frequency counter
from collections import Counter
freq = Counter([1,2,2,3,3,3])  # {3:3, 2:2, 1:1}
freq.most_common(2)     # [(3,3), (2,2)]
```

### **Set**
```python
s = {1, 2, 3}
s = set()               # Empty set
s.add(4)                # {1,2,3,4}
s.remove(2)             # {1,3,4}
s.discard(5)            # No error if not exists
1 in s                  # True
s1 | s2                 # Union
s1 & s2                 # Intersection
s1 - s2                 # Difference
```

### **Deque (Queue)**
```python
from collections import deque
q = deque([1,2,3])
q.append(4)             # Add right: [1,2,3,4]
q.appendleft(0)         # Add left: [0,1,2,3,4]
q.pop()                 # Remove right: [0,1,2,3]
q.popleft()             # Remove left: [1,2,3]
```

### **Heap (Priority Queue)**
```python
import heapq
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
min_val = heapq.heappop(heap)  # 3
min_val = heap[0]       # Peek (don't remove)

# Max heap: use negative numbers
heapq.heappush(max_heap, -val)
max_val = -heapq.heappop(max_heap)

# Create heap from list
heapq.heapify(arr)      # O(n)
heapq.nlargest(k, arr)
heapq.nsmallest(k, arr)
```

### **DefaultDict**
```python
from collections import defaultdict
d = defaultdict(int)    # Default 0
d = defaultdict(list)   # Default []
d = defaultdict(set)    # Default set()

d['key'] += 1           # No KeyError!
d['key'].append(val)    # No KeyError!
```

---

## 🔄 Common Operations

### **String**
```python
s = "hello"
s.upper(), s.lower()
s.split()               # Split by whitespace
s.split(',')            # Split by comma
''.join(['a','b','c'])  # 'abc'
s.strip()               # Remove whitespace
s.replace('l', 'L')     # 'heLLo'
s.startswith('he')      # True
s.endswith('lo')        # True
s.isdigit(), s.isalpha()
list(s)                 # ['h','e','l','l','o']
```

### **Iteration**
```python
# Enumerate (get index + value)
for i, val in enumerate(arr):
    print(i, val)

# Enumerate with start
for i, val in enumerate(arr, start=1):
    print(i, val)

# Zip (iterate multiple lists)
for a, b in zip(list1, list2):
    print(a, b)

# Range
range(5)                # 0,1,2,3,4
range(1, 5)             # 1,2,3,4
range(0, 10, 2)         # 0,2,4,6,8
range(10, 0, -1)        # 10,9,8,...,1
```

### **List Comprehension**
```python
[x**2 for x in range(10)]
[x for x in range(10) if x % 2 == 0]
[[0]*m for _ in range(n)]  # n×m matrix

# Dict comprehension
{i: i**2 for i in range(5)}

# Set comprehension
{x**2 for x in range(5)}
```

### **Sorting**
```python
arr.sort()              # Sort in place
sorted(arr)             # Return new sorted list
sorted(arr, reverse=True)

# Custom sorting
arr = [(1,'b'), (2,'a')]
sorted(arr, key=lambda x: x[1])  # Sort by 2nd element
sorted(arr, key=lambda x: (x[1], x[0]))  # Multi-key

# Sort by length
words = ['apple', 'pie', 'a']
sorted(words, key=len)
```

---

## 🧮 Math Operations

```python
import math

math.floor(3.7)         # 3
math.ceil(3.2)          # 4
math.sqrt(16)           # 4.0
math.pow(2, 3)          # 8.0
abs(-5)                 # 5

# Division
7 // 2                  # 3 (floor division)
7 / 2                   # 3.5 (true division)
7 % 2                   # 1 (modulo)

# Infinity
float('inf')
float('-inf')

# Min/Max of multiple values
min(a, b, c)
max(a, b, c)
```

---

## 🎯 Common Patterns

### **Two Pointers**
```python
left, right = 0, len(arr) - 1
while left < right:
    # Do something
    left += 1
    right -= 1
```

### **Sliding Window**
```python
window_start = 0
for window_end in range(len(arr)):
    # Add arr[window_end] to window
    
    while window_invalid:
        # Remove arr[window_start]
        window_start += 1
    
    # Update result
```

### **Binary Search**
```python
left, right = 0, len(arr) - 1
while left <= right:
    mid = left + (right - left) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
```

### **BFS on Tree**
```python
from collections import deque

queue = deque([root])
while queue:
    level_size = len(queue)
    for _ in range(level_size):
        node = queue.popleft()
        # Process node
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
```

### **DFS on Tree (Recursive)**
```python
def dfs(node):
    if not node:
        return
    
    # Preorder: process before recursion
    # process(node)
    
    dfs(node.left)
    
    # Inorder: process between left and right
    # process(node)
    
    dfs(node.right)
    
    # Postorder: process after recursion
    # process(node)
```

### **DFS on Graph**
```python
def dfs(node, visited):
    if node in visited:
        return
    
    visited.add(node)
    # Process node
    
    for neighbor in graph[node]:
        dfs(neighbor, visited)
```

### **Backtracking**
```python
def backtrack(state, result):
    if is_valid_solution(state):
        result.append(state[:])  # Add copy
        return
    
    for choice in choices:
        # Make choice
        state.append(choice)
        
        # Recurse
        backtrack(state, result)
        
        # Undo choice (backtrack)
        state.pop()
```

### **Dynamic Programming**
```python
# Memoization (Top-Down)
memo = {}
def dp(n):
    if n in memo:
        return memo[n]
    
    # Base case
    if n <= 1:
        return n
    
    # Recursive relation
    memo[n] = dp(n-1) + dp(n-2)
    return memo[n]

# Tabulation (Bottom-Up)
dp = [0] * (n + 1)
dp[0], dp[1] = 0, 1
for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]
```

---

## 🎓 Edge Cases to Remember

```python
# Empty input
if not arr:
    return []

# Single element
if len(arr) == 1:
    return arr[0]

# Null/None check
if node is None:
    return

# Division by zero
if divisor == 0:
    return 0  # or handle appropriately

# Integer overflow (rare in Python)
# Python handles big integers automatically!

# Negative numbers
if num < 0:
    # Handle negative case
```

---

## 🚀 Interview Checklist

**Before writing code:**
- [ ] Clarify input/output
- [ ] Ask about edge cases
- [ ] Discuss approach
- [ ] Mention time/space complexity

**While coding:**
- [ ] Use meaningful variable names
- [ ] Add comments for complex logic
- [ ] Handle edge cases
- [ ] Think out loud

**After coding:**
- [ ] Walk through an example
- [ ] Test edge cases
- [ ] Analyze complexity
- [ ] Discuss optimization

---

## ⚡ Python Gotchas

```python
# WRONG: Shallow copy
arr2 = arr1             # Both reference same list!

# CORRECT: Deep copy
arr2 = arr1[:]          # or arr1.copy() or list(arr1)

# WRONG: Matrix initialization
matrix = [[0] * 3] * 3  # All rows reference same list!

# CORRECT: Matrix initialization
matrix = [[0] * 3 for _ in range(3)]

# WRONG: Default mutable argument
def func(arr=[]):       # Same list reused!
    arr.append(1)
    return arr

# CORRECT:
def func(arr=None):
    if arr is None:
        arr = []
    arr.append(1)
    return arr

# WRONG: String concatenation in loop
s = ""
for char in chars:
    s += char           # O(n²) due to string immutability

# CORRECT:
s = ''.join(chars)      # O(n)
```

---

## 🎯 Time Complexity Quick Reference

| Operation | Time |
|-----------|------|
| List access `arr[i]` | O(1) |
| List append | O(1) |
| List pop() | O(1) |
| List pop(0) | O(n) |
| List insert(0, x) | O(n) |
| List search | O(n) |
| List sort | O(n log n) |
| Dict get/set/delete | O(1) avg |
| Set add/remove/check | O(1) avg |
| Heap push/pop | O(log n) |
| Heapify | O(n) |

---

## 💡 Pro Tips

1. **Use Counter for frequency** - Don't manually count with dict
2. **Use deque for queues** - Not lists (O(1) vs O(n) for popleft)
3. **Use heap for Top K** - Don't sort entire array
4. **Use set for membership** - O(1) vs O(n) for lists
5. **String building** - Use list + join, not +=
6. **Matrix creation** - Always use list comprehension
7. **Think before coding** - 10 min planning > 30 min debugging

---

**Print this and keep it next to you during practice!** 📌

---

**Last Updated:** January 7, 2026
