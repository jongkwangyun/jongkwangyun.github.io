from collections import deque

def bfs(graph, visited, start_n):
    q = deque([start_n])

    while q:
        n = q.popleft()
        if not visited[n]:
            visited[n] = True
            q.extend(graph[n])


N, M = map(int, input().split())

graph = [[] for _ in range(N + 1)]
visited = [True] * (N + 1)
connected_components = 0

# 간선 입력
for _ in range(M):
    u, v = map(int, input().split())
    visited[u], visited[v] = False, False
    graph[u].append(v)
    graph[v].append(u)

# 연결 요소 개수 찾기
for i in range(1, N + 1):
    if not visited[i]:
        bfs(graph, visited, i)
        connected_components += 1

print(connected_components)