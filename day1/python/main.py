from sys import argv


def main():
    file_path = argv[-1]
    try:
        with open(file_path, "r") as file:
            leftLids, rightLids = get_sorted_location_ids(file)
            solution_a(leftLids, rightLids)
            solution_b(leftLids, rightLids)

    except FileNotFoundError:
        print("File not found")
    except IOError:
        print("An I/O error occured.")


def get_sorted_location_ids(file):
    leftLids, rightLids = [], []
    for line in file:
        leftNum, rightNum = line.split("   ")
        leftLids.append(int(leftNum))
        rightLids.append(int(rightNum))

    leftLids.sort()
    rightLids.sort()

    return (leftLids, rightLids)


def solution_a(leftLids, rightLids):
    total = 0
    for i in range(len(leftLids)):
        diff = leftLids[i] - rightLids[i]
        total += abs(diff)

    print(f"ANSWER A: {total}")


def solution_b(leftLids, rightLids):
    total = 0
    for leftNum in leftLids:
        total += leftNum * rightLids.count(leftNum)

    print(f"ANSWER B: {total}")


main()
