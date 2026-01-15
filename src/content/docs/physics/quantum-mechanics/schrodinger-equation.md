---
title: 슈뢰딩거 방정식
description: 양자역학의 기본 방정식과 파동함수의 시간 발전
sidebar:
  order: 2
---

슈뢰딩거 방정식(Schrödinger Equation)은 양자역학에서 파동함수의 시간 발전을 기술하는
기본 방정식입니다. 고전역학의 뉴턴 방정식에 대응하는 양자역학의 운동 방정식으로,
1926년 에르빈 슈뢰딩거가 제안했습니다.
이 방정식을 통해 원자, 분자, 고체 등 미시 세계의 물리 현상을 설명할 수 있습니다.

## 시간 의존 슈뢰딩거 방정식

일반적인 형태:

$$
i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H} \Psi(\mathbf{r}, t)
$$

여기서:
- $\Psi(\mathbf{r}, t)$: 파동함수 (위치와 시간의 함수)
- $\hat{H}$: 해밀토니안 연산자 (전체 에너지)
- $\hbar$: 환산 플랑크 상수 ($h/2\pi$)
- $i$: 허수 단위

### 1차원 자유 입자의 경우

$$
i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2}
$$

## 시간 독립 슈뢰딩거 방정식

정상 상태(에너지 고유상태)를 구할 때 사용:

$$
\hat{H} \psi(\mathbf{r}) = E \psi(\mathbf{r})
$$

이는 **고유값 문제**입니다:
- $\psi$: 에너지 고유함수
- $E$: 에너지 고유값

### 1차원 무한 퍼텐셜 우물

$$
-\frac{\hbar^2}{2m} \frac{d^2 \psi}{dx^2} = E \psi, \quad 0 < x < L
$$

**해**:

$$
\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right), \quad E_n = \frac{n^2 \pi^2 \hbar^2}{2mL^2}
$$

## 수치적 풀이

유한 차분법을 이용한 1차원 슈뢰딩거 방정식의 수치 해법:

```python title="schrodinger_1d.py"
import numpy as np
import matplotlib.pyplot as plt

def solve_schrodinger_1d(V, x, m=1, hbar=1):
    """
    1차원 시간 독립 슈뢰딩거 방정식을 수치적으로 푼다.
    유한 차분법 + 고유값 문제로 변환
    """
    N = len(x)
    dx = x[1] - x[0]

    # 운동 에너지 행렬 (2차 미분의 유한 차분)
    T = np.zeros((N, N))
    for i in range(N):
        T[i, i] = -2
        if i > 0:
            T[i, i-1] = 1
        if i < N-1:
            T[i, i+1] = 1
    T *= -hbar**2 / (2 * m * dx**2)

    # 퍼텐셜 에너지 행렬
    U = np.diag(V)

    # 해밀토니안
    H = T + U

    # 고유값 문제 풀이
    energies, wavefunctions = np.linalg.eigh(H)

    return energies, wavefunctions

# 무한 퍼텐셜 우물 예제
L = 1.0
N = 100
x = np.linspace(0, L, N)
V = np.zeros(N)  # 우물 내부: V = 0

energies, psi = solve_schrodinger_1d(V, x)

print(f"기저 상태 에너지: E_1 = {energies[0]:.4f}")
print(f"첫 번째 들뜬 상태: E_2 = {energies[1]:.4f}")
```

## 물리적 해석

### 확률 해석 (Born 해석)

$$
|\Psi(\mathbf{r}, t)|^2 \, d^3r = \text{위치 } \mathbf{r} \text{에서 입자를 발견할 확률}
$$

### 규격화 조건

$$
\int_{-\infty}^{\infty} |\Psi|^2 \, d^3r = 1
$$

## 고전역학과의 대응

| 고전역학 | 양자역학 |
|----------|----------|
| 위치 $x$ | 위치 연산자 $\hat{x}$ |
| 운동량 $p$ | $\hat{p} = -i\hbar \nabla$ |
| 에너지 $E$ | $\hat{H} = \frac{\hat{p}^2}{2m} + V(\hat{x})$ |
| 궤적 $x(t)$ | 파동함수 $\Psi(x, t)$ |

## 관련 문서

- [양자역학 입문](./intro/)
- [고유값과 고유벡터](../../math/linear-algebra/intro/) - 힐베르트 공간과 연산자
- TODO: 수소 원자 문제
- TODO: 섭동론
