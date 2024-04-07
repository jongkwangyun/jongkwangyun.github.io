import sys
from collections import deque

input = sys.stdin.readline

def bfs(miro, N, M):
    visited = [[False] * M for _ in range(N)]
    position = deque([(0, 0, 1)])
    visited[0][0] = True

    while position:
        # 하나씩 꺼내서 방문 처리
        y, x, step = position.popleft()

        # 결승점이면 끝
        if y == N-1 and x == M-1:
            return step

        # 상
        if y > 0 and not visited[y-1][x] and miro[y-1][x] == '1':
            position.append((y-1, x, step+1))
            visited[y-1][x] = True

        # 하
        if y < N-1 and not visited[y+1][x] and miro[y+1][x] == '1':
            position.append((y+1, x, step+1))
            visited[y+1][x] = True

        # 좌
        if x > 0 and not visited[y][x-1] and miro[y][x-1] == '1':
            position.append((y, x-1, step+1))
            visited[y][x-1] = True

        # 우
        if x < M-1 and not visited[y][x+1] and miro[y][x+1] == '1':
            position.append((y, x+1, step+1))
            visited[y][x+1] = True


N, M = map(int, input().split())
miro = []

for _ in range(N):
    row = list(input().strip())
    miro.append(row)

result = bfs(miro, N, M)
print(result)