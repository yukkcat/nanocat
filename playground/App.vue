<template>
  <main class="pg-shell">
    <header class="pg-hero">
      <div>
        <p class="pg-eyebrow">nanocat-ui</p>
        <h1>{{ t.hero }}</h1>
        <p class="pg-hero__text">{{ t.heroDesc }}</p>
      </div>
      <div class="pg-row">
        <Button size="sm" :variant="lang === 'zh' ? 'primary' : 'outline'" @click="lang = 'zh'">中文</Button>
        <Button size="sm" :variant="lang === 'en' ? 'primary' : 'outline'" @click="lang = 'en'">English</Button>
      </div>
    </header>

    <div class="pg-layout">
      <aside class="pg-aside">
        <section class="pg-aside-card">
          <p class="pg-kicker">{{ t.overview }}</p>
          <h2>{{ t.goal }}</h2>
          <p class="pg-muted">{{ t.goalDesc }}</p>
        </section>
        <section class="pg-aside-card">
          <p class="pg-kicker">{{ t.nav }}</p>
          <nav class="pg-side-nav">
            <a v-for="item in sections" :key="item.id" :href="`#${item.id}`" class="pg-side-nav__item">
              <span class="pg-side-nav__title">{{ item.title }}</span>
              <span class="pg-side-nav__desc">{{ item.desc }}</span>
            </a>
          </nav>
        </section>
      </aside>

      <section class="pg-showcase">
        <article id="controls" class="pg-demo-section">
          <div class="pg-demo-meta">
            <p class="pg-kicker">{{ t.controlsKicker }}</p>
            <h2>{{ t.controlsTitle }}</h2>
            <p>{{ t.controlsDesc }}</p>
          </div>
          <div class="pg-demo-body">
            <div class="pg-surface pg-stack">
              <div class="pg-demo-group">
                <h3>Buttons</h3>
                <div class="pg-row">
                  <Button size="xs" variant="outline">XS</Button>
                  <Button size="sm" variant="outline">SM</Button>
                  <Button size="md" variant="outline">MD</Button>
                  <Button size="sm" variant="primary">Primary</Button>
                  <Button size="sm" variant="danger">Danger</Button>
                  <Button size="sm" variant="outline" disabled>Disabled</Button>
                </div>
              </div>
              <div class="pg-demo-group">
                <h3>Inputs / Selects</h3>
                <div class="pg-row">
                  <Input model-value="https://api.example.com" root-class="pg-input-width" />
                  <Input model-value="sk-xxxxx" root-class="pg-input-width" />
                  <div class="pg-trigger-wrap"><SelectMenu v-model="lane" :options="laneOptions" /></div>
                  <div class="pg-trigger-wrap"><SelectMenu v-model="lane" :options="laneOptions" value-align="center" /></div>
                  <div class="pg-trigger-wrap"><SelectMenu v-model="selectedLanes" :options="laneOptions" multiple placeholder="多选通道" selected-indicator="check" /></div>
                  <div class="pg-trigger-wrap"><GroupedSelectMenu v-model="groupedLane" :groups="groupedLaneGroups" /></div>
                  <div class="pg-trigger-wrap"><GroupedSelectMenu v-model="selectedGroupedLanes" :groups="groupedLaneGroups" multiple placeholder="多选分组" /></div>
                  <div class="pg-trigger-wrap"><FilterSelect v-model="status" :options="statusOptions" :placeholder="t.filter" selected-indicator="none" /></div>
                </div>
              </div>
              <div class="pg-demo-group">
                <h3>Form layout</h3>
                <div class="pg-split">
                  <FormSection title="Soft Section" description="Default panel style" variant="soft">
                    <FieldGrid :columns="2">
                      <FormField label="Base URL" required><Input model-value="https://example.com" block /></FormField>
                      <FormField label="API Key" hint="Multiple keys can be separated with commas."><Input model-value="sk-xxxxx" block /></FormField>
                    </FieldGrid>
                  </FormSection>
                  <FormSection title="Outline Section" description="Outline variant" variant="outline" size="md">
                    <FieldGrid :columns="1">
                      <FormField :label="t.maxConcurrency" size="md" required><Input model-value="4" size="md" block /></FormField>
                      <div class="pg-row">
                        <Checkbox v-model="quotaEnabled">{{ t.quota }}</Checkbox>
                        <Checkbox v-model="quotaDisabled" disabled>{{ t.disabledCheck }}</Checkbox>
                      </div>
                    </FieldGrid>
                  </FormSection>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article id="feedback" class="pg-demo-section">
          <div class="pg-demo-meta">
            <p class="pg-kicker">{{ t.feedbackKicker }}</p>
            <h2>{{ t.feedbackTitle }}</h2>
            <p>{{ t.feedbackDesc }}</p>
          </div>
          <div class="pg-demo-body">
            <div class="pg-surface pg-stack">
              <div class="pg-demo-group">
                <h3>Hints</h3>
                <div class="pg-row">
                  <Tooltip text="Top tooltip" placement="top"><Button size="sm" variant="outline">Top</Button></Tooltip>
                  <Tooltip text="Right tooltip" placement="right"><Button size="sm" variant="outline">Right</Button></Tooltip>
                  <Tooltip text="Bottom tooltip" placement="bottom"><Button size="sm" variant="outline">Bottom</Button></Tooltip>
                  <Tooltip text="Left tooltip" placement="left"><Button size="sm" variant="outline">Left</Button></Tooltip>
                  <HoverCard card-class="w-72"><Button size="sm" variant="outline">Hover Card</Button><template #content><div class="pg-stack-tight"><div class="ui-status-title">Quota details</div><div class="ui-status-body">18 requests remain today on the main lane.</div></div></template></HoverCard>
                  <HelpTip :text="t.help" />
                </div>
              </div>
              <div class="pg-demo-group">
                <h3>Status</h3>
                <div class="pg-row">
                  <MetaChip tone="neutral" variant="soft">Neutral</MetaChip>
                  <MetaChip tone="success" variant="soft">Success</MetaChip>
                  <MetaChip tone="warning" variant="soft">Warning</MetaChip>
                  <MetaChip tone="error" variant="outline">Error</MetaChip>
                  <MetaChip tone="info" variant="soft">Info</MetaChip>
                </div>
                <div class="pg-row">
                  <StatusPill :label="t.ok" tone="success" :detail="t.okDesc" />
                  <StatusPill :label="t.err" tone="error" variant="outline" :detail="t.errDesc" />
                  <StatusPill :label="t.processing" tone="info" :detail="t.processingDesc" />
                  <StatusPill :label="t.limited" tone="warning" size="md" :detail="t.limitedDesc" />
                </div>
                <div class="pg-row">
                  <StatusDetailPill :label="t.loadingOnly" tone="warning" :detail="t.loadingOnlyDesc" raw-error="stream request failed: upstream returned loading-only response" />
                  <StatusDetailPill :label="t.parseFail" tone="error" variant="outline" :detail="t.parseFailDesc" raw-error="unable to parse valid content from upstream response" />
                </div>
              </div>
              <div class="pg-demo-group">
                <h3>States</h3>
                <div class="pg-split">
                  <ResultState :title="t.resultOk" :description="t.resultOkDesc" tone="success" />
                  <EmptyState :title="t.emptyTitle" :description="t.emptyDesc" />
                  <CalloutBox tone="info" variant="outline">{{ t.callout }}</CalloutBox>
                  <ValueSurface value="https://api.example.com/v1/chat/completions" mono />
                </div>
              </div>
              <div class="pg-demo-group">
                <h3>Loading</h3>
                <div class="pg-split">
                  <div class="pg-stack-tight">
                    <Skeleton width="42%" height="0.75rem" rounded="full" />
                    <Skeleton height="1.25rem" />
                    <Skeleton width="76%" height="0.75rem" />
                  </div>
                  <div class="pg-stack-tight">
                    <Skeleton height="5rem" rounded="lg" />
                    <Skeleton width="36%" height="0.75rem" rounded="full" :animate="false" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article id="layout" class="pg-demo-section">
          <div class="pg-demo-meta">
            <p class="pg-kicker">{{ t.layoutKicker }}</p>
            <h2>{{ t.layoutTitle }}</h2>
            <p>{{ t.layoutDesc }}</p>
          </div>
          <div class="pg-demo-body">
            <div class="pg-surface pg-stack">
              <div class="pg-demo-group">
                <h3>Navigation</h3>
                <div class="pg-row">
                  <SegmentedTabs v-model="tab" :options="tabOptions" />
                  <ViewModeSwitch v-model="viewMode" />
                  <ActionMenu :label="t.batch" :items="actionItems" />
                </div>
              </div>
              <div class="pg-demo-group">
                <h3>Toolbar</h3>
                <ToolbarShell stack-on-mobile start-class="flex-1" end-class="xl:justify-end">
                  <template #start>
                    <div class="ui-toolbar-group">
                      <Input model-value="" :placeholder="t.search" root-class="min-w-[11rem] flex-1 md:w-80 md:flex-none" />
                      <FilterSelect v-model="status" :options="statusOptions" :placeholder="t.filter" selected-indicator="none" />
                      <Button size="sm" variant="outline">{{ t.refresh }}</Button>
                      <Button size="sm" variant="primary">{{ t.add }}</Button>
                    </div>
                  </template>
                  <template #end>
                    <div class="ui-toolbar-group"><ViewModeSwitch v-model="viewMode" /><ActionMenu :label="t.batch" :items="actionItems" /></div>
                  </template>
                </ToolbarShell>
              </div>
              <div class="pg-demo-group">
                <h3>Cards / Data</h3>
                <div class="pg-col-3">
                  <StatCard :label="t.requests" value="18,240" :caption="t.requestsDesc" />
                  <StatCard :label="t.latency" value="286ms" caption="p95" icon="lucide:timer-reset" icon-tone="warning" />
                  <StatCard :label="t.successRate" value="99.4%" :caption="t.successRateDesc" variant="outline" icon="lucide:badge-check" icon-tone="success" />
                </div>
                <div class="pg-split">
                  <ChartCard title="Soft ChartCard" description="Default chart container"><div class="pg-stage pg-stage--soft">Chart content area</div></ChartCard>
                  <div class="pg-stage pg-stack"><CardHeader title="Divider Header" description="Default header with divider" /><KeyValueList :items="summaryItems" :columns="1" /><CodeBlock code="stream request failed: upstream returned loading-only response (e=7), no final text generated" /></div>
                </div>
                <div class="pg-stage pg-stack">
                  <TableShell>
                    <template #head><tr><th>{{ t.name }}</th><th>{{ t.desc }}</th><th>{{ t.state }}</th></tr></template>
                    <tr class="border-t border-border"><td>{{ t.main }}</td><td class="text-sm text-muted-foreground">{{ t.mainDesc }}</td><td><StatusPill :label="t.ok" tone="success" /></td></tr>
                    <tr class="border-t border-border"><td>{{ t.backup }}</td><td class="text-sm text-muted-foreground">{{ t.backupDesc }}</td><td><StatusPill :label="t.limited" tone="warning" variant="outline" /></td></tr>
                  </TableShell>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article id="overlay" class="pg-demo-section">
          <div class="pg-demo-meta">
            <p class="pg-kicker">{{ t.overlayKicker }}</p>
            <h2>{{ t.overlayTitle }}</h2>
            <p>{{ t.overlayDesc }}</p>
          </div>
          <div class="pg-demo-body">
            <div class="pg-surface pg-stack">
              <div class="pg-row">
                <Button size="sm" variant="outline" @click="confirmOpen = true">{{ t.openConfirm }}</Button>
                <Button size="sm" variant="outline" @click="modalOpen = true">{{ t.openModal }}</Button>
                <Button size="sm" variant="outline" @click="modalOpenFooter = true">{{ t.openFooter }}</Button>
                <Button size="sm" variant="outline" @click="bareModalOpen = true">{{ t.openBare }}</Button>
                <Button size="sm" variant="outline" @click="pushToast('success')">{{ t.toastOk }}</Button>
                <Button size="sm" variant="outline" @click="pushToast('warning')">{{ t.toastWarn }}</Button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>

    <ConfirmDialog :open="confirmOpen" :title="t.confirmTitle" :message="t.confirmMsg" :confirm-text="t.confirm" :cancel-text="t.cancel" @cancel="confirmOpen = false" @confirm="confirmOpen = false" />
    <ModalShell :open="modalOpen" :title="t.apiInfo" :description="t.apiDesc" @close="modalOpen = false"><div class="pg-row"><ValueSurface value="https://api.example.com/v1/models" mono root-class="pg-value-width" /><StatusPill :label="t.ok" tone="success" /></div></ModalShell>
    <ModalShell :open="modalOpenFooter" :title="t.footerTitle" :description="t.footerDesc" @close="modalOpenFooter = false"><div class="pg-stack"><Input model-value="Modal body input" block /><CalloutBox tone="info">{{ t.modalBody }}</CalloutBox></div><template #footer><Button size="sm" variant="outline" @click="modalOpenFooter = false">{{ t.cancel }}</Button><Button size="sm" variant="primary" @click="modalOpenFooter = false">{{ t.save }}</Button></template></ModalShell>
    <ModalShell :open="bareModalOpen" bare aria-label="Bare modal example" max-width="34rem" root-class="p-5" @close="bareModalOpen = false">
      <div class="pg-stack">
        <div>
          <h3 class="ui-section-title">{{ t.bareTitle }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ t.bareDesc }}</p>
        </div>
        <ValueSurface value="Consumer-owned layout and scrolling" mono />
        <div class="pg-row justify-end">
          <Button size="sm" variant="outline" @click="bareModalOpen = false">{{ t.cancel }}</Button>
          <Button size="sm" variant="primary" @click="confirmOpen = true">{{ t.openConfirm }}</Button>
        </div>
      </div>
    </ModalShell>
    <Toast :toasts="toasts" @remove="removeToast" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { ActionMenu, Button, CalloutBox, CardHeader, ChartCard, Checkbox, CodeBlock, ConfirmDialog, EmptyState, FieldGrid, FilterSelect, FormField, FormSection, GroupedSelectMenu, HelpTip, HoverCard, Input, KeyValueList, MetaChip, ModalShell, ResultState, SegmentedTabs, SelectMenu, Skeleton, StatCard, StatusDetailPill, StatusPill, TableShell, Toast, ToolbarShell, Tooltip, ValueSurface, ViewModeSwitch, nanocatEnUS, nanocatZhCN, setNanocatLocale } from '../src'
import type { ActionMenuItem, KeyValueItem, ToastItem } from '../src'
const dict = {
  zh: { hero:'组件原生展示台', heroDesc:'左侧看说明和导航，右侧看真实组件表现。', overview:'Overview', goal:'当前目标', goalDesc:'先看组件本体，再决定主题怎么抽象。', metricComponents:'组件数', metricSections:'分区数', nav:'Sections', controlsKicker:'Controls', controlsTitle:'输入与操作', controlsDesc:'把按钮、输入、下拉、表单放在一起看。', feedbackKicker:'Feedback', feedbackTitle:'状态与反馈', feedbackDesc:'集中查看提示、标签、空态和结果态。', layoutKicker:'Layout', layoutTitle:'切换与数据展示', layoutDesc:'把切换、工具栏、统计卡和表格放在一起看整体气质。', overlayKicker:'Overlay', overlayTitle:'弹层与通知', overlayDesc:'单独检查确认框、弹窗和 Toast。', filter:'状态筛选', maxConcurrency:'最大并发', quota:'启用每日配额统计', disabledCheck:'禁用复选框', help:'HelpTip 是对 Tooltip 的轻量封装。', ok:'正常', okDesc:'当前状态稳定，服务可用。', err:'异常', errDesc:'建议检查上游连接和登录态。', processing:'处理中', processingDesc:'正在等待上游完成返回。', limited:'受限', limitedDesc:'当前账号处于临时避让中。', loadingOnly:'上游卡在加载中', loadingOnlyDesc:'上游有响应，但最后没有返回正式正文。', parseFail:'响应内容异常', parseFailDesc:'上游结构不完整，无法解析有效内容。', resultOk:'部署完成', resultOkDesc:'静态资源和路由已成功发布。', emptyTitle:'暂无日志', emptyDesc:'发起请求后，这里会出现新的日志分组。', callout:'这是 info outline callout。', batch:'批量操作', search:'搜索账号 / Cookie', refresh:'刷新列表', add:'添加账户', requests:'请求量', requestsDesc:'最近 24 小时总量', latency:'延迟', successRate:'成功率', successRateDesc:'最近 24 小时', name:'名称', desc:'说明', state:'状态', main:'主账号', mainDesc:'调度优先级最高', backup:'备用账号', backupDesc:'图片生成备用链路', openConfirm:'打开确认弹窗', openModal:'打开弹窗', openFooter:'打开带 Footer 弹窗', openBare:'打开 Bare 弹窗', bareTitle:'自定义布局弹窗', bareDesc:'Bare 模式保留调用方的内容布局与滚动职责。', toastOk:'成功通知', toastWarn:'警告通知', confirmTitle:'确认清空日志？', confirmMsg:'这个操作不会删除请求记录，只会清空当前可见列表。', confirm:'确认', cancel:'取消', apiInfo:'接口信息', apiDesc:'基础 ModalShell 示例', footerTitle:'带 Footer 的 ModalShell', footerDesc:'header / body / footer 三段结构', modalBody:'这里是 modal body 内容。', save:'保存' },
  en: { hero:'Component native showcase', heroDesc:'Notes on the left, real components on the right.', overview:'Overview', goal:'Current goal', goalDesc:'Judge the component first, then refine the theme layer.', metricComponents:'Components', metricSections:'Sections', nav:'Sections', controlsKicker:'Controls', controlsTitle:'Inputs and actions', controlsDesc:'Review buttons, inputs, selects and forms together.', feedbackKicker:'Feedback', feedbackTitle:'States and feedback', feedbackDesc:'Check hints, labels, empty states and result states.', layoutKicker:'Layout', layoutTitle:'Switches and data display', layoutDesc:'Compare switching components, toolbars, stat cards and tables.', overlayKicker:'Overlay', overlayTitle:'Dialogs and notifications', overlayDesc:'Isolate confirm dialogs, modals and toasts.', filter:'Status filter', maxConcurrency:'Max concurrency', quota:'Enable daily quota stats', disabledCheck:'Disabled checkbox', help:'HelpTip is a lightweight wrapper around Tooltip.', ok:'Healthy', okDesc:'Current state is stable and available.', err:'Error', errDesc:'Check upstream connection and auth.', processing:'Processing', processingDesc:'Waiting for upstream to finish.', limited:'Limited', limitedDesc:'This account is temporarily backed off.', loadingOnly:'Loading only', loadingOnlyDesc:'Upstream responded, but no final text was produced.', parseFail:'Parse failure', parseFailDesc:'The upstream payload could not be parsed into valid content.', resultOk:'Deploy completed', resultOkDesc:'Static assets and routes were published successfully.', emptyTitle:'No logs yet', emptyDesc:'New log groups appear after requests start flowing.', callout:'This is an info outline callout.', batch:'Batch actions', search:'Search account / Cookie', refresh:'Refresh list', add:'Add account', requests:'Requests', requestsDesc:'Last 24h total', latency:'Latency', successRate:'Success rate', successRateDesc:'Last 24h', name:'Name', desc:'Description', state:'Status', main:'Main account', mainDesc:'Highest scheduling priority', backup:'Backup account', backupDesc:'Image generation fallback lane', openConfirm:'Open confirm dialog', openModal:'Open modal', openFooter:'Open footer modal', openBare:'Open bare modal', bareTitle:'Custom layout modal', bareDesc:'Bare mode keeps layout and scrolling with the caller.', toastOk:'Success toast', toastWarn:'Warning toast', confirmTitle:'Clear logs?', confirmMsg:'This only clears the visible list. It does not delete request records.', confirm:'Confirm', cancel:'Cancel', apiInfo:'API information', apiDesc:'Basic ModalShell example', footerTitle:'Modal with footer', footerDesc:'Header / body / footer structure', modalBody:'This is modal body content.', save:'Save' }
} as const
const lang = ref<'zh' | 'en'>('zh')
const t = computed(() => dict[lang.value])
const sections = computed(() => [{ id:'controls', title:t.value.controlsTitle, desc:t.value.controlsDesc }, { id:'feedback', title:t.value.feedbackTitle, desc:t.value.feedbackDesc }, { id:'layout', title:t.value.layoutTitle, desc:t.value.layoutDesc }, { id:'overlay', title:t.value.overlayTitle, desc:t.value.overlayDesc }])
const lane = ref('thinking'); const selectedLanes = ref<string[]>(['fast', 'thinking']); const groupedLane = ref('fast'); const selectedGroupedLanes = ref<string[]>(['fast']); const lanes = ref<string[]>(['fast', 'thinking']); const status = ref('all'); const quotaEnabled = ref(true); const quotaDisabled = ref(false); const tab = ref('summary'); const tabDisabled = ref('requests'); const viewMode = ref<'list'|'cards'>('cards'); const viewModeLarge = ref<'list'|'cards'>('list'); const confirmOpen = ref(false); const modalOpen = ref(false); const modalOpenFooter = ref(false); const bareModalOpen = ref(false); const toasts = ref<ToastItem[]>([])
const laneOptions = [{ label:'fast', value:'fast' }, { label:'thinking', value:'thinking' }, { label:'pro', value:'pro' }]
const groupedLaneGroups = [{ label:'Fast lanes', options:[{ label:'fast', value:'fast' }, { label:'thinking', value:'thinking' }] }, { label:'Dedicated', options:[{ label:'pro', value:'pro' }] }]
const statusOptions = computed(() => [{ label: lang.value === 'zh' ? '全部状态' : 'All status', value:'all' }, { label:t.value.ok, value:'active' }, { label:t.value.limited, value:'limited' }, { label:t.value.err, value:'failed' }])
const tabOptions = computed(() => [{ label: lang.value === 'zh' ? '摘要' : 'Summary', value:'summary' }, { label: lang.value === 'zh' ? '结构化' : 'Structured', value:'structured' }, { label: lang.value === 'zh' ? '全部会话' : 'All conversations', value:'all' }])
const tabOptionsWithCounts = computed(() => [{ label: lang.value === 'zh' ? '请求' : 'Requests', value:'requests', count:18 }, { label: lang.value === 'zh' ? '错误' : 'Errors', value:'errors', count:3 }])
const actionItems = computed<ActionMenuItem[]>(() => [{ key:'menu-heading', label: lang.value === 'zh' ? '数据操作' : 'Data actions', heading:true }, { key:'refresh', label: lang.value === 'zh' ? '刷新数据' : 'Refresh data' }, { key:'view', label: lang.value === 'zh' ? '查看视图' : 'View mode', active:true, children:[{ key:'cards', label: lang.value === 'zh' ? '卡片视图' : 'Cards' }, { key:'table', label: lang.value === 'zh' ? '表格视图' : 'Table' }] }, { key:'export', label: lang.value === 'zh' ? '导出快照' : 'Export snapshot' }, { key:'clear', label: lang.value === 'zh' ? '清空列表' : 'Clear list', danger:true, dividerBefore:true }])
const summaryItems = computed<KeyValueItem[]>(() => [{ label: lang.value === 'zh' ? '当前版本' : 'Current version', value:'0.1.x', badge:'stable' }, { label: lang.value === 'zh' ? '发布方式' : 'Package', value:'npm: nanocat-ui', mono:true }, { label: lang.value === 'zh' ? '定位' : 'Positioning', value: lang.value === 'zh' ? 'Vue 3 仪表盘组件库' : 'Vue 3 dashboard components' }])
watch(lang, (value) => { setNanocatLocale(value === 'zh' ? nanocatZhCN : nanocatEnUS); toasts.value = value === 'zh' ? [{ id:'1', type:'success', title:'已保存', message:'配置已同步完成。', duration:0 }, { id:'2', type:'warning', title:'受限', message:'当前账号处于临时避让中。', duration:0 }] : [{ id:'1', type:'success', title:'Saved', message:'Settings were synced successfully.', duration:0 }, { id:'2', type:'warning', title:'Limited', message:'This account is temporarily backed off.', duration:0 }] }, { immediate:true })
function pushToast(type:'success'|'warning'){ const item:ToastItem = type === 'success' ? { id:`${Date.now()}-s`, type:'success', title: lang.value === 'zh' ? '已保存' : 'Saved', message: lang.value === 'zh' ? '配置已同步完成。' : 'Settings were synced successfully.', duration:0 } : { id:`${Date.now()}-w`, type:'warning', title: lang.value === 'zh' ? '受限' : 'Limited', message: lang.value === 'zh' ? '当前账号处于临时避让中。' : 'This account is temporarily backed off.', duration:0 }; toasts.value = [item, ...toasts.value].slice(0, 4) }
function removeToast(id:string){ toasts.value = toasts.value.filter((item) => item.id !== id) }
</script>
