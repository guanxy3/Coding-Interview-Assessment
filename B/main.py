import sys


def solve():
    data = sys.stdin.read().strip().split()
    test_cases = int(data[0])

    for index in range(1, test_cases + 1):
        n = int(data[index])

        if n < 4 or n % 2 == 1:
            print(-1)
            continue

        minimum_crafts = (n + 5) // 6
        maximum_crafts = n // 4
        print("%d %d" % (minimum_crafts, maximum_crafts))


if __name__ == "__main__":
    solve()
