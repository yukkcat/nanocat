# AGENTS.md

本文件约束 `nanocat-ui` 仓库中的 AI 和自动化开发行为，作用域为整个仓库。
Nanocat 是独立发布的通用 Vue 3 UI 库，不承载 `chatgpt2api` 的业务规则和页面组合。

## 开始任务前

1. 先读取本文件和任务相关的 `.codex/rules/` 文件。
2. 执行 `git status --short`，保护已有修改并确认当前版本、提交和发布状态。
3. 阅读目标 Module、公开导出、`README.md`、`COMPONENTS.md`、测试和至少一个真实消费者。
4. 非简单修改先分析并向用户同步当前短期计划，再编辑代码。
5. Review、解释和方案请求只读；用户明确要求修复或实现后才写入。

## 规则分发

| 任务范围 | 必读规则 |
| --- | --- |
| `src/components/`、`src/composables/`、样式、主题、公开导出 | `.codex/rules/component-development.md` |
| 测试、版本、提交、npm 发布、宿主切换 | `.codex/rules/testing-and-release.md` |

## 永久约束

- 优先保持小而稳定的公共 Interface；不把单个宿主的业务需求直接塞进通用 Module。
- 只有多个真实消费者或明确跨项目用例存在时才增加通用能力。
- 不新增只改名、只透传 props 或只包一层 DOM 的浅 Module。
- 组件结构属于 Nanocat，视觉个性属于主题，页面布局属于宿主应用。
- 保留用户已有修改，不改无关文件，不顺手发布。
- 不执行 push、tag 或 `npm publish`，除非用户明确授权。
- 用户反复纠正且适用于通用 UI 库的要求，应沉淀到最相关规则，避免重复和宿主业务污染。

