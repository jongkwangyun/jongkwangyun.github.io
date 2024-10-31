from collections import deque

# BFS 큐 사용
N, M, K, X = map(int, input().split(' '))

directions = [[] for _ in range(N+1)]
distance = [0] * (N + 1)
queue = deque()

for _ in range(M):
    A, B = map(int, input().split(' '))
    directions[A].append(B)
print(directions)
# queue.append(directions[X])
#
# while queue:
#     distance[directions[X]] = 1
#     queue.append(directions[x])