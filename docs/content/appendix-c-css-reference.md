---
title: CSS 語法補充
group: reference
kind: reference
---

# CSS 語法補充

## 169. CSS Custom Properties

IT / Citizen CSS 都會看到：

```css
:root {
  --app-bg: #f5f6f8;
  --app-border: #d9dde3;
}
```

使用：

```css
body {
  background: var(--app-bg);
}
```

Bootstrap 自己也大量使用 CSS Variables，例如：

```css
background: var(--bs-tertiary-bg);
```

---

## 170. Selector

Element selector：

```css
body { }
```

ID selector：

```css
#app { }
```

Class selector：

```css
.app-card { }
```

Descendant selector：

```css
.table thead th { }
```

Pseudo-class：

```css
.app-header a:hover { }
```

---

## 171. Project 中常見 CSS Property

```css
margin: 0;
padding: 1rem;
min-width: 320px;
max-width: 1440px;
min-height: 100vh;
width: 100%;
height: 360px;
background: #fff;
color: #20262e;
border: 1px solid var(--app-border);
border-radius: .5rem;
box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 0.06);
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
font-size: 1rem;
font-weight: 600;
text-align: right;
white-space: nowrap;
position: sticky;
top: 0;
z-index: 10;
```

需要理解的核心分類：

```text
Box Model     margin / padding / border
Sizing        width / height / min / max
Typography    font / color / text-align
Layout        display / flex / gap
Positioning   position / top / z-index
Visual        background / shadow / radius
```

---

## 172. Media Query

```css
@media (max-width: 767.98px) {
  .app-content {
    padding: 1.25rem 0.75rem 2rem;
  }
}
```

意思：viewport 寬度在條件內時覆寫樣式，做 responsive design。

---
