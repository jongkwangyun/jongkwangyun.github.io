from collections import deque



def bfs(square, start_x, start_y):
    directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]
    house_count = 1
    queue = deque([(start_x, start_y)])
    square[start_y][start_x] = -1  # 방문처리

    while queue:
        x, y = queue.popleft()

        # 상하좌우 에 집이 있는지
        for dx, dy in directions:
            nx, ny = x + dx, y + dy

            # 집이 있냐
            if 0 <= nx < N and 0 <= ny < N and square[ny][nx] == 1:
                square[ny][nx] = -1  # 방문처리
                house_count += 1
                queue.append((nx, ny))

    return house_count


N = int(input())
square = [list(map(int, input())) for _ in range(N)]
house_counts = []

for y in range(N):
    for x in range(N):
        if square[y][x] == 1:
            house_counts.append(bfs(square, x, y))

house_counts.sort()

print(len(house_counts))
print(*house_counts, sep='\n')