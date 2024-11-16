import copy
import sys

input = sys.stdin.readline

# 상하좌우 변수 설정
directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]

# 값 받기
M, N = map(int, input().split())
box = [list(map(int, input().split())) for _ in range(N)]

now_box = copy.deepcopy(box)
during_day = 0

while True:
    next_box = copy.deepcopy(now_box)

    for y in range(N):
        for x in range(M):
            # 현 위치가 토마토면
            if now_box[y][x] == 1:
                # 상하좌우 익히기
                for dx, dy in directions:
                    nx, ny = x + dx, y + dy

                    if 0 <= nx < M and 0 <= ny < N and now_box[ny][nx] == 0:
                        next_box[ny][nx] = 1  # 토마토 익히기

    # 0이 없으면 나가기
    sum_of_0 = sum([row.count(0) for row in now_box])
    if sum_of_0 == 0:
        break

    # 다 익으면 현재와 다음날의 익은 개수 비교
    now_sum = sum([row.count(1) for row in now_box])
    next_sum = sum([row.count(1) for row in next_box])

    # 만약 어제와 익은 개수가 똑같다면 while 나가기
    if now_sum == next_sum:
        during_day = -1
        break

    # 아니면 하루 경과
    during_day += 1
    now_box = copy.deepcopy(next_box)

print(during_day)