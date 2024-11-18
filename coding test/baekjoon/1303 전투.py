from collections import deque

DIR = [(0, -1), (0, 1), (-1, 0), (1, 0)]  # 상하좌우


def bfs(matrix, start_x, start_y, color):
    q = deque([(start_x, start_y)])
    matrix[start_y][start_x] = 'V'  # 방문처리
    near_counts = 1

    while q:
        x, y = q.popleft()
        for dx, dy in DIR:
            nx, ny = x + dx, y + dy
            if 0 <= nx < N and 0 <= ny < M and matrix[ny][nx] == color:
                matrix[ny][nx] = 'V'  # 방문처리
                near_counts += 1  # 근접 병사 합 증가
                q.append((nx, ny))

    return near_counts * near_counts


N, M = map(int, input().split())
matrix = [list(input()) for _ in range(M)]
W_power = 0
B_power = 0

for j in range(M):
    for i in range(N):
        if matrix[j][i] != 'V':
            if matrix[j][i] == 'W':
                W_power += bfs(matrix, i, j, 'W')
            elif matrix[j][i] == 'B':
                B_power += bfs(matrix, i, j, 'B')

print(W_power, B_power)