from collections import deque


def bfs(start):
    if start >= K:
        return start - K, 1

    queue = deque([(start, 0)])
    visited = {start}  # set
    answer = {'step': 0, 'count': 0}

    while queue:
        for _ in range(len(queue)):
            current, step = queue.popleft()

            # 3가지 방법 이동
            for move in (2 * current, current + 1, current - 1):

                # K와 만나면
                if move == K:
                    if answer['step'] == 0:
                        answer['step'] = step + 1
                    answer['count'] += 1

                # K와 안 만나면
                elif move not in visited:
                    queue.append((move, step + 1))
                    visited.add(move)  # 방문처리

        if answer['count'] != 0:
            return answer['step'], answer['count']


N, K = map(int, input().split())

print(*bfs(N), sep='\n')
# 메모리 초과