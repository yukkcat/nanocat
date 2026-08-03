# 测试与发布规则

## 验证顺序

修改后按风险执行：

```powershell
npm run check
npm run build
npm run test:e2e
```

- 类型、公开导出、主题或构建配置变化至少执行 check 和 build。
- 交互、浮层、键盘、动画或响应式变化执行对应 Playwright 测试。
- 视觉变化在 playground 中检查浅色和深色、桌面和窄屏，并确认控制台无错误。
- 新增公共 Module 或行为时补充通过公共 Interface 操作的测试，避免只断言内部实现。
- 未执行的测试必须在汇报中说明，不能笼统声称全部通过。

## 与宿主联调

1. 在宿主开发阶段通过 `D:\nanocat` 本地源码或本地产物接入。
2. 在至少一个真实宿主页面验证行为，而不只看独立 playground。
3. Nanocat 与宿主分别检查 Git 差异和测试结果。
4. 不把机器相关绝对路径作为宿主最终依赖提交。

## 提交和发布

- Nanocat 独立提交，不与宿主业务代码混成一个提交说明。
- 提交前运行 `git diff --check`，确认生成产物、测试报告、截图和 tarball 未混入。
- 用户验收本地联调效果之前不发布 npm。
- `npm publish`、版本提升、tag 和 push 都需要明确授权，不能从“提交”推断。
- 发布时更新版本和 `CHANGELOG.md`，运行 `npm pack --dry-run` 检查文件清单，再执行 `prepublishOnly` 构建。
- 发布成功后核对注册表版本，再把宿主切到正式 npm semver，并在宿主重新安装、测试、构建和提交。
- 不覆盖或撤回已发布版本；发现问题时发布新的修复版本。

