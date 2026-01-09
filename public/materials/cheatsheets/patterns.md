# 🎯 Common DSA Patterns Cheatsheet

> **Pattern recognition is the key to solving problems fast**

---

## Why Patterns Matter

In interviews, you don't solve "new" problems. You recognize patterns and apply known solutions.

**Master these 18 patterns, and you'll handle 90% of interview questions.**

---

## Pattern Index

1. [Two Pointers](#1-two-pointers)
2. [Sliding Window](#2-sliding-window)
3. [Fast & Slow Pointers](#3-fast--slow-pointers)
4. [Merge Intervals](#4-merge-intervals)
5. [Cyclic Sort](#5-cyclic-sort)
6. [In-place Reversal of Linked List](#6-in-place-reversal-of-linked-list)
7. [Tree BFS](#7-tree-bfs)
8. [Tree DFS](#8-tree-dfs)
9. [Two Heaps](#9-two-heaps)
10. [Subsets (Backtracking)](#10-subsets-backtracking)
11. [Modified Binary Search](#11-modified-binary-search)
12. [Top K Elements](#12-top-k-elements)
13. [K-way Merge](#13-k-way-merge)
14. [Topological Sort](#14-topological-sort)
15. [0/1 Knapsack (DP)](#15-01-knapsack-dp)
16. [Fibonacci Numbers (DP)](#16-fibonacci-numbers-dp)
17. [Palindromic Subsequence (DP)](#17-palindromic-subsequence-dp)
18. [Longest Common Substring (DP)](#18-longest-common-substring-dp)

---

## 1. Two Pointers

### **When to Use:**
- Array is sorted or can be sorted
- Need to find pair/triplet with given condition
- Palindrome checking
- Removing duplicates

### **Template:**
```python
def two_pointers(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        # Calculate something with arr[left] and arr[right]
        if condition_met:
            return result
        elif need_larger_value:
            left += 1
        else:
            right -= 1
    
    return result
```

### **Example Problems:**
- Two Sum II (sorted array)
- 3Sum
- Container With Most Water
- Valid Palindrome

### **Time Complexity:** O(n)

---

## 2. Sliding Window

### **When to Use:**
- Contiguous subarray/substring problems
- Find max/min subarray of size K
- Longest/shortest substring with condition

### **Template:**
```python
def sliding_window(arr, k):
    window_start = 0
    # Track window state (sum, count, freq map, etc.)
    
    for window_end in range(len(arr)):
        # Add arr[window_end] to window
        
        # Shrink window if needed
        while window_invalid:
            # Remove arr[window_start] from window
            window_start += 1
        
        # Update result with current window
    
    return result
```

### **Example Problems:**
- Maximum Sum Subarray of Size K
- Longest Substring Without Repeating Characters
- Fruits Into Baskets
- Minimum Window Substring

### **Time Complexity:** O(n)

---

## 3. Fast & Slow Pointers

### **When to Use:**
- Detect cycle in linked list
- Find middle of linked list
- Find nth element from end
- Palindrome linked list

### **Template:**
```python
def fast_slow_pointers(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            # Cycle detected
            return True
    
    return False
```

### **Example Problems:**
- Linked List Cycle
- Middle of Linked List
- Happy Number
- Palindrome Linked List

### **Time Complexity:** O(n)

---

## 4. Merge Intervals

### **When to Use:**
- Overlapping intervals
- Merge/insert intervals
- Scheduling problems

### **Template:**
```python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        
        if current[0] <= last[1]:  # Overlap
            merged[-1] = [last[0], max(last[1], current[1])]
        else:
            merged.append(current)
    
    return merged
```

### **Example Problems:**
- Merge Intervals
- Insert Interval
- Meeting Rooms II
- Employee Free Time

### **Time Complexity:** O(n log n) due to sorting

---

## 5. Cyclic Sort

### **When to Use:**
- Array contains numbers in given range (1 to n)
- Find missing/duplicate numbers
- Numbers should be at index = value - 1

### **Template:**
```python
def cyclic_sort(nums):
    i = 0
    while i < len(nums):
        correct_index = nums[i] - 1
        if nums[i] != nums[correct_index]:
            nums[i], nums[correct_index] = nums[correct_index], nums[i]
        else:
            i += 1
    return nums
```

### **Example Problems:**
- Missing Number
- Find All Duplicates
- Find the Corrupt Pair
- First K Missing Positive Numbers

### **Time Complexity:** O(n)

---

## 6. In-place Reversal of Linked List

### **When to Use:**
- Reverse linked list
- Reverse part of linked list
- Rotate linked list

### **Template:**
```python
def reverse_linked_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev
```

### **Example Problems:**
- Reverse Linked List
- Reverse Linked List II
- Reverse Nodes in k-Group
- Rotate List

### **Time Complexity:** O(n)

---

## 7. Tree BFS

### **When to Use:**
- Level order traversal
- Connect level order siblings
- Zigzag traversal
- Minimum depth

### **Template:**
```python
from collections import deque

def tree_bfs(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result
```

### **Example Problems:**
- Binary Tree Level Order Traversal
- Zigzag Traversal
- Minimum Depth of Binary Tree
- Connect Level Order Siblings

### **Time Complexity:** O(n)

---

## 8. Tree DFS

### **When to Use:**
- Path sum problems
- All paths from root to leaf
- Tree traversals (inorder, preorder, postorder)

### **Template:**
```python
def tree_dfs(root, target_sum, current_path=[]):
    if not root:
        return False
    
    current_path.append(root.val)
    
    # If leaf node
    if not root.left and not root.right:
        if sum(current_path) == target_sum:
            return True
    
    # Recurse
    result = (tree_dfs(root.left, target_sum, current_path) or 
              tree_dfs(root.right, target_sum, current_path))
    
    # Backtrack
    current_path.pop()
    
    return result
```

### **Example Problems:**
- Path Sum
- All Paths for a Sum
- Sum of Path Numbers
- Path With Maximum Sum

### **Time Complexity:** O(n)

---

## 9. Two Heaps

### **When to Use:**
- Find median of stream
- Sliding window median
- Maintain running statistics

### **Template:**
```python
import heapq

class MedianFinder:
    def __init__(self):
        self.max_heap = []  # Left half (negated)
        self.min_heap = []  # Right half
    
    def add_num(self, num):
        if not self.max_heap or num <= -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
        else:
            heapq.heappush(self.min_heap, num)
        
        # Balance heaps
        if len(self.max_heap) > len(self.min_heap) + 1:
            heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        elif len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
    
    def find_median(self):
        if len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2
        return -self.max_heap[0]
```

### **Example Problems:**
- Find Median from Data Stream
- Sliding Window Median
- IPO
- Maximize Capital

### **Time Complexity:** O(log n) per insert

---

## 10. Subsets (Backtracking)

### **When to Use:**
- Generate all combinations
- Generate all permutations
- Generate all subsets
- N-Queens, Sudoku

### **Template:**
```python
def subsets(nums):
    result = []
    
    def backtrack(start, current):
        result.append(current[:])  # Add copy
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # Backtrack
    
    backtrack(0, [])
    return result
```

### **Example Problems:**
- Subsets
- Subsets with Duplicates
- Permutations
- Combination Sum

### **Time Complexity:** O(2ⁿ) for subsets, O(n!) for permutations

---

## 11. Modified Binary Search

### **When to Use:**
- Sorted or rotated sorted array
- Find element in infinite array
- Search in 2D matrix

### **Template:**
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

### **Example Problems:**
- Binary Search
- Search in Rotated Sorted Array
- Search in 2D Matrix
- Find Minimum in Rotated Sorted Array

### **Time Complexity:** O(log n)

---

## 12. Top K Elements

### **When to Use:**
- Find top K largest/smallest
- Kth largest element
- K closest points

### **Template:**
```python
import heapq

def top_k_elements(arr, k):
    # Min heap of size k
    heap = []
    
    for num in arr:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    
    return heap
```

### **Example Problems:**
- Kth Largest Element
- K Closest Points to Origin
- Top K Frequent Elements
- Kth Smallest Element in Sorted Matrix

### **Time Complexity:** O(n log k)

---

## 13. K-way Merge

### **When to Use:**
- Merge K sorted arrays/lists
- Smallest range in K lists

### **Template:**
```python
import heapq

def merge_k_sorted(lists):
    heap = []
    result = []
    
    # Add first element from each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        
        # Add next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))
    
    return result
```

### **Example Problems:**
- Merge K Sorted Lists
- Kth Smallest Number in M Sorted Lists
- Smallest Range Covering K Lists

### **Time Complexity:** O(n log k)

---

## 14. Topological Sort

### **When to Use:**
- Dependency resolution
- Course schedule
- Build order

### **Template:**
```python
from collections import deque, defaultdict

def topological_sort(vertices, edges):
    graph = defaultdict(list)
    in_degree = {i: 0 for i in range(vertices)}
    
    # Build graph
    for parent, child in edges:
        graph[parent].append(child)
        in_degree[child] += 1
    
    # Find sources (in_degree == 0)
    queue = deque([v for v in in_degree if in_degree[v] == 0])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for child in graph[vertex]:
            in_degree[child] -= 1
            if in_degree[child] == 0:
                queue.append(child)
    
    return result if len(result) == vertices else []
```

### **Example Problems:**
- Course Schedule
- Course Schedule II
- Alien Dictionary
- Sequence Reconstruction

### **Time Complexity:** O(V + E)

---

## 15. 0/1 Knapsack (DP)

### **When to Use:**
- Subset sum
- Equal subset partition
- Can achieve target with given items

### **Template:**
```python
def knapsack(weights, profits, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    profits[i-1] + dp[i-1][w - weights[i-1]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]
```

### **Example Problems:**
- 0/1 Knapsack
- Subset Sum
- Equal Subset Partition
- Target Sum

### **Time Complexity:** O(n × capacity)

---

## 16. Fibonacci Numbers (DP)

### **When to Use:**
- Current state depends on previous states
- Climbing stairs
- House robber

### **Template:**
```python
def fibonacci(n):
    if n <= 1:
        return n
    
    prev, curr = 0, 1
    
    for i in range(2, n + 1):
        prev, curr = curr, prev + curr
    
    return curr
```

### **Example Problems:**
- Fibonacci Number
- Climbing Stairs
- House Robber
- Jump Game

### **Time Complexity:** O(n)

---

## 17. Palindromic Subsequence (DP)

### **When to Use:**
- Longest palindromic substring/subsequence
- Count palindromic substrings

### **Template:**
```python
def longest_palindromic_subsequence(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    
    # Every single character is a palindrome
    for i in range(n):
        dp[i][i] = 1
    
    # Check substrings of length 2 to n
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            
            if s[i] == s[j]:
                dp[i][j] = 2 + dp[i+1][j-1]
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    
    return dp[0][n-1]
```

### **Example Problems:**
- Longest Palindromic Subsequence
- Longest Palindromic Substring
- Count Palindromic Substrings
- Minimum Deletions to Make Palindrome

### **Time Complexity:** O(n²)

---

## 18. Longest Common Substring (DP)

### **When to Use:**
- Compare two strings
- Edit distance
- Longest common subsequence

### **Template:**
```python
def longest_common_substring(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_length = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
                max_length = max(max_length, dp[i][j])
            else:
                dp[i][j] = 0
    
    return max_length
```

### **Example Problems:**
- Longest Common Substring
- Longest Common Subsequence
- Edit Distance
- Minimum ASCII Delete Sum

### **Time Complexity:** O(m × n)

---

## 🎯 How to Use This Cheatsheet

### **While Learning:**
1. Study one pattern at a time
2. Understand the template
3. Solve 5-10 problems with that pattern
4. Move to next pattern

### **Before Interviews:**
1. Review all templates
2. Practice recognizing patterns in random problems
3. Time yourself implementing each template from memory

### **During Interviews:**
1. Identify the pattern quickly
2. Explain the pattern to interviewer
3. Implement the template
4. Adjust for specific problem

---

## 🚀 Pattern Recognition Tips

**Ask yourself:**
- Is the array sorted? → Two Pointers or Binary Search
- Need subarray/substring? → Sliding Window
- Linked list problem? → Fast & Slow Pointers
- Tree problem? → BFS or DFS
- Need top/min/max K elements? → Heap
- Combinatorial problem? → Backtracking
- Optimization problem? → Dynamic Programming
- Graph dependencies? → Topological Sort

---

**Master these 18 patterns, and you'll handle 90% of interview questions!** 🎯

---

**Last Updated:** January 7, 2026
