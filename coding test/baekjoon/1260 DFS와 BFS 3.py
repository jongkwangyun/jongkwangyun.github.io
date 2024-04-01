from collections import deque

def dfs(graph, start, visited):
    visited[start] = True
    print(start, end=" ")

    for neighbor in sorted(graph[start]):
        if not visited[neighbor]:
            dfs(graph, neighbor, visited)

def bfs(graph, start, visited):
    queue = deque([start])
    visited[start] = True

    while queue:
        node = queue.popleft()
        print(node, end=" ")

        for neighbor in sorted(graph[node]):
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)

# 입력 받기
N, M, V = map(int, input().split())

# 그래프 초기화
graph = [[] for _ in range(N+1)]

# 간선 정보 입력 받기
for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

# 각 정점 방문 여부 확인을 위한 리스트
visited = [False] * (N+1)

# DFS와 BFS 수행
dfs(graph, V, visited)
print()
visited = [False] * (N+1)
bfs(graph, V, visited)
