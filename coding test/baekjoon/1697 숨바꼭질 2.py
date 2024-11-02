def bfs(N, K):
    secs = [0] * 100000
    queue = [N]
    during_sec = 0

    while queue:
        next_N = queue.pop(0)

        # N과 K가 같은 위치면
        if next_N == K:
            return secs[next_N]

        # 아니면 1초 증가
        during_sec += 1

        # queue에 넣기
        secs[next_N + 1] = during_sec
        secs[next_N - 1] = during_sec
        secs[next_N * 2] = during_sec
        queue.append(next_N + 1)
        queue.append(next_N - 1)
        queue.append(next_N * 2)


N, K = map(int, input().split(' '))

meet_sec = bfs(N, K)

print(meet_sec)

# indexError