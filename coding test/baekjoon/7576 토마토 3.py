import sys
from collections import deque

input = sys.stdin.readline

# 상하좌우 방향 설정
DIRECTIONS = [(0, -1), (0, 1), (-1, 0), (1, 0)]

def bfs(box, ripe_tomatoes):
    queue = deque(ripe_tomatoes)
    next_day_queue = []

    while queue:
        x, y = queue.popleft()

        for dx, dy in DIRECTIONS:
            nx, ny = x + dx, y + dy
            if 0 <= nx < M and 0 <= ny < N and box[ny][nx] == 0:
                box[ny][nx] = 1  # 익히기
                next_day_queue.append((nx, ny))

    return box, next_day_queue


# 입력 받기
M, N = map(int, input().split())  # 가로 칸 수(M), 세로 칸 수(N)
box = [list(map(int, input().split())) for _ in range(N)]

days = 0
ripe_tomatoes = deque([])

# 초기 익은 토마토 위치 찾기
for y in range(N):
    for x in range(M):
        if box[y][x] == 1:
            ripe_tomatoes.append((x, y))

# BFS를 통해 토마토 익히기
while True:
    box, ripe_tomatoes = bfs(box, ripe_tomatoes)

    if not ripe_tomatoes:  # 다음날 익을 토마토가 없는 경우
        unripe_count = sum(row.count(0) for row in box)
        if unripe_count == 0:
            break  # 모든 토마토 익음
        days = -1
        break  # 익지 못하는 토마토 존재

    days += 1

print(days)