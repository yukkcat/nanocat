# 通用 UI Module 开发规则

## 公共 Interface

- 一个 Module 只暴露调用者真正需要的 props、slots、events 和状态约定。
- 新增公共选项前检查真实消费者。仅为一个页面出现的临时差异，优先留在宿主 Adapter。
- 使用删除测试：删除后复杂度若在多个消费者重现，Module 提供了 Depth；否则可能只是浅包装。
- 已有 Module 能通过清晰的小 Interface 承担行为时，扩展它而不是复制一个近似版本。
- 公共行为变化同步更新 `src/index.ts`、类型导出、`COMPONENTS.md` 和相关示例。

## 职责划分

- Nanocat 拥有通用控件结构、键盘交互、焦点管理、浮层定位、主题状态和无业务含义的布局原语。
- 宿主拥有页面数据、业务时间线、业务文案、请求状态、权限、表格列定义和产品响应式布局。
- Drawer、Modal、Menu、Tooltip 等通用 Module 不读取宿主 store、路由或业务类型。
- 相似浮层共享底层定位 Implementation；展示语义不同的 Tooltip、HoverCard、Menu 不必合并成一个巨型 Module。
- 不引入只有一种 Adapter 的假 Seam，除非存在明确的测试替身或即将落地的第二 Adapter。

## 样式层次

- 组件的尺寸约束、对齐、状态和可访问结构写在组件基础样式中。
- 字体、页面背景和视觉个性放在主题入口；宿主页布局不进入 Nanocat。
- 同类控件的高度、圆角、图标尺寸、文字基线、关闭按钮和焦点环保持一致。
- 深色主题必须显式验证 selected、hover、disabled、checked、focus 和错误状态，不能让 hover 覆盖 selected。
- 不用固定像素偏移修复单个宿主截图；先检查 flex/grid 对齐、line-height、box-sizing 和稳定尺寸。
- 浮层使用共享定位 composable，处理 viewport 边缘、滚动、resize、teleport 和 z-index；不要在每个组件复制监听器。
- 无背景 Drawer 与模态遮罩是不同交互模式。是否阻止背景操作必须由明确的 Interface 表达，不能只把遮罩设为透明。

## 交互和可访问性

- 熟悉图标按钮需要可访问名称和 tooltip；带文字按钮不得因图标改变文字对齐。
- 菜单、选择器、弹窗和 Drawer 支持键盘进入、移动、确认、Escape 关闭和焦点恢复。
- 动画只作用于稳定容器，不能造成尺寸跳动、内容闪现或重复播放；尊重 reduced motion。
- loading、empty、error 和 content 状态保持稳定尺寸，由调用者提供业务文案。
- 所有动态文字必须在窄容器内换行或截断，不得挤出控件或制造页面级滚动。

## 实现约束

- Vue 代码保持 TypeScript 类型完整，避免 `any`、重复 watch、未清理监听器和未消费状态。
- 优先复用已有 composable 和 CSS token，不复制定位、键盘、主题或尺寸规则。
- 不为测试便利把紧密编排拆成大量公开纯函数；测试应穿过公共 Interface。
- 依赖必须直接声明，不能依靠宿主或传递依赖偶然存在。

