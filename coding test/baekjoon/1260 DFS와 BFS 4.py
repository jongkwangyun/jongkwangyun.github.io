N, M, V = map(int, input().split(' '))


def dfs(graph, start, visited, order):
    visited[start] = True
    order.append(start)

    for e in graph[start]:
        if not visited[e]:
            dfs(graph, e, visited, order)


def bfs(graph, start, visited, order):
    queue = [start]

    while queue:
        item = queue.pop(0)
        if not visited[item]:
            visited[item] = True
            order.append(item)
            queue.extend(graph[item])


graph = [[] for _ in range(N + 1)]

for _ in range(M):
    A, B = map(int, input().split(' '))
    graph[A].append(B)
    graph[B].append(A)

visited = [False] * (N + 1)
order = []
dfs(graph, V, visited, order)
print(' '.join(map(str, order)))

visited = [False] * (N + 1)
order = []
bfs(graph, V, visited, order)
print(' '.join(map(str, order)))