from collections import deque

A, B = map(int, input().split())

q = deque([A])
visited = set([A])
counts = 1
found = False

while q:
    counts += 1

    for _ in range(len(q)):
        a = q.popleft()

        a_set = (a * 10 + 1, a * 2)
        if B in a_set:
            found = True
            break

        for number in a_set:
            if (number*2 <= B) and (number not in visited):
                visited.add(number)  # 방문 처리
                q.append(number)

    if found:
        break

    if not q:
        counts = -1
        break

print(counts)