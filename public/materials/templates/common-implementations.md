# 📋 Code Templates Library

> **Ready-to-use implementations for interviews**

---

## 🎯 Purpose

These are **battle-tested templates** you can quickly adapt in interviews.

**Memorize the structure, understand the logic.**

---

## 📚 Table of Contents

1. [Linked List Node](#1-linked-list-node)
2. [Tree Node](#2-tree-node)
3. [Graph Representations](#3-graph-representations)
4. [Binary Search](#4-binary-search)
5. [Sorting Algorithms](#5-sorting-algorithms)
6. [Tree Traversals](#6-tree-traversals)
7. [Graph Traversals](#7-graph-traversals)
8. [Trie](#8-trie)
9. [Union Find](#9-union-find)
10. [Segment Tree](#10-segment-tree)

---

## 1. Linked List Node

### **Singly Linked List**
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Create list: 1 -> 2 -> 3
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

# Traverse
current = head
while current:
    print(current.val)
    current = current.next
```

### **Common Operations**
```python
# Insert at beginning
def insert_at_head(head, val):
    new_node = ListNode(val)
    new_node.next = head
    return new_node

# Insert at end
def insert_at_tail(head, val):
    new_node = ListNode(val)
    if not head:
        return new_node
    
    current = head
    while current.next:
        current = current.next
    current.next = new_node
    return head

# Delete node with value
def delete_node(head, val):
    if not head:
        return None
    
    if head.val == val:
        return head.next
    
    current = head
    while current.next:
        if current.next.val == val:
            current.next = current.next.next
            return head
        current = current.next
    return head

# Reverse linked list
def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev

# Find middle (Fast & Slow pointers)
def find_middle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow

# Detect cycle
def has_cycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False
```

---

## 2. Tree Node

### **Binary Tree Node**
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Create tree:
#       1
#      / \
#     2   3
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
```

### **Binary Search Tree Operations**
```python
# Insert into BST
def insert_bst(root, val):
    if not root:
        return TreeNode(val)
    
    if val < root.val:
        root.left = insert_bst(root.left, val)
    else:
        root.right = insert_bst(root.right, val)
    
    return root

# Search in BST
def search_bst(root, val):
    if not root or root.val == val:
        return root
    
    if val < root.val:
        return search_bst(root.left, val)
    return search_bst(root.right, val)

# Find min/max in BST
def find_min(root):
    while root and root.left:
        root = root.left
    return root

def find_max(root):
    while root and root.right:
        root = root.right
    return root

# Validate BST
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    
    if root.val <= min_val or root.val >= max_val:
        return False
    
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
```

---

## 3. Graph Representations

### **Adjacency List**
```python
# Using dictionary
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Using defaultdict
from collections import defaultdict
graph = defaultdict(list)
edges = [('A', 'B'), ('A', 'C'), ('B', 'D')]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # For undirected
```

### **Adjacency Matrix**
```python
n = 4  # Number of vertices
graph = [[0] * n for _ in range(n)]

# Add edge between i and j
graph[i][j] = 1
graph[j][i] = 1  # For undirected
```

### **Edge List**
```python
edges = [
    (0, 1, 5),   # (from, to, weight)
    (1, 2, 3),
    (2, 3, 7)
]
```

---

## 4. Binary Search

### **Standard Binary Search**
```python
def binary_search(arr, target):
    """Find target in sorted array"""
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

### **Find First Occurrence**
```python
def first_occurrence(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### **Find Last Occurrence**
```python
def last_occurrence(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### **Search in Rotated Sorted Array**
```python
def search_rotated(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        
        # Left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
```

---

## 5. Sorting Algorithms

### **Merge Sort**
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Time: O(n log n), Space: O(n)
```

### **Quick Sort**
```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Time: O(n log n) average, O(n²) worst, Space: O(log n)
```

### **Heap Sort**
```python
def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Time: O(n log n), Space: O(1)
```

---

## 6. Tree Traversals

### **Preorder (Root, Left, Right)**
```python
# Recursive
def preorder(root, result=[]):
    if not root:
        return
    result.append(root.val)
    preorder(root.left, result)
    preorder(root.right, result)
    return result

# Iterative
def preorder_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result
```

### **Inorder (Left, Root, Right)**
```python
# Recursive
def inorder(root, result=[]):
    if not root:
        return
    inorder(root.left, result)
    result.append(root.val)
    inorder(root.right, result)
    return result

# Iterative
def inorder_iterative(root):
    result = []
    stack = []
    current = root
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        result.append(current.val)
        current = current.right
    
    return result
```

### **Postorder (Left, Right, Root)**
```python
# Recursive
def postorder(root, result=[]):
    if not root:
        return
    postorder(root.left, result)
    postorder(root.right, result)
    result.append(root.val)
    return result

# Iterative
def postorder_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
    
    return result[::-1]  # Reverse
```

### **Level Order (BFS)**
```python
from collections import deque

def level_order(root):
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

---

## 7. Graph Traversals

### **DFS (Recursive)**
```python
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    print(node)  # Process node
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited
```

### **DFS (Iterative)**
```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        
        if node not in visited:
            visited.add(node)
            print(node)  # Process node
            
            # Add neighbors in reverse order to maintain order
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited
```

### **BFS**
```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        print(node)  # Process node
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited
```

### **Topological Sort (Kahn's Algorithm)**
```python
from collections import deque, defaultdict

def topological_sort(vertices, edges):
    graph = defaultdict(list)
    in_degree = {i: 0 for i in range(vertices)}
    
    # Build graph
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1
    
    # Find all sources
    queue = deque([v for v in in_degree if in_degree[v] == 0])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph[vertex]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return result if len(result) == vertices else []
```

### **Dijkstra's Shortest Path**
```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    heap = [(0, start)]  # (distance, node)
    
    while heap:
        current_dist, current_node = heapq.heappop(heap)
        
        if current_dist > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(heap, (distance, neighbor))
    
    return distances
```

---

## 8. Trie

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# Usage
trie = Trie()
trie.insert("apple")
trie.search("apple")      # True
trie.search("app")        # False
trie.starts_with("app")   # True
```

---

## 9. Union Find

```python
class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, x):
        """Find with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        """Union by rank"""
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False
        
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Usage
uf = UnionFind(5)
uf.union(0, 1)
uf.union(1, 2)
uf.connected(0, 2)  # True
```

---

## 10. Segment Tree

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if arr:
            self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2
            
            self.build(arr, left_child, start, mid)
            self.build(arr, right_child, mid + 1, end)
            
            self.tree[node] = self.tree[left_child] + self.tree[right_child]
    
    def query(self, node, start, end, l, r):
        """Query sum in range [l, r]"""
        if r < start or l > end:
            return 0
        
        if l <= start and end <= r:
            return self.tree[node]
        
        mid = (start + end) // 2
        left_child = 2 * node + 1
        right_child = 2 * node + 2
        
        left_sum = self.query(left_child, start, mid, l, r)
        right_sum = self.query(right_child, mid + 1, end, l, r)
        
        return left_sum + right_sum
    
    def update(self, node, start, end, idx, val):
        """Update value at index idx"""
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2
            
            if idx <= mid:
                self.update(left_child, start, mid, idx, val)
            else:
                self.update(right_child, mid + 1, end, idx, val)
            
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

# Usage
arr = [1, 3, 5, 7, 9, 11]
seg_tree = SegmentTree(arr)
seg_tree.query(0, 0, len(arr)-1, 1, 3)  # Sum from index 1 to 3
seg_tree.update(0, 0, len(arr)-1, 1, 10)  # Update index 1 to 10
```

---

## 🎯 How to Use These Templates

### **During Learning:**
1. Understand each line
2. Implement from scratch
3. Test with examples
4. Modify for variations

### **Before Interviews:**
1. Review all templates
2. Practice implementing from memory
3. Understand time/space complexity
4. Know when to use each

### **During Interviews:**
1. Recognize the pattern
2. Adapt the template
3. Explain what you're doing
4. Test with examples

---

**Master these templates, and you'll handle 90% of interview questions!** 🚀

---

**Last Updated:** January 7, 2026
