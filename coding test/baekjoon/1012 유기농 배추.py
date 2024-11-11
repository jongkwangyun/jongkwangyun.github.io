import sys
sys.setrecursionlimit(10000)

directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

def dfs(matrix, x, y):
    if matrix[y][x] == 1:
        matrix[y][x] = 'v'

        for dy, dx in directions:
            ny = y + dy
            nx = x + dx

            if 0 <= ny < N and 0 <= nx < M and matrix[ny][nx] == 1:
                dfs(matrix, nx, ny)

        return True


T = int(input())
worm_counts = []

for test_case in range(T):
    # 각 test_case 별
    M, N, K = map(int, input().split())
    worm_count = 0

    # 배추밭
    matrix = [[0] * M for _ in range(N)]

    for _ in range(K):
        j, i = map(int, input().split())
        matrix[i][j] = 1

    for y in range(N):
        for x in range(M):
            if matrix[y][x] == 1 and dfs(matrix, x, y):
                worm_count += 1

    worm_counts.append(worm_count)

print(*worm_counts)