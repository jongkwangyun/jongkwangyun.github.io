from collections import deque

def find_min_operations(A, B):
    queue = deque([(A, 1)])  # 초기 값과 연산 횟수
    visited = set()  # 방문 처리: 탐색 속도 향상을 위해 set 사용

    while queue:
        current, count = queue.popleft()

        # 목표 값에 도달
        if current == B:
            return count

        # 가능한 연산 수행
        for next_num in (current * 2, current * 10 + 1):
            if next_num <= B and next_num not in visited:  # B를 초과하지 않고 방문하지 않은 경우
                visited.add(next_num)  # 방문 처리
                queue.append((next_num, count + 1))

    return -1  # 목표 값에 도달할 수 없는 경우

# 입력
A, B = map(int, input().split())
print(find_min_operations(A, B))