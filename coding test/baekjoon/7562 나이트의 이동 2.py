from collections import deque

# 나이트가 이동할 수 있는 8가지 방향
MOVABLE = [(1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1), (-2, -1), (-1, -2)]


def bfs(board_size, start, end):
    queue = deque([start])  # 시작 위치를 큐에 넣음
    visited = [[False] * board_size for _ in range(board_size)]
    visited[start[1]][start[0]] = True  # 시작 위치 방문 처리
    moves = 0  # 이동 횟수

    while queue:
        for _ in range(len(queue)):
            x, y = queue.popleft()

            # 도착 위치에 도달하면 이동 횟수 반환
            if (x, y) == end:
                return moves

            # 나이트가 이동할 수 있는 모든 위치 탐색
            for dx, dy in MOVABLE:
                nx, ny = x + dx, y + dy

                # 체스판 범위 내에서 아직 방문하지 않은 위치만 탐색
                if 0 <= nx < board_size and 0 <= ny < board_size and not visited[ny][nx]:
                    visited[ny][nx] = True
                    queue.append((nx, ny))

        moves += 1  # 현재 깊이(거리)에서 탐색 완료 후 이동 횟수 증가

    return -1  # 도달할 수 없는 경우 (문제 조건에서는 발생하지 않음)


# 입력 처리 및 테스트 케이스 실행
T = int(input())  # 테스트 케이스 수

for _ in range(T):
    board_size = int(input())  # 체스판 크기
    start = tuple(map(int, input().split()))  # 시작 위치
    end = tuple(map(int, input().split()))  # 종료 위치

    # 시작 위치와 종료 위치가 같으면 0 출력
    if start == end:
        print(0)
    else:
        print(bfs(board_size, start, end))