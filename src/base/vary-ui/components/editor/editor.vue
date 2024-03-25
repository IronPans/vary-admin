<template>
  <div :class="classes" ref="container" :style="styles">
    <div
      class="va-editor-toolbar clearfix"
      ref="toolbarElem"
      :style="{ display: toolbar ? 'block' : 'none' }"
    >
      <template v-for="name in toolbarButtons">
        <a
          :class="toolbarButtonClasses(name)"
          @click="onMenuButtonClick(defaultButtons[name], $event)"
          :data-tooltip="defaultButtons[name].title"
          :data-edit="name"
        >
          <template v-if="name !== 'align'">
            {{ defaultButtons[name].icon }}
          </template>
          <template v-else>{{ alignIcon }}</template>
        </a>
      </template>
    </div>
    <div class="va-editor-content">
      <div
        class="va-editor-wrapper va-iscroll"
        @click="handleEditorClick"
        ref="editor"
        tabindex="1"
        contenteditable="true"
        spellcheck="false"
        @focus="onFocus()"
        @blur="onBlur"
        @keydown="onKeydown"
        @mouseup="onMouseup"
        @mousedown="onMouseDown"
        @keyup="onEtKeyup"
      ></div>
    </div>
    <div class="va-editor-table-resizer">
      <div class="va-editor-table-resizer-line"></div>
    </div>
    <div
      class="va-editor-modal-portal"
      ref="modal"
      :style="{ display: isModalShow ? 'block' : 'none', top: toolbarHeight + 'px' }"
    >
      <span class="va-editor-modal-arrow"></span>
      <div
        class="va-editor-heading"
        :style="{ display: isHeadingShow ? 'block' : 'none' }"
      >
        <h1 @click="onHeadingClick('h1')">h1</h1>
        <h2 @click="onHeadingClick('h2')">h2</h2>
        <h3 @click="onHeadingClick('h3')">h3</h3>
        <h4 @click="onHeadingClick('h4')">h4</h4>
        <h5 @click="onHeadingClick('h5')">h5</h5>
        <h6 @click="onHeadingClick('h6')">h6</h6>
      </div>
      <div class="va-editor-align" :style="{ display: isAlignShow ? 'block' : 'none' }">
        <a
          class="va-editor-toolbar-icon va-editor-tooltip"
          v-for="btn in alignButtons"
          @click="onMenuButtonClick(btn, $event)"
          :data-tooltip="btn.title"
          :class="{ active: btn.selected }"
          :data-edit="btn.name"
          >{{ btn.icon }}</a
        >
      </div>
      <div
        class="va-editor-fontSize va-iscroll"
        :style="{ display: isFontSizeShow ? 'block' : 'none' }"
      >
        <ul>
          <li v-for="size in fontSize" :class="{ active: size == currentFontSize }">
            <span @click="changeFontSize($event, size)">{{ size }}</span>
          </li>
        </ul>
      </div>
      <div
        class="va-editor-color-picker"
        :style="{ display: isColorpickerShow ? 'block' : 'none' }"
      >
        <va-color-picker
          v-model="color"
          @on-change="onColorChange"
          :clickable="true"
          @click.native="onColorpickerClick"
          :inline="true"
        ></va-color-picker>
      </div>
      <div class="va-editor-link" :style="{ display: isLinkShow ? 'block' : 'none' }">
        <input
          type="text"
          v-model="linkValue"
          placeholder="www.example.com"
          class="va-editor-link-input"
        />
        <button type="button" class="va-editor-confirm" @click="onLinkConfirm(linkValue)">
          Insert
        </button>
      </div>
      <div class="va-editor-file" :style="{ display: isUploadShow ? 'block' : 'none' }">
        <div class="va-editor-link">
          <input
            type="text"
            v-model="imageValue"
            placeholder="image url"
            class="va-editor-link-input"
          />
          <button
            type="button"
            class="va-editor-confirm"
            @click="uploadImage(imageValue)"
          >
            Insert
          </button>
        </div>
        <div class="va-editor-upload">
          <i class="fa fa-plus"></i> Upload
          <input
            type="file"
            name="photo"
            accept="image/*"
            class="va-editor-file-input"
            @change="onUploadChange"
          />
        </div>
      </div>
      <div
        class="va-editor-emotion"
        :style="{ display: isEmotionShow ? 'block' : 'none' }"
      >
        <template v-for="(emotion, i) in emotions">
          <span class="va-emotion-item">
            <span class="va-editor-emotion" @click="onEmotionClick(emotion)">{{
              emotion.icon
            }}</span>
          </span>
          <br v-if="i % 8 === 7" />
        </template>
      </div>
      <div class="va-editor-table" v-if="isTableShow">
        <p class="m-0">{{ selectedRow + 1 }} * {{ selectedCol + 1 }}</p>
        <div class="va-editor-table-wrapper">
          <template v-for="(td, i) in tds">
            <span
              class="va-editor-table-td"
              :class="{ active: isTdInSelected(i) }"
              @mouseenter="onTdMouseenter(i)"
              @mousedown="onTdMousedown(i)"
            >
              <span></span>
            </span>
            <br v-if="i % 10 === 9" />
          </template>
        </div>
      </div>
    </div>
    <div
      class="va-editor-popup"
      ref="linkPopup"
      :style="{ display: isLinkPopupShow ? 'block' : 'none' }"
    >
      <div class="va-editor-link">
        <input
          type="text"
          v-model="linkValue"
          placeholder="www.example.com"
          class="va-editor-link-input"
        />
        <button
          type="button"
          class="va-editor-confirm"
          @click="onLinkChange(linkValue, widthValue, heightValue)"
        >
          Update
        </button>
      </div>
      <div class="image-size" :style="{ display: isImageLink ? 'block' : 'none' }">
        <span>width：</span><input type="text" v-model="widthValue" />
        <span>height：</span><input type="text" v-model="heightValue" />
      </div>
      <div class="arrow"></div>
    </div>
    <div
      class="va-editor-popup"
      ref="tablePopup"
      :style="{ display: isTablePopupShow ? 'block' : 'none' }"
    >
      <div class="arrow"></div>
      <div class="va-editor-table-button">
        <span
          class="va-editor-dropdown-menu va-editor-tooltip"
          data-tooltip="Row"
          @click="onTableDropdown(row, col)"
        >
          <i class="fa fa-bars"></i>
          <ul ref="row">
            <li @click="addRow(1)">Insert row above</li>
            <li @click="addRow(-1)">Insert row below</li>
            <li @click="deleteRow()">Delete row</li>
          </ul>
        </span>
        <span
          class="va-editor-dropdown-menu va-editor-tooltip"
          data-tooltip="Column"
          @click="onTableDropdown(col, row)"
        >
          <i class="fa fa-bars fa-rotate-90"></i>
          <ul ref="col">
            <li @click="addColumn(-1)">Insert column before</li>
            <li @click="addColumn(1)">Insert column after</li>
            <li @click="deleteColumn()">Delete column</li>
          </ul>
        </span>
        <span
          @click="deleteTable()"
          class="va-editor-tooltip"
          data-tooltip="Delete table"
        >
          <i class="fa fa-trash"></i>
        </span>
      </div>
    </div>
    <div class="va-editor-counter" v-if="counter">
      {{ contentLength }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, onUnmounted } from "vue";
import {
  addClass,
  removeClass,
  hasClass,
  insertAfter,
  insertBefore,
  getHiddenElementOuterHeight,
  getRect,
  getStyle,
  forEach,
} from "../base/dom";
import vaColorPicker from "../color-picker";
import { getSize } from "../base/utils";
import { createEvent, triggerEvent, listen } from "../base/event";
import { EMOTIONS, fontSize, tds } from "./constant";

const prefixCls = "va-editor";

export default defineComponent({
  name: "va-editor",
  components: {
    vaColorPicker,
  },
  props: {
    buttons: {
      type: Array,
    },
    toolbar: {
      default: true,
    },
    readonly: {
      default: false,
    },
    maxHeight: {
      type: [Number, String],
    },
    counter: {
      default: true,
    },
    width: {
      type: [Number, String],
      default: 600,
    },
    height: {
      type: [Number, String],
      default: 300,
    },
  },
  emits: ["on-upload-completed"],
  setup(props, { emit }) {
    const container = ref();
    const modal = ref();
    const editor = ref();
    const linkPopup = ref();
    const tablePopup = ref();
    const toolbarElem = ref();
    let onMouseleaveListener: any;
    let onValueChangedListener: any;
    let onValueChangedEvent: any;
    let stackTimeoutId: any;
    const currentLinkElem: any = ref();
    const isTablePopupShow = ref(false);
    const alignIcon = ref("format_align_left");
    const toolbarHeight = ref(0);
    let fullscreen = false;
    const selectedRow = ref(0);
    const selectedCol = ref(0);
    const isModalShow = ref(false);
    const stack: any = [];
    let lastTime = 0;
    let stackIndex = 0;
    let toolButtons: any = [];
    const isImageLink = ref(false);
    let currentPosition: any;
    const capacity = 20;
    let selectedRange: any;
    const isLinkPopupShow = ref(false);
    const toolbarButtons: any = ref([]);
    let foreColor = "";
    let backColor = "";
    const contentLength = ref(0);
    const currentFontSize = ref(0);
    const isColorpickerShow = ref(false);

    const isHeadingShow = ref(false);
    const isFontSizeShow = ref(false);
    const isAlignShow = ref(false);
    const isTableShow = ref(false);
    const isLinkShow = ref(false);
    const isUploadShow = ref(false);
    const isEmotionShow = ref(false);
    const linkValue = ref("");
    let _startPosition: any;
    let _endPosition: any;
    const color = ref("");
    const imageValue = ref("");
    const widthValue = ref("");
    const heightValue = ref("");
    let currentButton: any;
    let colorType = "";
    const row = ref();
    const col = ref();
    const defaultButtons: any = {
      bold: {
        title: "Bold",
        icon: "format_bold",
        click: () => {
          execCommand("bold");
        },
      },
      italic: {
        title: "Italic",
        icon: "format_italic",
        click: () => {
          execCommand("italic");
        },
      },
      underline: {
        title: "Underline",
        icon: "format_underlined",
        click: () => {
          execCommand("underline");
        },
      },
      strikethrough: {
        title: "Strikethrough",
        icon: "strikethrough_s",
        click: () => {
          execCommand("strikethrough");
        },
      },
      // subscript: {
      //     title: 'Subscript',
      //     icon: '\uf12c',
      //     click: () => {
      //         execCommand('subscript');
      //     }
      // },
      // superscript: {
      //     title: 'Superscript',
      //     icon: '\uf12b',
      //     click: () => {
      //         execCommand('superscript');
      //     }
      // },
      heading: {
        title: "Heading",
        icon: "text_fields",
        click: () => {
          openModal();
          isHeadingShow.value = true;
        },
      },
      fontSize: {
        title: "Font size",
        icon: "title",
        click: () => {
          isFontSizeShow.value = true;
          openModal();
        },
      },
      foreColor: {
        title: "Colors",
        icon: "format_color_text",
        click: () => {
          isColorpickerShow.value = true;
          colorType = "foreColor";
          color.value = foreColor;
          openModal();
        },
      },
      backColor: {
        title: "Background",
        icon: "color_lens",
        click: () => {
          isColorpickerShow.value = true;
          colorType = "backColor";
          color.value = backColor;
          openModal();
        },
      },
      align: {
        title: "Align",
        icon: "format_align_left",
        click: () => {
          isAlignShow.value = true;
          openModal();
        },
      },
      insertOrderedList: {
        title: "Ordered List",
        icon: "format_list_numbered",
        click: () => {
          execCommand("insertOrderedList");
        },
      },
      insertUnorderedList: {
        title: "Unordered List",
        icon: "format_list_bulleted",
        click: () => {
          execCommand("insertUnorderedList");
        },
      },
      blockquote: {
        title: "Blockquote",
        icon: "format_quote",
        click: () => {
          execCommand("formatBlock", "<BLOCKQUOTE>");
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          editor.value.appendChild(p);
        },
      },
      table: {
        title: "Insert table",
        icon: "grid_on",
        click: () => {
          isTableShow.value = true;
          openModal();
        },
      },
      createLink: {
        title: "Insert Link",
        icon: "insert_link",
        click: () => {
          isLinkShow.value = true;
          openModal();
        },
      },
      insertImage: {
        title: "Insert Image",
        icon: "photo_size_select_actual",
        click: () => {
          isUploadShow.value = true;
          openModal();
        },
      },
      emotion: {
        title: "Insert Emotion",
        icon: "insert_emoticon",
        click: () => {
          console.log(123);
          isEmotionShow.value = true;
          openModal();
        },
      },
      fullscreen: {
        title: "Open Fullscreen",
        icon: "fullscreen",
        click: (event: any, btn: any) => {
          toggleFullScreen(btn);
        },
      },
      undo: {
        title: "Undo",
        icon: "undo",
        click: () => {
          execCommand("undo");
        },
      },
      redo: {
        title: "Redo",
        icon: "redo",
        click: () => {
          execCommand("redo");
        },
      },
    };
    const alignButtons = [
      {
        name: "justifyLeft",
        title: "Align Left",
        icon: "format_align_left",
        selected: true,
        click: () => {
          execCommand("justifyLeft");
          alignIcon.value = "\uf036";
        },
      },
      {
        name: "justifyCenter",
        title: "Align Center",
        icon: "format_align_center",
        click: () => {
          execCommand("justifyCenter");
          alignIcon.value = "\uf037";
        },
      },
      {
        name: "justifyRight",
        title: "Align Right",
        icon: "format_align_right",
        click: () => {
          execCommand("justifyRight");
          alignIcon.value = "\uf038";
        },
      },
      {
        name: "justifyFull",
        title: "Align Justify",
        icon: "format_align_justify",
        click: () => {
          execCommand("justifyFull");
          alignIcon.value = "\uf039";
        },
      },
    ];
    function init() {
      document.addEventListener("click", (e) => isInModal(e));
      if (toolbar) {
        toolbarHeight.value = toolbarElem.value["offsetHeight"] + 5;
        editor.value.style.height =
          container.value.offsetHeight - toolbarHeight.value + "px";
      }
      initSelection(true);
      onValueChangedEvent = createEvent("valuechanged");

      document.addEventListener("selectionchange", handleSelectionChange);
      onValueChangedListener = listen(editor.value, "valuechanged", () => updateStack());
    }
    function updateStack(wait = 2000) {
      const html = editor.value.innerHTML;
      const state = stack[stackIndex];
      if (state && html && html !== state.html) {
        const delta = +new Date() - lastTime;
        if (!stackTimeoutId) {
          if (delta >= wait) {
            updateState();
          } else {
            stackTimeoutId = setTimeout(() => {
              updateState();
            }, wait - delta);
          }
        }
      }
    }

    function updateState() {
      stackIndex++;
      // const caret = caretPosition();
      const caret = currentPosition;
      stack.push({
        html: editor.value.innerHTML,
        caret: caret,
      });
      if (stack.length > capacity) {
        stack.shift();
        return stackIndex--;
      }
      stackTimeoutId = null;
      lastTime = +new Date();
      forEach(toolButtons, (b: any) => {
        const name = b.getAttribute("data-edit");
        if (name === "undo") {
          removeClass(b, "va-disabled");
        }
      });
      currentPosition = null;
      saveSelection();
    }
    function handleEditorClick(e: any) {
      resetImage();
      isImageLink.value = false;
      resetCell();
      isTablePopupShow.value = false;
      isLinkPopupShow.value = false;
      currentLinkElem.value = null;
      closeModal();
      let target = e.target;
      while (target) {
        const nodeName = getNodename(target);
        if (nodeName === "a") {
          changeLink();
          break;
        }
        if (nodeName === "img" && !hasClass(target, "emotion")) {
          addClass(target, "free-editor-image-selected");
          isImageLink.value = true;
          changeLink(target);
          break;
        }
        if (nodeName === "td" || nodeName === "th") {
          const dropmenu = tablePopup.value.querySelectorAll(".va-editor-dropdown-menu");
          addClass(target, "va-editor-selected-cell");
          for (let i = 0; i < dropmenu.length; i++) {
            dropmenu[i].lastElementChild["style"].display = "none";
          }
          isTablePopupShow.value = true;
          getPopupPosition(target, tablePopup);
          break;
        }
        target = target.parentNode;
      }
    }
    function handleSelectionChange() {
      resetCaretPosition();
      if (stackTimeoutId) {
        clearTimeout(stackTimeoutId);
        stackTimeoutId = null;
      }
    }
    function toolbarButtonClasses(name: string) {
      return [
        "va-editor-toolbar-icon va-editor-tooltip",
        {
          "va-disabled": name === "undo" || name === "redo",
          dropdown: name === "align" || name === "heading" || name === "fontSize",
        },
      ];
    }

    function getButtons() {
      const set = (params: any) => {
        for (const b in params) {
          if (params.hasOwnProperty(b)) {
            toolbarButtons.value.push(b);
          }
        }
      };
      if (props.buttons) {
        toolbarButtons.value = props.buttons;
      } else {
        set(defaultButtons);
      }
    }

    function initSelection(newLine?: boolean) {
      if (!editor.value.childNodes) {
        const p = document.createElement("p");
        p.innerHTML = "<br>";
        editor.value.appendChild(p);
        initSelection();
        return;
      }
      const lastElem = editor.value.lastElementChild;

      if (newLine && lastElem) {
        const html = lastElem.innerHTML.toLowerCase();
        const nodeName = lastElem.nodeName;
        if ((html !== "<br>" && html !== "<br\/>") || nodeName !== "P") {
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          editor.value.appendChild(p);
          initSelection();
        }
      }
    }

    function toggleFullScreen(btn: any) {
      fullscreen = !fullscreen;
      if (fullscreen) {
        addClass(btn, "active");
        addClass(container, "va-editor-fullscreen");
      } else {
        removeClass(btn, "active");
        removeClass(container, "va-editor-fullscreen");
      }
    }

    function execCommand(command: string, param?: any) {
      restoreSelection();
      editor.value.focus();
      document.execCommand(command, false, param);
      saveSelection();
      triggerEvent(editor.value, onValueChangedEvent);
    }

    function queryCommandValue(name: string) {
      return document.queryCommandValue(name);
    }

    function queryCommandState(name: string) {
      return document.queryCommandState(name);
    }

    function getCurrentRange() {
      if (window.getSelection) {
        const sel: any = window.getSelection();
        if (sel.rangeCount > 0) {
          return sel.getRangeAt(0);
        }
      } else if (document["selection"]) {
        const sel = document["selection"];
        return sel.createRange();
      }
      return null;
    }

    function saveSelection() {
      const range = getCurrentRange();
      const containerElem = getSelectionContainerElem(range);
      if (!containerElem) {
        return;
      }
      if (editor.value.contains(containerElem)) {
        selectedRange = range;
        changeMenuActive(containerElem);
        getHTML();
        currentPosition = caretPosition();
      }
    }

    function restoreSelection(range = selectedRange) {
      const selection: any = window.getSelection();
      if (range) {
        try {
          selection.removeAllRanges();
        } catch (ex) {
          document.body["createTextRange"]().select();
          document["selection"].empty();
        }
        selection.addRange(range);
      }
    }

    function setRangeAtStartOf(node: any, range?: any) {
      if (range == null) {
        range = selectedRange;
      }
      range.setEnd(node, 0);
      range.collapse(false);
      restoreSelection(range);
    }

    function createRangeByElem(elem, toStart = false, isContent = true) {
      if (!elem) {
        return;
      }
      const range = document.createRange();
      if (isContent) {
        range.selectNodeContents(elem);
      } else {
        range.selectNode(elem);
      }
      range.collapse(toStart);
      selectedRange = range;
    }

    function isSelectionEmpty() {
      const range = selectedRange;
      if (range && range.startContainer) {
        if (range.startContainer === range.endContainer) {
          if (range.startOffset === range.endOffset) {
            return true;
          }
        }
      }
      return false;
    }

    function getSelectionText() {
      if (!isSelectionEmpty()) {
        return selectedRange.toString();
      } else {
        return "&#8203;";
      }
    }

    function getSelectionContainerElem(range = selectedRange) {
      let elem = void 0;
      if (range) {
        elem = range.commonAncestorContainer;
        return elem.nodeType === 1 ? elem : elem.parentNode;
      }
    }

    function onUploadChange(e) {
      const files = e.target.files;
      let file = null;
      let url = null;
      if (files && files.length > 0) {
        file = files[0];
        try {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            url = event.target?.result;
            const img = '<img src="' + url + '"/>';
            execCommand("insertHTML", img);
            emit("on-upload-completed", {
              files: files,
              base64: url,
            });
          };
          fileReader.readAsDataURL(file);
        } catch (e) {}
      }
      closeModal();
    }

    function uploadImage(value) {
      const url = value.trim();
      if (url) {
        const img = new Image();
        img.onload = () => {
          const imgElem = '<img src="' + url + '"/>';
          execCommand("insertHTML", imgElem);
        };
        img.src = url;
      }
      closeModal();
    }

    function resetImage() {
      const images = editor.value.querySelectorAll("img");
      for (let i = 0; i < images.length; i++) {
        removeClass(images[i], "va-editor-image-selected");
      }
    }

    function openModal() {
      modal.value.style.opacity = 0;
      isModalShow.value = true;
      setTimeout(() => {
        const offsetWidth = modal.value.offsetWidth;
        const arrow = modal.value.querySelector(".va-editor-modal-arrow");
        const containerWidth = container.value.offsetWidth;
        let left =
          currentButton.offsetLeft + currentButton.offsetWidth / 2 - offsetWidth / 2;
        let aLeft = "50%";
        if (left < 0) {
          left = currentButton.offsetLeft;
          aLeft = currentButton.offsetWidth / 2 + "px";
        } else if (left + offsetWidth > containerWidth) {
          left = currentButton.offsetLeft - offsetWidth + currentButton.offsetWidth;
          aLeft = offsetWidth - currentButton.offsetWidth / 2 + "px";
        }
        modal.value.style.left = left + "px";
        arrow.style.left = aLeft;
        modal.value.style.opacity = 1;
      }, 50);
    }

    function closeModal() {
      if (modal) {
        isModalShow.value = false;
        isHeadingShow.value = false;
        isColorpickerShow.value = false;
        isLinkShow.value = false;
        isUploadShow.value = false;
        isEmotionShow.value = false;
        isFontSizeShow.value = false;
        isTablePopupShow.value = false;
        isTableShow.value = false;
        isLinkPopupShow.value = false;
        currentLinkElem.value = null;
        isAlignShow.value = false;
        selectedCol.value = selectedRow.value = 0;
      }
    }

    function closePopup() {
      isTablePopupShow.value = false;
      const currentElem = getSelectionContainerElem();
      let cell = currentElem;
      const nodeName = getNodename(currentElem);
      if (nodeName !== "td" && nodeName !== "th") {
        cell = currentElem.querySelector("td, th");
      }
      if (cell) {
        setRangeAtStartOf(cell);
        if (cell) {
          addClass(cell, "va-editor-selected-cell");
        }
      }
      editor.value.focus();
    }

    function createTable(index: number) {
      const row = parseInt(index / 10 + "", 10) + 1;
      const col = (index % 10) + 1;
      let table = '<table style="width: 100%">';
      const width = (100 / col).toFixed(1) + "%";
      let thead = "<thead><tr>";
      let colgroup = "<colgroup>";
      for (let i = 0; i < col; i++) {
        thead += `<th><br></th>`;
        colgroup += `<col style="width: ${width}"></col>`;
      }
      thead += "</tr></thead>";
      table += colgroup + thead + "<tbody>";
      for (let i = 0; i < row; i++) {
        table += `<tr>`;
        for (let j = 0; j < col; j++) {
          table += `<td><br></td>`;
        }
        table += "</tr>";
      }
      table += "</tbody></table>";
      return table;
    }

    function findElement(elem: any, tag: string) {
      while (elem) {
        if (getNodename(elem) === tag) {
          break;
        }
        elem = elem.parentNode;
      }
      return elem;
    }

    function getTdLocation() {
      const currentElem = getSelectionContainerElem();
      const table = findElement(currentElem, "table");
      const colgroup = table.firstElementChild;
      const nextElem = colgroup.nextElementSibling;
      const trs: any = [];
      forEach(nextElem.children, (elem: any) => {
        trs.push(elem);
      });
      const lastElem = table.lastElementChild;
      forEach(lastElem.children, (elem: any) => {
        trs.push(elem);
      });
      const tr = findElement(currentElem, "tr");
      const tds = tr.children;
      const cols = colgroup.querySelectorAll("col");
      let data;
      for (let i = 0; i < tds.length; i++) {
        if (currentElem === tds[i]) {
          data = {
            index: i,
            elem: currentElem,
            trs: trs,
            parent: tr,
            length: tds.length,
            table: table,
            cols: cols,
          };
        }
      }
      return data;
    }

    function resetCell() {
      const cells = editor.value?.querySelectorAll("td, th");
      for (let i = 0; i < cells.length; i++) {
        removeClass(cells[i], "va-editor-selected-cell");
      }
    }

    function deleteTable() {
      const currentElem = getSelectionContainerElem();
      const table = findElement(currentElem, "table");
      table.parentNode.removeChild(table);
      closePopup();
    }

    function deleteRow() {
      const currentElem = getSelectionContainerElem();
      const table = findElement(currentElem, "table");
      let parent;
      if (getNodename(currentElem) === "th") {
        parent = table.firstElementChild;
      } else {
        parent = table.lastElementChild;
      }
      const tr = findElement(currentElem, "tr");
      parent.removeChild(tr);
      closePopup();
    }

    function deleteColumn() {
      const data: any = getTdLocation();
      const trs = data.trs;
      const index = data.index;
      let i = trs.length;
      const cols = data.cols;
      const width = (100 / (data.length - 1)).toFixed(1) + "%";
      while (i) {
        i--;
        const tds = trs[i].children;
        let j = tds.length;
        while (j) {
          j--;
          if (j === index) {
            trs[i].removeChild(tds[index]);
            if (cols[index]) {
            }
          }
          cols[j].style.width = width;
        }
      }
      cols[index].parentNode.removeChild(cols[index]);
      const table = data.table;
      if (table.firstElementChild.children.length <= 0) {
        table.parentNode.removeChild(table);
      }
      closePopup();
    }

    function addRow(position: any) {
      const data: any = getTdLocation();
      if (getNodename(data.elem) === "td") {
        const tr = document.createElement("tr");
        const tds = [];
        for (let i = 0; i < data.length; i++) {
          const td = "<td><br></td>";
          tds.push(td);
        }
        tr.innerHTML = tds.join("");
        if (position === 1) {
          insertAfter(data.table.lastElementChild, tr, data.parent);
        } else {
          insertBefore(data.table.lastElementChild, tr, data.parent);
        }
      }
      closePopup();
    }

    function addColumn(position: any) {
      const data: any = getTdLocation();
      const trs = data.trs;
      const index = data.index;
      const cols = data.cols;
      let i = trs.length;
      const width = (100 / (data.length + 1)).toFixed(1) + "%";
      while (i) {
        i--;
        let child = document.createElement("td");
        const elem = trs[i].firstElementChild;
        if (getNodename(elem) === "th") {
          child = document.createElement("th");
        }
        const tds = trs[i].children;
        let j = tds.length;
        while (j) {
          j--;
          cols[j].style.width = width;
          if (j === index) {
            if (position === 1) {
              insertAfter(trs[i], child, tds[j]);
            } else {
              insertBefore(trs[i], child, tds[j]);
            }
          }
        }
      }
      const col = document.createElement("col");
      col.style.width = width;
      if (position === 1) {
        insertAfter(cols[index].parentNode, col, cols[index]);
      } else {
        insertBefore(cols[index].parentNode, col, cols[index]);
      }
      closePopup();
    }

    function getNodeLength(node: any) {
      switch (node.nodeType) {
        case 7:
        case 10:
          return 0;
        case 3:
        case 8:
          return node.length;
        default:
          return node.childNodes.length;
      }
    }

    function resetCaretPosition() {
      _startPosition = null;
      return (_endPosition = null);
    }

    function getIndex(node: any) {
      const parent = node.parentNode;
      let index = 0;
      if (parent && parent.childNodes) {
        forEach(parent.childNodes, (n: any, i: number) => {
          if (n === node) {
            index = i;
          }
        });
      }
      return index;
    }

    function getRangePosition(type: string) {
      const currentRange = selectedRange;
      let range = currentRange[type + "Container"];
      let offset = currentRange[type + "Offset"];
      let prevNode;
      if (range.nodeType === Node.TEXT_NODE) {
        prevNode = range.previousSibling;
        while (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
          range = prevNode;
          offset += getNodeLength(prevNode);
          prevNode = prevNode.previousSibling;
        }
      } else {
        offset = getIndex(range);
      }
      const position = [offset];
      let target = range;
      while (target) {
        position.push(getIndex(target));
        target = target.parentNode;
        if (target && hasClass(target, "va-editor")) {
          break;
        }
      }
      return position;
    }

    function startPosition() {
      const range = selectedRange;
      if (range) {
        _startPosition = getRangePosition("start");
      }
      return _startPosition;
    }

    function endPosition() {
      const range = selectedRange;
      if (range) {
        if (!_endPosition) {
          if (range.collapsed) {
            return _startPosition;
          } else {
            return getRangePosition("end");
          }
        }
      }
      return _endPosition;
    }

    function getNodeByPosition(position: any) {
      let node: any;
      if (position) {
        node = editor.value;
        let length = position.length;
        let target = editor.value.childNodes;
        while (length > 1) {
          length--;
          if (node["nodeType"] !== Node.TEXT_NODE) {
            forEach(target, (n: any, i: any) => {
              if (i === position[length]) {
                node = n;
              }
            });
            target = node.childNodes;
          } else {
            node = node.firstChild;
            break;
          }
        }
      }
      return node;
    }

    function caretPosition(caret: any) {
      let startContainer, startOffset, endContainer, endOffset;
      let range;
      if (!caret) {
        range = selectedRange;
        return range
          ? {
              start: startPosition(),
              end: endPosition(),
              collapsed: range.collapsed,
            }
          : {};
      } else {
        if (!caret.start) {
          return;
        }
        startContainer = getNodeByPosition(caret.start);
        startOffset = caret.start[0];
        if (caret.collapsed) {
          endContainer = startContainer;
          endOffset = startOffset;
        } else {
          endContainer = getNodeByPosition(caret.end);
          endOffset = caret.end[0];
        }
        if (!startContainer || !endContainer) {
          console.warn("invalid caret state");
          return;
        }
      }
      range = document.createRange();
      range.setStart(startContainer, startOffset);
      range.setEnd(endContainer, endOffset);
      return range;
    }

    function onTdMouseenter(index: number) {
      selectedRow.value = parseInt(index / 10 + "", 10);
      selectedCol.value = index % 10;
    }

    function onTdMousedown(index: number) {
      const table = createTable(index);
      execCommand("insertHTML", table);
      execCommand("enableObjectResizing", false);
      execCommand("enableInlineTableEditing", false);
      closeModal();
    }

    function onMenuButtonClick(button: any, event: any) {
      const btn = event.target;
      if (selectedRange && !hasClass(btn, "va-disabled")) {
        closeModal();
        if (typeof button["click"] !== "undefined" && !props.readonly) {
          restoreSelection();
          currentButton = btn;
          button.click(event, btn);
          saveSelection();
        }
        event.stopPropagation();
      }
    }

    function changeMenuActive(containerElem: any) {
      if (toolbar) {
        if (toolButtons.length <= 0) {
          toolButtons = toolbarElem.value.querySelectorAll("a");
        }
        for (const btn of toolButtons) {
          const name = btn.getAttribute("data-edit");
          if (queryCommandState(name)) {
            addClass(btn, "active");
          } else {
            removeClass(btn, "active");
          }
          if (name === "blockquote") {
            const reg = /^BLOCKQUOTE$/i;
            const value = queryCommandValue("formatBlock");
            if (reg.test(value)) {
              addClass(btn, "active");
            } else {
              removeClass(btn, "active");
            }
          }
          if (name === "heading") {
            const reg = /^h/i;
            const value = queryCommandValue("formatBlock");
            if (reg.test(value)) {
              addClass(btn, "active");
            } else {
              removeClass(btn, "active");
            }
          }
          if (name === "fullscreen") {
            if (fullscreen) {
              addClass(btn, "active");
            } else {
              removeClass(btn, "active");
            }
          }
          if (name === "createLink" && getNodename(containerElem) === "a") {
            addClass(btn, "active");
          }
          if (name === "fontSize") {
            const elem = getSelectionContainerElem();
            const size = getStyle(elem, "fontSize");
            currentFontSize.value = parseInt(size, 10);
          }
          if (name === "align") {
            for (const b of alignButtons) {
              b.selected = false;
              if (queryCommandState(b.name)) {
                btn.innerHTML = b.icon;
                b.selected = true;
              }
            }
          }
          foreColor = queryCommandValue("foreColor");
          backColor = queryCommandValue("backColor");
        }
      }
    }

    function onHeadingClick(head: string) {
      execCommand("formatBlock", "<" + head + ">");
      closeModal();
      toolbarButtons.value["heading"]["click"]();
    }

    function onLinkConfirm(value: string) {
      if (value.trim() !== "") {
        const a = '<a href="' + value + '" target="_blank">' + value + "</a>";
        execCommand("insertHTML", a);
        closeModal();
      }
    }

    function onEmotionClick(emotion: any) {
      //   const img =
      //     '<img src="' +
      //     event.target.src +
      //     '" class="emotion" width="20" height="20" alt="" />';
      execCommand("insertHTML", emotion.icon);
      closeModal();
    }

    function onColorChange(event: any) {
      if (colorType === "foreColor") {
        foreColor = event.value;
        execCommand("foreColor", foreColor);
      } else {
        backColor = event.value;
        execCommand("backColor", backColor);
      }
    }

    function onColorpickerClick() {
      setTimeout(() => {
        closeModal();
      }, 150);
    }

    function changeFontSize(event: any, value: number) {
      currentFontSize.value = value;
      execCommand(
        "insertHTML",
        `<span style="font-size: ${value}px">${getSelectionText()}</span>`
      );
      closeModal();
      event.stopPropagation();
    }

    function getHTML() {
      //   text = editor.value.innerHTML;
      //onModelChange(text);
    }

    function getNodename(elem: any) {
      if (!elem) {
        return;
      }
      return elem.nodeName.toLowerCase();
    }

    function changeLink(target?: any) {
      const currentElem = target || getSelectionContainerElem();
      const nodeName = getNodename(currentElem);
      if (nodeName === "a" || nodeName === "img") {
        getPopupPosition(currentElem, linkPopup);
        currentLinkElem.value = currentElem;
      }
    }

    function getCounter() {
      contentLength.value = editor.value.textContent.length;
    }

    function getPopupPosition(currentElem: any, popupElem: any) {
      const nodeName = getNodename(currentElem);
      const rect = getRect(currentElem);
      const etRect = getRect(editor.value);
      if (nodeName === "a" || nodeName === "img") {
        // linkUrl = currentElem.href || currentElem.src;
        isLinkPopupShow.value = true;
      }
      const offset = getHiddenElementOuterHeight(popupElem);
      const offsetLeft = rect.left - etRect.left;
      let left = offsetLeft - offset.width / 2 + rect.width / 2;
      const top = rect.top - etRect.top + offset.height + rect.height - 10;
      const arrow = popupElem.querySelector(".arrow");
      removeClass(popupElem, "va-editor-popup-left va-editor-popup-right");
      if (left < 0) {
        left = offsetLeft;
        addClass(popupElem, "va-editor-popup-left");
      } else if (offsetLeft + offset.width > etRect.width) {
        left = offsetLeft - offset.width + rect.width;
        addClass(popupElem, "va-editor-popup-right");
      }
      popupElem.style.left = left + "px";
      popupElem.style.top = top + "px";
    }

    function onLinkChange(value: string, width: string, height: string) {
      const nodeName = getNodename(currentLinkElem.value);
      if (nodeName === "a") {
        currentLinkElem.value.href = value;
      } else if (nodeName === "img") {
        currentLinkElem.value.src = value;
        if (!/%$/.test(width)) {
          width += "px";
        }
        if (!/%$/.test(height)) {
          height += "px";
        }
        currentLinkElem.value.style.width = width;
        currentLinkElem.value.style.height = height;
      }
      isLinkPopupShow.value = false;
      currentLinkElem.value = null;
    }

    function onTableDropdown(showElem: any, hideElem: any) {
      if (showElem) {
        hideElem.style.display = "none";
        showElem.style.display = "block";
      }
    }

    function isInEditor(event: any) {
      let target = event.target;
      let isIn = false;
      while (target) {
        if (target === container) {
          isIn = true;
          break;
        }
        target = target.parentNode;
      }
      return isIn;
    }

    function isInModal(e: any) {
      if (!isInEditor(e)) {
        selectedRange = null;
        resetCell();
        closeModal();
        return false;
      }
      const editor = findElement(e.target, "va-editor");
      if (editor) {
        const currentElem = getSelectionContainerElem();
        const nodeName = getNodename(currentElem);
        if (nodeName !== "td" && nodeName !== "th") {
          isTablePopupShow.value = false;
          resetCell();
        }
      }
      if (isModalShow.value) {
        let node = e.target;
        let isIn = false;
        while (node && typeof node !== "undefined" && node.nodeName !== "#document") {
          if (node === modal) {
            isIn = true;
            break;
          }
          node = node.parentNode;
        }
        if (!isIn) {
          closeModal();
        }
      }
    }

    function isTdInSelected(index: number) {
      const row = parseInt(index / 10 + "", 10);
      const col = index % 10;
      return row <= selectedRow.value && col <= selectedCol.value;
    }
    function onMouseDown() {
      editor.value.addEventListener("mouseleave", () => {
        saveSelection();
      });
    }
    function onFocus() {
      if (stack.length === 0) {
        setTimeout(() => {
          saveSelection();
          //updateState();
        }, 10);
      }
    }
    function onBlur() {
      resetCaretPosition();
    }
    function onMouseup(event: any) {
      saveSelection();
      unbindMouseleaveListener();
    }

    function onKeydown(event: any) {}

    function onEtKeyup(event: any) {
      resetCell();
      isTablePopupShow.value = false;
      triggerEvent(editor.value, onValueChangedEvent);
      getCounter();
    }

    function unbindMouseleaveListener() {
      if (onMouseleaveListener) {
        onMouseleaveListener = null;
      }
    }

    onMounted(() => {
      getButtons();
      setTimeout(() => {
        init();
      }, 1);
      if (props.readonly) {
        //domRenderer.setProperty(container, 'contenteditable', false);
      }
    });

    onUnmounted(() => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    });

    return {
      prefixCls,
      editor,
      col,
      row,
      container,
      modal,
      linkPopup,
      tablePopup,
      toolbarElem,
      alignIcon,
      toolbarHeight,
      isTablePopupShow,
      selectedRow,
      selectedCol,
      isImageLink,
      isModalShow,
      isLinkPopupShow,
      onBlur,
      onKeydown,
      onEtKeyup,
      toolbarButtonClasses,
      onMenuButtonClick,
      handleEditorClick,
      onMouseup,
      onHeadingClick,
      onFocus,
      toolbarButtons,
      defaultButtons,
      onMouseDown,
      onTableDropdown,
      addRow,
      deleteRow,
      addColumn,
      deleteColumn,
      deleteTable,
      contentLength,
      onLinkChange,
      isTdInSelected,
      onTdMouseenter,
      onTdMousedown,
      isTableShow,
      onEmotionClick,
      isEmotionShow,
      onUploadChange,
      uploadImage,
      imageValue,
      isUploadShow,
      onLinkConfirm,
      linkValue,
      isLinkShow,
      onColorpickerClick,
      onColorChange,
      color,
      isColorpickerShow,
      currentFontSize,
      changeFontSize,
      isFontSizeShow,
      alignButtons,
      isAlignShow,
      isHeadingShow,
      emotions: EMOTIONS,
      fontSize,
      heightValue,
      widthValue,
      tds,
      styles: computed(() => {
        return {
          width: getSize(props.width),
          height: getSize(props.height),
          maxHeight: getSize(props.maxHeight),
        };
      }),
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-fullscreen`]: fullscreen,
          },
        ];
      }),
    };
  },
});
</script>

<style scoped></style>
