from collections import deque

DIRECTIONS = [(0, -1), (0, 1), (-1, 0), (1, 0)]  # 상하좌우


def bfs(matrix, start_x, start_y):
    q = deque([(start_x, start_y)])
    matrix[start_y][start_x] = 0  # 방문처리
    counts = 1

    while q:
        x, y = q.popleft()
        for dx, dy in DIRECTIONS:
            nx, ny = x + dx, y + dy
            if 0 <= nx < M and 0 <= ny < N and matrix[ny][nx] == 1:
                matrix[ny][nx] = 0  # 방문처리
                q.append((nx, ny))
                counts += 1  # 음식물 1 증가

    return counts


N, M, K = map(int, input().split())
matrix = [[0] * M for _ in range(N)]  # 음식물 없음 0, 있음 1
max_counts = 0

for _ in range(K):
    r, c = map(int, input().split())
    matrix[r - 1][c - 1] = 1

for y in range(N):
    for x in range(M):
        if matrix[y][x] == 1:
            counts = bfs(matrix, x, y)
            max_counts = counts if counts > max_counts else max_counts

print(max_counts)