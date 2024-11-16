from itertools import combinations

while True:
    input_data = list(map(int, input().split()))
    k = input_data[0]
    if k == 0:
        break
    S = input_data[1:]

    for comb in combinations(S, 6):
        print(*comb)
    print()  # 테스트 케이스 사이에 빈 줄 출력