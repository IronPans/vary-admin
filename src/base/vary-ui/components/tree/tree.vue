<template>
  <div :class="prefixCls">
    <div v-if="loading" :class="`${prefixCls}-loading`">
      <div :class="`${prefixCls}-loading-mask`"></div>
      <div :class="`${prefixCls}-loading-content`"></div>
    </div>
    <ul :class="`${prefixCls}-inner`">
      <va-tree-node
        v-for="(node, index) in data"
        :selection-mode="selectionMode"
        :selection="currentSelection"
        :node="node"
        :key="index.toString()"
        :index="index"
      ></va-tree-node>
    </ul>
    <div v-if="!loading && data.length > 0" :class="`${prefixCls}-empty-message`">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import { oneOf } from "@/base/vary-ui/components/base/utils";
import vaTreeNode from "./tree-node.vue";
import { treeInjectKey } from "./config";

const prefixCls = "va-tree";

export default defineComponent({
  name: "VaTree",
  components: { vaTreeNode },
  props: {
    emptyMessage: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    passSelectedUp: {
      type: Boolean,
      default: true,
    },
    passSelectedDown: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: [Object],
    },
    selectionMode: {
      validator(value) {
        return oneOf(value, ["single", "checkbox"]);
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: [
    "on-change",
    "on-node-unselect",
    "on-node-collapse",
    "on-node-expand",
    "on-node-select",
  ],
  setup(props, { emit }) {
    const currentSelection = ref(props.selection || []);
    const data = ref(props.data || []);
    const { passSelectedDown, passSelectedUp, selectionMode, selection } = props;
    provide(treeInjectKey, {
      onNodeCollapse,
      onNodeExpand,
      onNodeClick,
      onNodeTouchEnd,
    });
    function onNodeClick(event, node) {
      if (selectionMode) {
        const index = findIndexInSelection(node);
        const selected = index >= 0;

        if (isCheckboxSelectionMode()) {
          if (selected) {
            if (passSelectedDown) {
              passDown(node, false);
            } else {
              currentSelection.value = getSelection(index);
            }

            if (passSelectedUp && node.parent) {
              passUp(node.parent, false);
            }
            onSelectChange();
            onNodeUnselect({ originalEvent: event, node });
          } else {
            if (passSelectedDown) {
              passDown(node, true);
            } else {
              currentSelection.value = [...(selection || []), node];
            }

            if (passSelectedUp && node.parent) {
              passUp(node.parent, true);
            }
            onSelectChange();
            onNodeSelect({ originalEvent: event, node });
          }
        } else {
          if (isSingleSelectionMode()) {
            if (selected) {
              currentSelection.value = [];
              onNodeUnselect({ originalEvent: event, node });
            } else {
              currentSelection.value = node;
              onNodeSelect({ originalEvent: event, node });
            }
          } else {
            if (selected) {
              currentSelection.value = getSelection(index);
              onNodeUnselect({ originalEvent: event, node });
            } else {
              currentSelection.value = [...(currentSelection.value || []), node];
              onNodeSelect({ originalEvent: event, node });
            }
          }
          onSelectChange();
        }
      }
      //   nodeTouched = false;
    }

    function onNodeTouchEnd() {
      //   nodeTouched = true;
    }

    function passUp(node, select) {
      if (node.children && node.children.length) {
        let selectedCount = 0;
        let childPartialSelected = false;
        for (const child of node.children) {
          if (isSelected(child)) {
            selectedCount++;
          } else if (child.partialSelected) {
            childPartialSelected = true;
          }
        }

        if (select && selectedCount === node.children.length) {
          currentSelection.value = [...(currentSelection.value || []), node];
          node.partialSelected = false;
        } else {
          if (!select) {
            const index = findIndexInSelection(node);
            if (index >= 0) {
              currentSelection.value = getSelection(index);
            }
          }

          node.partialSelected =
            childPartialSelected ||
            (selectedCount > 0 && selectedCount !== node.children.length);
        }
      }

      const parent = node.parent;
      if (parent) {
        passUp(parent, select);
      }
    }

    function passDown(node, select) {
      const index = findIndexInSelection(node);

      if (select && index === -1) {
        currentSelection.value = [...(currentSelection.value || []), node];
      } else if (!select && index > -1) {
        currentSelection.value = getSelection(index);
      }

      node.partialSelected = false;

      if (node.children && node.children.length) {
        for (const child of node.children) {
          passDown(child, select);
        }
      }
    }

    function getSelection(index) {
      return currentSelection.value.filter((val, i) => val && i !== index);
    }

    function findIndexInSelection(node) {
      let index = -1;

      if (selectionMode && currentSelection.value) {
        if (isSingleSelectionMode()) {
          index = currentSelection.value === node ? 0 : -1;
        } else {
          for (let i = 0; i < currentSelection.value.length; i++) {
            if (currentSelection.value?.[i] === node) {
              index = i;
              break;
            }
          }
        }
      }

      return index;
    }

    function isSelected(node) {
      return findIndexInSelection(node) !== -1;
    }

    function isSingleSelectionMode() {
      return selectionMode && selectionMode === "single";
    }

    function isCheckboxSelectionMode() {
      return selectionMode && selectionMode === "checkbox";
    }

    function onNodeCollapse(data) {
      emit("on-node-collapse", data);
    }

    function onNodeExpand(data) {
      emit("on-node-expand", data);
    }
    function onNodeSelect(data) {
      emit("on-node-select", data);
    }
    function onNodeUnselect(data) {
      emit("on-node-unselect", data);
    }
    function onSelectChange() {
      emit("on-change", currentSelection.value);
    }
    return {
      prefixCls,
      data,
      currentSelection,
      //   nodeTouched: false,
    };
  },
});
</script>
