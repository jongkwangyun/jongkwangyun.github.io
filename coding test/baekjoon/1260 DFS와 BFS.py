import sys


def dfs(graph, v, visited):
    # 현재 노드 방문 처리
    visited[v] = True
    print(v, end=' ')
    # 현재 노드에 연결된 다른 노드 재귀적 방문
    for i in sorted(graph[v]):
        if not visited[i]:
            dfs(graph, i, visited)


def bfs(graph, start, visited):
    queue = []
    queue.append(start)
    visited[start] = True
    while queue:
        v = queue.pop(0)
        print(v, end=' ')

        for i in sorted(graph[v]):
            if not visited[i]:
                queue.append(i)
                visited[i] = True


# 정점 개수 N, 간선 개수 M, 시작 정점 번호 V
N, M, V = list(map(int, sys.stdin.readline().split()))

# 빈 list 로 정점 개수만큼 채우기. index 0 은 미사용
graph = [[] for _ in range(N+1)]
visited = [False] * (N+1)

# M 번 입력 받아서 연결된 수만큼 넣기
for i in range(M):
    a, b = map(int, sys.stdin.readline().split())
    graph[a].append(b)
    graph[b].append(a)


dfs(graph, V, visited)
print()
visited = [False] * (N+1)
bfs(graph, V, visited)