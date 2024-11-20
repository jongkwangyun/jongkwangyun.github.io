from collections import deque


def bfs(start):
    if start >= K:
        return start - K, 1  # 수빈이가 K보다 앞에 있으면 단순히 -1씩 이동

    max_limit = 100000  # 탐색 범위 제한
    visited = [0] * (max_limit + 1)  # 방문 시간 기록 (0은 미방문)
    queue = deque([start])
    visited[start] = 1  # 시작점 방문 처리 (1은 시작 시간)

    count = 0  # 동생을 찾는 방법의 수
    while queue:
        current = queue.popleft()

        # 동생을 찾은 경우
        if current == K:
            count += 1  # 방법 수 증가
            continue  # 동생을 찾았으므로 추가 탐색 생략

        # BFS 탐색 (X-1, X+1, 2*X)
        for move in (current - 1, current + 1, current * 2):
            if 0 <= move <= max_limit:
                # 아직 방문하지 않았거나, 같은 시간에 방문할 수 있는 경우
                if visited[move] == 0 or visited[move] == visited[current] + 1:
                    visited[move] = visited[current] + 1  # 시간 갱신
                    queue.append(move)

    # 가장 빠른 시간과 해당 경로 수 반환
    return visited[K] - 1, count


N, K = map(int, input().split())
print(*bfs(N), sep='\n')