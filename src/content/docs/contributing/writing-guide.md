---
title: 문서 작성 가이드
description: 파일 네이밍 규칙, 디렉토리 구조, frontmatter 작성법
sidebar:
  order: 1
---

이 문서는 knowledge 사이트의 콘텐츠 작성 규칙을 정리합니다.
일관된 구조와 네이밍을 유지하면 링크 안정성과 검색 품질이 향상됩니다.

## 디렉토리 구조

```
src/content/docs/
├── index.mdx                    # 홈 페이지
├── {category}/                  # 대분류 (math, physics, cs)
│   └── {topic}/                 # 중분류 (linear-algebra, algorithms 등)
│       ├── intro.md             # 해당 주제 입문 문서
│       ├── {concept}.md         # 개별 개념 문서
│       └── {concept}.md
└── contributing/                # 기여 가이드
    └── writing-guide.md
```

### 현재 카테고리

| 대분류 | 슬러그 | 중분류 예시 |
|--------|--------|-------------|
| 수학 | `math` | linear-algebra, calculus, probability, discrete-math |
| 물리학 | `physics` | classical-mechanics, electromagnetism, quantum-mechanics, thermodynamics |
| 컴퓨터공학 | `cs` | algorithms, data-structures, machine-learning, systems |

## 파일 네이밍 규칙

### 기본 원칙

1. **영문 소문자 + 하이픈(kebab-case)** 사용
2. **한글 제목은 frontmatter `title`에** 작성
3. **확장자**: `.md` 또는 `.mdx` (컴포넌트 사용 시)

### 파일명 패턴

| 유형 | 패턴 | 예시 |
|------|------|------|
| 입문 문서 | `intro.md` | `math/linear-algebra/intro.md` |
| 개념 문서 | `{concept-name}.md` | `gaussian-elimination.md` |
| 블로그/날짜 | `YYYY-MM-DD-{title}.md` | `2025-01-15-new-feature.md` |

### 좋은 예 vs 나쁜 예

```
✅ gaussian-elimination.md      (kebab-case)
✅ schrodinger-equation.md      (kebab-case)
✅ binary-search.md             (kebab-case)

❌ GaussianElimination.md       (PascalCase 금지)
❌ gaussian_elimination.md      (snake_case 금지)
❌ 가우스소거법.md               (한글 파일명 금지)
❌ gaussian elimination.md      (공백 금지)
```

## Frontmatter 작성법

모든 문서는 다음 frontmatter를 포함해야 합니다:

```yaml
---
title: 가우스 소거법           # 한글 제목 (필수)
description: 연립방정식을 푸는 기본 알고리즘  # 설명 (필수, SEO용)
sidebar:
  order: 2                    # 사이드바 순서 (선택)
  badge:
    text: 핵심                # 뱃지 (선택)
    variant: tip
---
```

### 선택적 필드

```yaml
---
lastUpdated: 2025-01-15       # 마지막 수정일
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
---
```

## 문서 본문 구조

### 권장 템플릿

```markdown
---
title: 문서 제목
description: 한 줄 설명
---

이 문서에서 다루는 내용을 2~3줄로 요약합니다.
어떤 독자에게 유용한지, 사전 지식이 필요한지 간략히 언급합니다.

## 개요

주제에 대한 개념 설명

## 핵심 내용

### 소제목 1

본문...

### 소제목 2

본문...

## 예제

코드나 수식 예제

## 관련 문서

- [관련 문서 1](../related-topic/doc1/)
- [관련 문서 2](../../other-category/doc2/)
```

## 내부 링크 작성법

### 상대 경로 사용

```markdown
<!-- 같은 폴더 내 -->
[가우스 소거법](./gaussian-elimination/)

<!-- 상위 폴더로 이동 -->
[선형대수 입문](../intro/)

<!-- 다른 카테고리 -->
[신경망 기초](../../cs/machine-learning/neural-networks/)
```

### 링크 안정성 팁

1. **슬러그 기반 경로 사용** - 파일명이 곧 URL
2. **trailing slash 포함** - `/gaussian-elimination/` (끝에 `/`)
3. **절대 경로 지양** - base path 변경 시 깨짐

## 수식 작성 (LaTeX)

Starlight는 KaTeX를 지원합니다 (별도 설정 필요).

### 인라인 수식

```markdown
행렬 $A$의 역행렬은 $A^{-1}$입니다.
```

### 블록 수식

```markdown
$$
\det(A) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$
```

## 코드 블록

### 언어 지정

````markdown
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
    return -1
```
````

### 파일명 표시

````markdown
```python title="search.py"
# 코드 내용
```
````

## 체크리스트

새 문서 작성 시 확인사항:

- [ ] 파일명이 영문 kebab-case인가?
- [ ] frontmatter에 title, description이 있는가?
- [ ] 본문 상단에 요약(2~3줄)이 있는가?
- [ ] heading 구조가 h2 → h3 순서인가?
- [ ] 내부 링크가 상대 경로인가?
- [ ] 수식/코드가 있다면 올바르게 렌더링되는가?

## 관련 문서

- TODO: 마크다운 문법 가이드
- TODO: LaTeX 수식 치트시트
