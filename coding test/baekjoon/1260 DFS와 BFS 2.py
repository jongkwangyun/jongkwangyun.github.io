from collections import defaultdict, deque

def dfs(graph, start):
    visited = []
    stack = [start]

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.append(node)
            stack.extend(sorted(graph[node], reverse=True))

    return visited

def bfs(graph, start):
    visited = []
    queue = deque([start])

    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.append(node)
            queue.extend(sorted(graph[node]))

    return visited

# 입력 받기
N, M, V = map(int, input().split())
graph = defaultdict(list)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

# DFS와 BFS 수행
dfs_result = dfs(graph, V)
bfs_result = bfs(graph, V)

# 결과 출력
print(' '.join(map(str, dfs_result)))
print(' '.join(map(str, bfs_result)))
