import sys
from collections import deque

input = sys.stdin.readline


def bfs(graph, visited, start):
    queue = deque([start])
    visited[start] = True

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)


N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
visited = [False] * (N + 1)
connected_components = 0

# 간선 입력
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

# 연결 요소 개수 찾기
for i in range(1, N + 1):
    if not visited[i]:
        bfs(graph, visited, i)
        connected_components += 1

print(connected_components)