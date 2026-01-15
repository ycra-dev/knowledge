# 문서 작성 컨벤션

이 문서는 `ycra.dev knowledge` 사이트의 문서 작성 규칙을 정의합니다.

---

## 요약 체크리스트

1. [ ] H1은 frontmatter `title`에만 작성, 본문에서 `#` 사용 금지
2. [ ] 본문은 H2(`##`)부터 시작, H4(`####`)까지만 허용
3. [ ] 인라인 수식 `$...$`, 블록 수식 `$$...$$` 사용
4. [ ] 코드 블록에 언어 태그 필수, `title` 속성으로 파일명 표시
5. [ ] 내부 링크는 상대 경로 + trailing slash (`./intro/`)
6. [ ] 파일명 kebab-case, frontmatter에 `title`, `description` 필수
7. [ ] 수식 내 `*`, `_` 이스케이프 또는 raw 블록 사용
8. [ ] 코드 한 줄 80~100자 이내 권장
9. [ ] 링크 텍스트는 구체적으로 (❌ "여기", ✅ "가우스 소거법")
10. [ ] 문서 하단에 `## 관련 문서` 섹션 권장

---

## 1. 제목 레벨 사용 규칙

### 원칙

| 레벨 | 용도 | 본문 사용 |
|------|------|-----------|
| H1 (`#`) | 문서 제목 (frontmatter `title`에서 자동 생성) | ❌ 금지 |
| H2 (`##`) | 주요 섹션 | ✅ 본문 최상위 |
| H3 (`###`) | 하위 섹션 | ✅ 허용 |
| H4 (`####`) | 세부 항목 (필요시) | ✅ 허용 |
| H5~H6 | - | ❌ 사용하지 않음 |

### 섹션 네이밍

- **명사형** 또는 **의문형** 권장
- 동사형 단독 사용 지양 (예: ❌ "구현하기" → ✅ "구현")
- 콜론(`:`) 뒤에 설명 추가 가능 (예: "변형: Lower/Upper Bound")

### Do / Don't 예시

```markdown
<!-- ✅ DO: frontmatter에서 제목 정의, 본문은 H2 시작 -->
---
title: 이진 탐색
---

이진 탐색은 정렬된 배열에서...

## 알고리즘 원리

### 시간 복잡도
```

```markdown
<!-- ❌ DON'T: 본문에 H1 사용 -->
---
title: 이진 탐색
---

# 이진 탐색 ← 중복됨, 금지

## 알고리즘 원리
```

```markdown
<!-- ❌ DON'T: H2 건너뛰고 H3 시작 -->
---
title: 가우스 소거법
---

### 전진 소거  ← H2 없이 H3 시작 금지
```

```markdown
<!-- ✅ DO: H4까지만 사용 -->
## 구현

### 반복문 버전

#### 최적화 팁

<!-- ❌ DON'T: H5 이상 사용 -->
##### 더 세부 팁 ← 금지
```

**이유**: Starlight는 frontmatter `title`을 H1으로 렌더링합니다. 본문에 H1을 추가하면 중복되고, H5 이상은 목차(TOC)에서 지원되지 않습니다.

---

## 2. 수식 작성 방식 (LaTeX)

### 기본 문법

| 유형 | 문법 | 렌더링 |
|------|------|--------|
| 인라인 | `$E = mc^2$` | 문장 내 수식 |
| 블록 | `$$` ... `$$` | 별도 줄 중앙 정렬 |

### 환경 사용

- `cases`, `bmatrix`, `pmatrix` 등 기본 환경 사용 가능
- `align`, `equation` 환경은 플러그인 설정에 따라 다름 (현재 미사용)
- 수식 번호/참조는 현재 사용하지 않음

### 렌더링 깨짐 방지

1. **언더스코어 `_`**: 수식 내에서는 그대로 사용 가능
2. **애스터리스크 `*`**: 필요시 `\ast` 또는 `\cdot`로 대체
3. **백틱 금지**: 수식 내부에 `` ` `` 사용 금지
4. **줄바꿈**: 블록 수식 전후에 빈 줄 필수

### Do / Don't 예시

```markdown
<!-- ✅ DO: 인라인 수식 -->
시간 복잡도는 $O(\log n)$입니다.
```

```markdown
<!-- ✅ DO: 블록 수식 (전후 빈 줄) -->
슈뢰딩거 방정식:

$$
i\hbar \frac{\partial}{\partial t} \Psi = \hat{H} \Psi
$$

여기서 $\Psi$는 파동함수입니다.
```

```markdown
<!-- ✅ DO: cases 환경 -->
$$
f(x) = \begin{cases}
1 & \text{if } x > 0 \\
0 & \text{otherwise}
\end{cases}
$$
```

```markdown
<!-- ❌ DON'T: 빈 줄 없이 블록 수식 -->
결과는 다음과 같습니다.
$$
E = mc^2
$$
다음 섹션에서...

<!-- ✅ DO: 빈 줄 추가 -->
결과는 다음과 같습니다.

$$
E = mc^2
$$

다음 섹션에서...
```

```markdown
<!-- ❌ DON'T: 수식 안에 백틱 -->
$`x + y`$  ← 렌더링 깨짐

<!-- ✅ DO -->
$x + y$
```

```markdown
<!-- ❌ DON'T: 마크다운 강조와 충돌 -->
에너지는 *E*이고... ← 이탤릭으로 해석될 수 있음

<!-- ✅ DO: 인라인 수식 사용 -->
에너지는 $E$이고...
```

**이유**: KaTeX/MathJax는 마크다운 파서와 별도로 동작합니다. 빈 줄이 없으면 블록으로 인식되지 않을 수 있습니다.

---

## 3. 코드 블록 스타일 통일

### 기본 규칙

| 항목 | 규칙 |
|------|------|
| 형식 | fenced code block (백틱 3개) |
| 언어 태그 | 필수 (예: `python`, `typescript`, `bash`) |
| 파일명 표시 | `title="filename.py"` 속성 사용 |
| 줄 길이 | 80~100자 권장, 120자 이내 |
| 주석 언어 | 한글 허용 |

### 언어 태그 목록

| 언어 | 태그 |
|------|------|
| Python | `python` |
| TypeScript | `typescript` 또는 `ts` |
| JavaScript | `javascript` 또는 `js` |
| Bash/Shell | `bash` 또는 `shell` |
| JSON | `json` |
| YAML | `yaml` |
| Markdown | `markdown` 또는 `md` |
| 수학/수식 | `latex` (코드로 보여줄 때) |

### 파일 경로 / 터미널 명령 표기

- **파일 경로**: 인라인 코드 `` `src/content/docs/` ``
- **터미널 명령**: 코드 블록 + `bash` 태그

### Do / Don't 예시

````markdown
<!-- ✅ DO: 언어 태그 + title 속성 -->
```python title="binary_search.py"
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
    return -1
```
````

````markdown
<!-- ❌ DON'T: 언어 태그 누락 -->
```
def binary_search(arr, target):
    ...
```
````

````markdown
<!-- ✅ DO: 터미널 명령 -->
```bash
npm run build
```
````

````markdown
<!-- ❌ DON'T: 인라인 코드로 긴 명령 -->
`npm install @astrojs/starlight && npm run dev`

<!-- ✅ DO: 코드 블록 사용 -->
```bash
npm install @astrojs/starlight
npm run dev
```
````

````markdown
<!-- ❌ DON'T: 한 줄이 너무 김 -->
```python
result = some_very_long_function_name(parameter_one, parameter_two, parameter_three, parameter_four, parameter_five)
```

<!-- ✅ DO: 줄바꿈 -->
```python
result = some_very_long_function_name(
    parameter_one, parameter_two,
    parameter_three, parameter_four,
    parameter_five
)
```
````

**이유**: 언어 태그가 있어야 구문 강조(syntax highlighting)가 적용됩니다. `title` 속성은 Starlight가 파일명 헤더를 렌더링합니다.

---

## 4. 내부 링크 작성 규칙

### 기본 형식

```markdown
[링크 텍스트](상대경로/)
```

### 경로 규칙

| 상황 | 형식 | 예시 |
|------|------|------|
| 같은 폴더 | `./파일명/` | `[가우스 소거법](./gaussian-elimination/)` |
| 상위 폴더 | `../` | `[선형대수 입문](../intro/)` |
| 다른 카테고리 | `../../카테고리/토픽/파일명/` | `[신경망 기초](../../cs/machine-learning/intro/)` |
| 헤딩 앵커 | `./파일명/#앵커` | `[시간 복잡도](./binary-search/#시간공간-복잡도)` |

### 핵심 규칙

1. **상대 경로 사용**: 절대 경로(`/knowledge/...`) 지양
2. **trailing slash 필수**: `/gaussian-elimination/` (끝에 `/`)
3. **확장자 생략**: `.md` 붙이지 않음
4. **kebab-case**: 파일명과 동일하게

### Do / Don't 예시

```markdown
<!-- ✅ DO: 상대 경로 + trailing slash -->
자세한 내용은 [가우스 소거법](./gaussian-elimination/)을 참고하세요.
```

```markdown
<!-- ❌ DON'T: 절대 경로 -->
[가우스 소거법](/knowledge/math/linear-algebra/gaussian-elimination/)

<!-- 이유: base path 변경 시 모든 링크가 깨짐 -->
```

```markdown
<!-- ❌ DON'T: 확장자 포함 -->
[이진 탐색](./binary-search.md)

<!-- ✅ DO -->
[이진 탐색](./binary-search/)
```

```markdown
<!-- ❌ DON'T: trailing slash 누락 -->
[입문](./intro)

<!-- ✅ DO -->
[입문](./intro/)
```

```markdown
<!-- ❌ DON'T: 모호한 링크 텍스트 -->
자세한 내용은 [여기](./gaussian-elimination/)를 참고하세요.

<!-- ✅ DO: 구체적인 링크 텍스트 -->
자세한 내용은 [가우스 소거법](./gaussian-elimination/)을 참고하세요.
```

```markdown
<!-- ✅ DO: 다른 카테고리 링크 -->
관련 내용: [슈뢰딩거 방정식](../../physics/quantum-mechanics/schrodinger-equation/)
```

**이유**: Starlight는 trailing slash를 기준으로 라우팅합니다. 상대 경로를 사용하면 `base` 설정 변경에 영향받지 않습니다.

---

## 신규 문서 작성 템플릿

```markdown
---
title: 문서 제목 (한글)
description: SEO용 한 줄 설명 (50~150자)
sidebar:
  order: 2  # 사이드바 순서 (선택)
---

이 문서에서 다루는 내용을 2~3줄로 요약합니다.
어떤 독자에게 유용한지, 사전 지식이 필요한지 간략히 언급합니다.

## 개요

주제에 대한 핵심 개념 설명.

## 핵심 내용

### 소제목 1

본문 내용...

수식 예시:

$$
f(x) = \int_{a}^{b} g(t) \, dt
$$

### 소제목 2

코드 예시:

```python title="example.py"
def example():
    return "Hello"
```

## 응용

실제 사용 사례나 응용 문제.

## 관련 문서

- [관련 문서 1](./related-doc/)
- [다른 카테고리 문서](../../other-category/topic/doc/)
- TODO: 아직 작성되지 않은 문서
```

---

## 추가로 확인하면 좋은 파일 목록

1. `src/content/config.ts` - 콘텐츠 컬렉션 스키마 (frontmatter 검증)
2. `package.json` - remark/rehype 플러그인 확인 (수식 렌더링 설정)
3. `.github/workflows/*.yml` - 빌드 시 린트 규칙 확인
4. `src/styles/` - 커스텀 CSS (코드 블록/수식 스타일)
5. `tsconfig.json` - 경로 별칭(path alias) 설정 여부
