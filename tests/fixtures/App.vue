<template>
  <main>
    <button data-testid="open-confirm" type="button" @click="confirmOpen = true">
      Open confirmation
    </button>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete item"
      message="This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      @cancel="handleConfirmCancel"
    />

    <output data-testid="confirm-cancel-count">{{ confirmCancelCount }}</output>

    <LoadingState
      data-testid="standalone-loading-state"
      title="Loading records"
      description="Reading the latest data."
    />
    <LoadingState
      data-testid="start-loading-state"
      title="Processing records"
      align="start"
      flush
      compact
    />

    <section>
      <button data-testid="select-before" type="button">Before select</button>
      <SelectMenu
        v-model="selectValue"
        aria-label="Choose select"
        :options="selectOptions"
      />
      <button data-testid="select-after" type="button">After select</button>
    </section>

    <section>
      <button data-testid="grouped-before" type="button">Before grouped select</button>
      <GroupedSelectMenu
        v-model="groupedValue"
        aria-label="Choose grouped select"
        :groups="groupedOptions"
      />
      <button data-testid="grouped-after" type="button">After grouped select</button>
    </section>

    <section>
      <button data-testid="action-before" type="button">Before action menu</button>
      <ActionMenu
        label="Choose action"
        :items="actionItems"
      />
      <button data-testid="action-after" type="button">After action menu</button>
    </section>

    <HoverCard focusable>
      <span>Credential status</span>
      <template #content>
        <span>Credential details</span>
      </template>
    </HoverCard>

    <button data-testid="open-menu-modal" type="button" @click="menuModalOpen = true">
      Open menu modal
    </button>
    <ModalShell
      :open="menuModalOpen"
      title="Menu modal"
      :show-close="false"
      @close="menuModalOpen = false"
    >
      <button data-testid="modal-first" type="button">First modal control</button>
      <SelectMenu
        v-model="modalSelectValue"
        aria-label="Choose modal select"
        :options="selectOptions"
      />
    </ModalShell>
    <button data-testid="outside-after-modal" type="button">Outside after modal</button>

    <button data-testid="open-drawer" type="button" @click="drawerOpen = true">
      Open drawer
    </button>
    <DrawerShell
      :open="drawerOpen"
      title="Activity drawer"
      @close="drawerOpen = false"
    >
      <p>Drawer content</p>
    </DrawerShell>

    <button data-testid="open-detached-drawer" type="button" @click="detachedDrawerOpen = true">
      Open detached drawer
    </button>
    <button data-testid="detached-drawer-background-action" type="button" @click="backgroundActionCount += 1">
      Background action
    </button>
    <output data-testid="background-action-count">{{ backgroundActionCount }}</output>
    <DrawerShell
      :open="detachedDrawerOpen"
      title="Detached activity drawer"
      :show-backdrop="false"
      @close="detachedDrawerOpen = false"
    >
      <p>Detached drawer content</p>
    </DrawerShell>

    <SideDock
      :open="sideDockOpen"
      aria-label="Open minimized task"
      width="11rem"
      @click="sideDockClickCount += 1"
    >
      <strong>Task progress</strong>
      <span>3 of 5 complete</span>
    </SideDock>
    <output data-testid="side-dock-click-count">{{ sideDockClickCount }}</output>

    <TableShell
      data-testid="table-shell-modern"
      root-class="new-root-marker"
      scroll-class="new-scroll-marker"
      hover-rows
    >
      <template #head>
        <tr><th>Column</th></tr>
      </template>
      <tr
        data-testid="table-shell-hover-row"
        style="background: rgb(255, 240, 240)"
      >
        <td>Value</td>
      </tr>
      <tr
        data-testid="table-shell-selected-row"
        aria-selected="true"
        style="background: rgb(240, 240, 240)"
      >
        <td>Selected value</td>
      </tr>
      <template #footer>
        <span>Table footer</span>
      </template>
    </TableShell>
    <TableShell
      data-testid="table-shell-legacy"
      wrapper-class="legacy-root-marker"
    >
      <tr><td>Legacy value</td></tr>
    </TableShell>
    <TableShell
      data-testid="table-shell-loading"
      loading
      loading-description="Reading the latest table rows."
      :empty-colspan="3"
      style="height: 12rem"
      fill
    >
      <template #head>
        <tr><th>One</th><th>Two</th><th>Three</th></tr>
      </template>
    </TableShell>
    <TableShell
      data-testid="table-shell-empty"
      show-empty
      empty-title="No table rows"
      empty-description="The page should keep scrolling over this state."
      :empty-colspan="3"
      style="height: 12rem"
      fill
    >
      <template #head>
        <tr><th>One</th><th>Two</th><th>Three</th></tr>
      </template>
    </TableShell>
    <TableShell
      data-testid="table-shell-scroll-layout"
      style="width: 18rem; height: 12rem"
      scroll-mode="contained"
      sticky-header
      table-class="scroll-layout-wide"
    >
      <template #head>
        <tr><th>Wide table content</th></tr>
      </template>
      <tr v-for="row in 12" :key="row"><td>Row {{ row }}</td></tr>
      <template #footer>
        <span data-testid="table-shell-scroll-footer">Pagination</span>
      </template>
    </TableShell>
    <TableShell
      data-testid="table-shell-page-layout"
      style="width: 18rem"
      fill
      scroll-mode="page"
      table-class="scroll-layout-wide"
    >
      <tr v-for="row in 3" :key="row"><td>Page row {{ row }}</td></tr>
    </TableShell>
    <section
      data-testid="checkbox-scroll-outer"
      style="height: 12rem; overflow: hidden"
    >
      <TableShell
        data-testid="checkbox-scroll-table"
        style="height: 12rem"
        scroll-mode="contained"
      >
        <template #head>
          <tr><th>Select</th><th>Row</th></tr>
        </template>
        <tr v-for="row in 40" :key="row">
          <td>
            <Checkbox
              :data-testid="`checkbox-scroll-row-${row}`"
              :model-value="checkedRow === row"
              :aria-label="`Select row ${row}`"
              @update:model-value="checkedRow = $event ? row : 0"
            />
          </td>
          <td>Checkbox row {{ row }}</td>
        </tr>
      </TableShell>
      <div aria-hidden="true" style="height: 80rem"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ActionMenu from '../../src/components/ActionMenu.vue'
import Checkbox from '../../src/components/Checkbox.vue'
import ConfirmDialog from '../../src/components/ConfirmDialog.vue'
import DrawerShell from '../../src/components/DrawerShell.vue'
import GroupedSelectMenu from '../../src/components/GroupedSelectMenu.vue'
import HoverCard from '../../src/components/HoverCard.vue'
import LoadingState from '../../src/components/LoadingState.vue'
import ModalShell from '../../src/components/ModalShell.vue'
import SelectMenu from '../../src/components/SelectMenu.vue'
import SideDock from '../../src/components/SideDock.vue'
import TableShell from '../../src/components/TableShell.vue'

const confirmOpen = ref(false)
const confirmCancelCount = ref(0)
const selectValue = ref('alpha')
const selectOptions = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
]
const groupedValue = ref('one')
const groupedOptions = [
  {
    label: 'Numbers',
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
]
const actionItems = [
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
  {
    key: 'more',
    label: 'More',
    children: [
      { key: 'duplicate', label: 'Duplicate' },
    ],
  },
]
const menuModalOpen = ref(false)
const modalSelectValue = ref('alpha')
const drawerOpen = ref(false)
const detachedDrawerOpen = ref(false)
const backgroundActionCount = ref(0)
const sideDockOpen = ref(true)
const sideDockClickCount = ref(0)
const checkedRow = ref(0)

function handleConfirmCancel() {
  confirmOpen.value = false
  confirmCancelCount.value += 1
}
</script>

<style>
.scroll-layout-wide {
  min-width: 48rem !important;
}

</style>
