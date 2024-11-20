from collections import deque


def find_shortest_time_and_paths(N, K):
    MAX = min(max(N, K) * 2, 100001)  # 범위 제한
    visited = [-1] * MAX  # 방문 여부 및 도달 시간을 저장 (-1: 미방문)
    ways = [0] * MAX  # 경로 수 저장

    queue = deque([N])  # 시작 위치
    visited[N] = 0  # 시작 위치 시간 0
    ways[N] = 1  # 시작 위치 경로 수 1

    while queue:
        current = queue.popleft()

        for next_pos in (current - 1, current + 1, current * 2):  # 가능한 이동
            if 0 <= next_pos < MAX:
                # 처음 방문하는 경우
                if visited[next_pos] == -1:
                    visited[next_pos] = visited[current] + 1  # 시간 갱신
                    ways[next_pos] = ways[current]  # 경로 수 복사
                    queue.append(next_pos)
                # 같은 시간에 도달한 경우
                elif visited[next_pos] == visited[current] + 1:
                    ways[next_pos] += ways[current]  # 경로 수 누적

    return visited[K], ways[K]


# 입력
N, K = map(int, input().split())
time, path_count = find_shortest_time_and_paths(N, K)

# 출력
print(time)
print(path_count)