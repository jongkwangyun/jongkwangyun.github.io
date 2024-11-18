from collections import deque

# 나이트 이동 가능한 칸
MOVABLE = [(1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1), (-2, -1), (-1, -2)]


def bfs(I, start_q, visited):
    q = deque(start_q)
    next_q = deque([])

    while q:
        x, y = q.popleft()

        # 나이트 이동 가능시 q에 넣기
        for dx, dy in MOVABLE:
            nx, ny = x + dx, y + dy

            # 체크 판 범위 내, 방문처리 한적 없으면
            if 0 <= nx < I and 0 <= ny < I and visited[ny][nx] is False:
                visited[ny][nx] = True  # 방문처리
                next_q.append((nx, ny))

    return next_q


T = int(input())  # 테스트 케이스

for test_case in range(T):
    I = int(input())  # 한 변의 길이
    x, y = map(int, input().split())  # 시작위치
    end_x, end_y = map(int, input().split())  # 종료위치

    # 시작위치와 종료위치가 같으면 테스트 케이스 넘어감
    if (x, y) == (end_x, end_y):
        print(0)
        continue

    visited = [[False] * I for _ in range(I)]

    q = [(x, y)]  # 초기 위치
    counts = 0  # 이동횟수

    visited[y][x] = True  # 방문처리

    while True:
        next_q = bfs(I, q, visited)
        counts += 1

        # next_q 에 끝 위치 들어있는지 검사
        if (end_x, end_y) in next_q:
            print(counts)
            break

        # 이동한 위치로 q 교체
        q = next_q