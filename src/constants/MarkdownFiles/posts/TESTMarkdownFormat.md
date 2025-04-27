---
title: "Comprehensive Markdown Syntax Guide"
excerpt: "A complete reference template showcasing all common markdown features and formatting options"
category: "TEMPLATE"
date: "2025-04-25"
slug: "markdown-guide"
author: "Safwan Sayeed"
description: "Member and Contributor at SugarLabs"
tags: "markdown,reference,guide,syntax,documentation,template"
image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2070"
---
<!-- markdownlint-disable -->

# Comprehensive Markdown Syntax Guide

This document serves as a complete reference for markdown syntax, demonstrating various formatting elements and features supported by most markdown parsers.


## Headings

# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4

## Text Formatting

**Bold text** or __also bold text__

*Italic text* or _also italic text_

***Bold and italic text*** or ___also bold and italic___

~~Strikethrough text~~

==Highlighted text==

Super^script^

Here's some `inline code` within a paragraph for demonstration.

## Code Block Example

Below is an example of a JavaScript function:

```javascript
// Returns a greeting for the provided name

function greet(name) {

    return `Hello, ${name}!`;

}

console.log(greet("Markdown"));
```

## Links

### Basic Links
[Basic link to example.com](https://example.com)

[Link with title](https://example.com "Example Website")

### Auto-links
<https://example.com>

<email@example.com>

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3

Alternative syntax:
* Item 1
* Item 2
  * Nested item
* Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

### Definition Lists
First Term
: Definition of the first term

Second Term
: Definition of the second term
: Another definition of the second term

## Images

### Basic Image
![Alt text for image](https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600 "Optional title")

### Linked Image
[![Alt text for linked image](https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300 "Click me!")](https://example.com)

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Default  | Centered | Right    |
| aligned  | aligned  | aligned  |
| text     | text     | text     |

| Command | Description |
| --- | --- |
| `git status` | List all new or modified files |
| `git diff` | Show file differences not yet staged |

## Blockquotes

> This is a simple blockquote

> This is a blockquote with multiple paragraphs
>
> Second paragraph in the blockquote

> #### Blockquote with other elements
>
> - Lists inside blockquote
> - Another item
>
> **Bold text** inside blockquote

## Horizontal Rules

Three or more hyphens:

---

Asterisks:

***

Underscores:

___

## Extended Features

### Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

### Collapsible Sections

<details>
<summary>Click to expand/collapse</summary>

This content is hidden by default.
- You can include **formatted text**
- And other elements

</details>

### YouTube Video Embed

[youtube: MM-H69cHYMk]

### Emoji Support

:smile: I'm happy to see this working!  
:rocket: Let's launch this feature!  
:warning: Be careful with this syntax.  
:thumbsup: Looks good to me!  
:heart: Love this feature!  
:fire: This is awesome!  
:star: Five-star quality!  
:info: Here's some information.  
:check: This is correct!  
:x: This is wrong.

---

### Final Thoughts

This Markdown file has been designed to demonstrate multiple aspects of our custom Markdown parser. Every section shows different capabilities from formatting to embedded media.

Thank you for reading this detailed Markdown test document! :heart: