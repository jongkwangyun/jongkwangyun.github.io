import time
import sys

start_time = time.time()

# input = sys.stdin.readline


def bfs(miro, y, x):
    queue = [(y, x)]

    while queue:
        ny, nx = queue.pop(0)
        num = miro[ny][nx]

        # 상하좌우 검사
        if 0 <= nx < M and 0 <= ny - 1 < N and miro[ny - 1][nx] == 1:
            miro[ny - 1][nx] = num + 1
            queue.append((ny - 1, nx))
        if 0 <= nx < M and 0 <= ny + 1 < N and miro[ny + 1][nx] == 1:
            miro[ny + 1][nx] = num + 1
            queue.append((ny + 1, nx))
        if 0 <= nx - 1 < M and 0 <= ny < N and miro[ny][nx - 1] == 1:
            miro[ny][nx - 1] = num + 1
            queue.append((ny, nx - 1))
        if 0 <= nx + 1 < M and 0 <= ny < N and miro[ny][nx + 1] == 1:
            miro[ny][nx + 1] = num + 1
            queue.append((ny, nx + 1))


N, M = map(int, input().split(' '))

miro = []

# 미로 받기
for i in range(N):
    row = list(map(int, input()))
    miro.append(row)

bfs(miro, 0, 0)

print(miro[N - 1][M - 1])

end_time = time.time()
print(end_time - start_time, 'ns')