---
title: 가우스 소거법
description: 연립일차방정식을 체계적으로 푸는 행렬 기반 알고리즘
sidebar:
  order: 2
---

가우스 소거법(Gaussian Elimination)은 연립일차방정식을 행렬 형태로 변환한 뒤,
행 연산을 통해 상삼각 행렬(또는 기약행사다리꼴)로 만들어 해를 구하는 알고리즘입니다.
선형대수의 가장 기본적이면서도 실용적인 알고리즘으로,
역행렬 계산, LU 분해, 행렬식 계산 등 다양한 곳에 응용됩니다.

## 개요

$n$개의 미지수와 $n$개의 방정식으로 이루어진 연립방정식:

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nn}x_n = b_n
\end{cases}
$$

이를 행렬 형태로 쓰면 $Ax = b$ 가 됩니다.

## 알고리즘 단계

### 1단계: 전진 소거 (Forward Elimination)

첨가행렬 $[A|b]$를 만들고, 피벗을 기준으로 아래 행들을 소거합니다.

**목표**: 상삼각 행렬 형태로 변환

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & | & b_1 \\
0 & a_{22}' & \cdots & a_{2n}' & | & b_2' \\
\vdots & \ddots & \ddots & \vdots & | & \vdots \\
0 & 0 & \cdots & a_{nn}' & | & b_n'
\end{bmatrix}
$$

### 2단계: 후진 대입 (Back Substitution)

마지막 행부터 역순으로 미지수를 하나씩 구합니다.

$$
x_n = \frac{b_n'}{a_{nn}'}, \quad x_{n-1} = \frac{b_{n-1}' - a_{n-1,n}'x_n}{a_{n-1,n-1}'}, \quad \ldots
$$

## 구현 예제

```python title="gaussian_elimination.py"
import numpy as np

def gaussian_elimination(A, b):
    """가우스 소거법으로 Ax = b를 푼다."""
    n = len(b)
    # 첨가행렬 생성
    Ab = np.hstack([A.astype(float), b.reshape(-1, 1).astype(float)])

    # 전진 소거
    for i in range(n):
        # 피벗이 0이면 행 교환 (부분 피벗팅)
        max_row = np.argmax(np.abs(Ab[i:, i])) + i
        Ab[[i, max_row]] = Ab[[max_row, i]]

        # 피벗 아래 행들 소거
        for j in range(i + 1, n):
            factor = Ab[j, i] / Ab[i, i]
            Ab[j, i:] -= factor * Ab[i, i:]

    # 후진 대입
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (Ab[i, -1] - np.dot(Ab[i, i+1:n], x[i+1:])) / Ab[i, i]

    return x

# 사용 예시
A = np.array([[2, 1, -1],
              [-3, -1, 2],
              [-2, 1, 2]])
b = np.array([8, -11, -3])

x = gaussian_elimination(A, b)
print(f"해: x = {x}")  # [2, 3, -1]
```

## 시간 복잡도

- **전진 소거**: $O(n^3)$
- **후진 대입**: $O(n^2)$
- **전체**: $O(n^3)$

## 피벗팅 전략

| 전략 | 설명 | 안정성 |
|------|------|--------|
| 피벗팅 없음 | 피벗이 0이면 실패 | 낮음 |
| 부분 피벗팅 | 열에서 가장 큰 값을 피벗으로 | 보통 |
| 완전 피벗팅 | 행과 열 모두에서 최대값 선택 | 높음 |

실무에서는 **부분 피벗팅**이 가장 널리 사용됩니다.

## 응용

- **역행렬 계산**: $[A|I]$에 가우스-조던 소거법 적용
- **LU 분해**: 소거 과정에서 $L$ 행렬 동시 생성
- **행렬식 계산**: 상삼각 행렬의 대각 원소 곱

## 관련 문서

- [선형대수 입문](./intro/)
- TODO: LU 분해
- TODO: 역행렬과 가역성
- [신경망 기초](../../cs/machine-learning/intro/) - 가중치 행렬 연산
