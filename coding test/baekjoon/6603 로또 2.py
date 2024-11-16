def find_combinations(S, combination, start):
    # 조합이 6개의 숫자로 채워지면 출력
    if len(combination) == 6:
        print(*combination)
        return

    # S 리스트의 각 숫자를 선택해 조합을 구성
    for i in range(start, len(S)):
        # 현재 숫자를 조합에 추가하고 다음 숫자를 재귀적으로 탐색
        find_combinations(S, combination + [S[i]], i + 1)


while True:
    input_data = list(map(int, input().split()))
    k = input_data[0]
    if k == 0:
        break
    S = input_data[1:]

    # 조합 찾기 시작
    find_combinations(S, [], 0)
    print()  # 테스트 케이스 사이에 빈 줄 출력