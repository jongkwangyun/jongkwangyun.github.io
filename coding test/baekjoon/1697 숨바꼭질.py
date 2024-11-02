def bfs(N, K):
    queue = [(N, 0)]

    while queue:
        next_N, during_sec = queue.pop(0)

        # N과 K가 같은 위치면
        if next_N == K:
            return during_sec

        # 아니면 1초 증가
        during_sec += 1

        # queue에 넣기
        queue.append((next_N + 1, during_sec))
        queue.append((next_N - 1, during_sec))
        queue.append((next_N * 2, during_sec))


N, K = map(int, input().split(' '))

meet_sec = bfs(N, K)

print(meet_sec)

# 시간 초과