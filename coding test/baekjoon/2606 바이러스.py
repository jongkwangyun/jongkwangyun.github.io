def bfs(network, infected):
    infected[1] = True
    connected = []
    connected.extend(network[1])

    while connected:
        a = connected.pop(0)

        if not infected[a]:
            infected[a] = True
            connected.extend(network[a])

    infected[1] = False
    return infected.count(True)


c_cnt = int(input())
in_cnt = int(input())

network = [[] for _ in range(c_cnt + 1)]
infected = [False] * (c_cnt + 1)

for _ in range(in_cnt):
    a, b = map(int, input().split())
    network[a].append(b)
    network[b].append(a)

result = bfs(network, infected)
print(result)