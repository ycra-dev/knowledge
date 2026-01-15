---
title: 이진 탐색
description: 정렬된 배열에서 O(log n) 시간에 원소를 찾는 분할 정복 알고리즘
sidebar:
  order: 2
---

이진 탐색(Binary Search)은 **정렬된 배열**에서 특정 값을 찾는 효율적인 알고리즘입니다.
배열을 절반씩 줄여가며 탐색하므로 시간 복잡도가 $O(\log n)$입니다.
코딩 테스트와 실무에서 가장 자주 등장하는 기본 알고리즘 중 하나로,
다양한 변형(lower bound, upper bound)이 존재합니다.

## 알고리즘 원리

1. 배열의 중간 인덱스 계산: $\text{mid} = \lfloor (\text{left} + \text{right}) / 2 \rfloor$
2. 중간 값과 타겟 비교:
   - `arr[mid] == target`: 찾음!
   - `arr[mid] < target`: 오른쪽 절반 탐색
   - `arr[mid] > target`: 왼쪽 절반 탐색
3. 범위가 유효할 때까지 반복

## 시간/공간 복잡도

$$
T(n) = T\left(\frac{n}{2}\right) + O(1) = O(\log n)
$$

| 복잡도 | 값 |
|--------|-----|
| 시간 (최선) | $O(1)$ |
| 시간 (평균/최악) | $O(\log n)$ |
| 공간 (반복) | $O(1)$ |
| 공간 (재귀) | $O(\log n)$ |

## 구현

### 반복문 버전 (권장)

```python title="binary_search.py"
def binary_search(arr: list[int], target: int) -> int:
    """
    정렬된 배열에서 target의 인덱스를 반환.
    없으면 -1 반환.
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2  # 오버플로우 방지

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# 사용 예시
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1
```

### 재귀 버전

```python title="binary_search_recursive.py"
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1

    mid = left + (right - left) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

## 변형: Lower/Upper Bound

### Lower Bound

target **이상**인 첫 번째 위치:

```python
def lower_bound(arr: list[int], target: int) -> int:
    left, right = 0, len(arr)

    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left
```

### Upper Bound

target **초과**인 첫 번째 위치:

```python
def upper_bound(arr: list[int], target: int) -> int:
    left, right = 0, len(arr)

    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid

    return left
```

## 흔한 실수

| 실수 | 문제점 | 해결 |
|------|--------|------|
| `mid = (left + right) / 2` | 정수 나눗셈 필요 | `//` 사용 |
| `mid = (left + right) // 2` | 큰 수에서 오버플로우 | `left + (right - left) // 2` |
| `while left < right` | 원소 1개일 때 누락 | `while left <= right` |
| `left = mid` | 무한 루프 | `left = mid + 1` |

## 응용 문제

1. **회전 정렬 배열에서 탐색**: 피벗 찾기 후 이진 탐색
2. **제곱근 구하기**: $x^2 \leq n$인 최대 $x$
3. **매개변수 탐색**: 조건을 만족하는 최소/최대값

```python title="sqrt_binary_search.py"
def sqrt_int(n: int) -> int:
    """n의 정수 제곱근 (이진 탐색)"""
    if n < 2:
        return n

    left, right = 1, n // 2

    while left <= right:
        mid = left + (right - left) // 2
        if mid * mid == n:
            return mid
        elif mid * mid < n:
            left = mid + 1
        else:
            right = mid - 1

    return right
```

## 파이썬 내장 모듈

```python
from bisect import bisect_left, bisect_right

arr = [1, 3, 5, 5, 5, 7, 9]

# lower_bound 역할
print(bisect_left(arr, 5))   # 2

# upper_bound 역할
print(bisect_right(arr, 5))  # 5
```

## 관련 문서

- [알고리즘 입문](./intro/)
- [시간 복잡도 분석](./intro/) - Big-O 표기법
- TODO: 이진 탐색 트리 (BST)
- [선형대수 입문](../../math/linear-algebra/intro/) - 수학적 분석
