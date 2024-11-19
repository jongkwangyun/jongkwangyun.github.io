from collections import deque

A, B = map(int, input().split())

q = deque([A])
visited = deque([A])
counts = 1
is_while_break = False

while q:
    counts += 1

    for _ in range(len(q)):
        a = q.popleft()

        a_set = (a * 10 + 1, a * 2)
        if B in a_set:
            is_while_break = True
            break

        for number in a_set:
            if (number <= 10**9) and (number*2 <= B) and (number not in visited):
                visited.append(number)  # 방문 리스트 추가
                q.append(number)

    if is_while_break:
        break

    if not q:
        counts = -1
        break

print(counts)