import sys


def solve():
    data = sys.stdin.read().strip().split()
    test_cases = int(data[0])
    index = 1

    for _ in range(test_cases):
        x = int(data[index])
        n = int(data[index + 1])
        index += 2
        print(x if n % 2 == 1 else 0)


if __name__ == "__main__":
    solve()
