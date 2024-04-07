import sys

input = sys.stdin.readline

step = 0


def dfs(miro, x, y):
    global step
    step += 1

    # (N, M) 에 도착했으면
    if x == M-1 and y == N-1:
        print(x, y, step, "end")
        return step

    # 한 걸음 가기
    print(x, y, step)

    # 상
    if y > 0 and miro[y-1][x] == '1':
        miro[y][x] = 'v'
        y -= 1
        dfs(miro, x, y)

    # 하
    if y < N-1 and miro[y+1][x] == '1':
        miro[y][x] = 'v'
        y += 1
        dfs(miro, x, y)

    # 좌
    if x > 0 and miro[y][x-1] == '1':
        miro[y][x] = 'v'
        x -= 1
        dfs(miro, x, y)

    # 우
    if x < M-1 and miro[y][x+1] == '1':
        miro[y][x] = 'v'
        x += 1
        dfs(miro, x, y)

    step -= 1

N, M = map(int, input().split())
miro = []

for i in range(N):
    a = list(input().strip())
    miro.append(a)

result = dfs(miro, 0, 0)
print(result)