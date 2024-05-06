import sys

input = sys.stdin.readline


def bfs(matrix, N):
    houses = []
    num = 1

    for y in range(N):
        for x in range(N):
            if matrix[y][x] == -1:
                houses.append((y, x))

                while houses:
                    j, i = houses.pop(0)
                    matrix[j][i] = num

                    # 상
                    if j > 0 and matrix[j - 1][i] == -1:
                        houses.append((j - 1, i))

                    # 하
                    if j < N - 1 and matrix[j + 1][i] == -1:
                        houses.append((j + 1, i))

                    # 좌
                    if i > 0 and matrix[j][i - 1] == -1:
                        houses.append((j, i - 1))

                    # 우
                    if i < N - 1 and matrix[j][i + 1] == -1:
                        houses.append((j, i + 1))

                num += 1

    num -= 1

    # matrix 에서 꺼내서 세기
    nums = []

    # print(matrix)
    for row in matrix:
        for e in row:
            if not e == 0:
                nums.append(e)

    set_nums = set(nums)

    # 출력
    print(num)

    for e in set_nums:
        print(nums.count(e))


N = int(input())
matrix = []

for _ in range(N):
    row = [-int(i) for i in list(input().strip())]
    matrix.append(row)


bfs(matrix, N)