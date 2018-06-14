<template>
    <div :class="classes" ref="container" :style="styles">
        <div class="va-editor-toolbar clearfix" ref="toolbar" :style="{display: toolbar ? 'block' : 'none'}">
            <template v-for="name in toolbarButtons">
                <a :class="toolbarButtonClasses(name)"
                   @click="onMenuButtonClick(defaultButtons[name], $event)"
                   :data-tooltip="defaultButtons[name].title" :data-edit="name">
                    <template v-if="name !== 'align'">
                        {{defaultButtons[name].icon}}
                    </template>
                    <template v-else>{{alignIcon}}</template>
                </a>
            </template>
        </div>
        <div class="va-editor-content">
            <div class="va-editor-wrapper va-iscroll" @click="handleEditorClick" ref="editor" tabindex="1"
                 contenteditable="true" spellcheck="false"
                 @focus="onFocus()" @blur="onBlur" @keydown="onKeydown"
                 @mouseup="onMouseup" @mousedown="onMouseDown"
                 @keyup="onEtKeyup">
            </div>
        </div>
        <div class="va-editor-table-resizer">
            <div class="va-editor-table-resizer-line"></div>
        </div>
        <div class="va-editor-modal-portal" ref="modal"
             :style="{display: isModalShow ? 'block' : 'none', top: toolbarHeight + 'px'}">
            <span class="va-editor-modal-arrow"></span>
            <div class="va-editor-heading" :style="{display: isHeadingShow ? 'block' : 'none'}">
                <h1 @click="onHeadingClick('h1')">h1</h1>
                <h2 @click="onHeadingClick('h2')">h2</h2>
                <h3 @click="onHeadingClick('h3')">h3</h3>
                <h4 @click="onHeadingClick('h4')">h4</h4>
                <h5 @click="onHeadingClick('h5')">h5</h5>
                <h6 @click="onHeadingClick('h6')">h6</h6>
            </div>
            <div class="va-editor-align" :style="{display: isAlignShow ? 'block' : 'none'}">
                <a class="va-editor-toolbar-icon va-editor-tooltip" v-for="btn in alignButtons"
                   @click="onMenuButtonClick(btn, $event)"
                   :data-tooltip="btn.title" :class="{active: btn.selected}"
                   :data-edit="btn.name">{{btn.icon}}</a>
            </div>
            <div class="va-editor-fontSize va-iscroll" :style="{display: isFontSizeShow ? 'block' : 'none'}">
                <ul>
                    <li v-for="size in fontSize" :class="{active: size == currentFontSize}">
                        <span @click="changeFontSize($event, size)">{{size}}</span>
                    </li>
                </ul>
            </div>
            <div class="va-editor-color-picker" :style="{display: isColorpickerShow ? 'block' : 'none'}">
                <va-color-picker v-model="color" @on-change="onColorChange" :clickable="true"
                @click.native="onColorpickerClick" :inline="true"></va-color-picker>
            </div>
            <div class="va-editor-link" :style="{display: isLinkShow ? 'block' : 'none'}">
                <input type="text" v-model="linkValue" placeholder="www.example.com" class="va-editor-link-input"/>
                <button type="button" class="va-editor-confirm" @click="onLinkConfirm(linkValue)">Insert</button>
            </div>
            <div class="va-editor-file" :style="{display: isUploadShow ? 'block' : 'none'}">
                <div class="va-editor-link">
                    <input type="text" v-model="imageValue" placeholder="image url"
                           class="va-editor-link-input"/>
                    <button type="button" class="va-editor-confirm" @click="uploadImage(imageValue)">Insert</button>
                </div>
                <div class="va-editor-upload">
                    <i class="fa fa-plus"></i> Upload
                    <input type="file" name="photo" accept="image/*"
                           class="va-editor-file-input" @change="onUploadChange"/>
                </div>
            </div>
            <div class="va-editor-emotion" :style="{display: isEmotionShow ? 'block' : 'none'}">
                <template v-for="(emotion, i) in emotions">
            <span class="va-emotion-item">
              <img :src="path + emotion + '.svg'"
                   class="va-editor-emotion" width="20" height="20" alt="" @click="onEmotionClick"/>
            </span>
                    <br v-if="i % 8 === 7">
                </template>
            </div>
            <div class="va-editor-table" v-if="isTableShow">
                <p class="m-0">{{selectedRow + 1}} * {{selectedCol + 1}}</p>
                <div class="va-editor-table-wrapper">
                    <template v-for="(td, i) in tds">
              <span class="va-editor-table-td" :class="{active: isTdInSelected(i)}"
                    @mouseenter="onTdMouseenter(i)" @mousedown="onTdMousedown(i)">
                <span></span>
              </span>
                        <br v-if="i % 10 === 9">
                    </template>
                </div>
            </div>
        </div>
        <div class="va-editor-popup" ref="linkPopup" :style="{display: isLinkPopupShow ? 'block' : 'none'}">
            <div class="va-editor-link">
                <input type="text" v-model="linkValue" placeholder="www.example.com"
                       class="va-editor-link-input"/>
                <button type="button" class="va-editor-confirm"
                        @click="onLinkChange(linkValue, widthValue, heightValue)">Update
                </button>
            </div>
            <div class="image-size" :style="{display: isImageLink ? 'block' : 'none'}">
                <span>width：</span><input type="text" v-model="widthValue">
                <span>height：</span><input type="text" v-model="heightValue">
            </div>
            <div class="arrow"></div>
        </div>
        <div class="va-editor-popup" ref="tablePopup" :style="{display: isTablePopupShow ? 'block' : 'none'}">
            <div class="arrow"></div>
            <div class="va-editor-table-button">
          <span class="va-editor-dropdown-menu va-editor-tooltip" data-tooltip="Row"
                @click="onTableDropdown(row, col)">
            <i class="fa fa-bars"></i>
            <ul ref="row">
              <li @click="addRow(1)">Insert row above</li>
              <li @click="addRow(-1)">Insert row below</li>
              <li @click="deleteRow()">Delete row</li>
            </ul>
          </span>
                <span class="va-editor-dropdown-menu va-editor-tooltip" data-tooltip="Column"
                      @click="onTableDropdown(col, row)">
            <i class="fa fa-bars fa-rotate-90"></i>
            <ul ref="col">
              <li @click="addColumn(-1)">Insert column before</li>
              <li @click="addColumn(1)">Insert column after</li>
              <li @click="deleteColumn()">Delete column</li>
            </ul>
          </span>
                <span @click="deleteTable()" class="va-editor-tooltip" data-tooltip="Delete table">
            <i class="fa fa-trash"></i>
          </span>
            </div>
        </div>
        <div class="va-editor-counter" v-if="counter">
            {{contentLength}}
        </div>
    </div>
</template>

<script>

    import {
        addClass, removeClass, hasClass, insertAfter, insertBefore,
        getHiddenElementOuterHeight, getRect, getStyle, forEach
    } from "../base/dom";
    import vaColorPicker from '../color-picker';
    import {getSize} from '../base/utils';
    import {createEvent, triggerEvent, listen} from "../base/event";

    const prefixCls = 'va-editor';

    export default {
        name: "va-editor",
        components: {
            vaColorPicker
        },
        props: {
            buttons: {
                type: Array
            },
            toolbar: {
                default: true
            },
            readonly: {
                default: false
            },
            maxHeight: {
                type: [Number, String]
            },
            counter: {
                default: true
            },
            width: {
                type: [Number, String],
                default: 600
            },
            height: {
                type: [Number, String],
                default: 300
            }
        },
        data() {
            return {
                color: '',
                defaultButtons: {},
                toolbarButtons: [],
                heading: [],
                toolButtons: [],
                alignButtons: [],
                alignIcon: 'format_align_left',
                isHeadingShow: false,
                isFontSizeShow: false,
                isColorpickerShow: false,
                isEmotionShow: false,
                isUploadShow: false,
                isModalShow: false,
                isLinkShow: false,
                isTableShow: false,
                isAlignShow: false,
                isTablePopupShow: false,
                isLinkPopupShow: false,
                isImageLink: false,
                colorType: '',
                currentPosition: 0,
                selectedRange: '',
                selectedRow: 0,
                selectedCol: 0,
                fontSize: 0,
                currentFontSize: 0,
                fullscreen: false,
                contentLength: 0,
                linkUrl: '',
                path: '',
                toolbarHeight: 0,
                emotions: [],
                linkValue: '',
                widthValue: '',
                heightValue: '',
                imageValue: '',
                tds: [],
                container: '',
                modal: '',
                et: '',
                linkPopup: '',
                tablePopup: '',
                stack: [],
                onValueChangedListener: '',
                stackIndex: 0,
                capacity: 20
            }
        },
        computed: {
            styles() {
                return {
                    width: getSize(this.width),
                    height: getSize(this.height),
                    maxHeight: getSize(this.maxHeight)
                }
            },
            classes() {
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-fullscreen`]: this.fullscreen
                    }
                ]
            }
        },
        methods: {
            init() {
                document.addEventListener('click', (e) => this.isInModal(e));
                if (this.toolbar) {
                    this.toolbarHeight = this.toolbarElem['offsetHeight'] + 5;
                    this.et.style.height = (this.container.offsetHeight - this.toolbarHeight) + 'px';
                }
                this.initSelection(true);
                this.onValueChangedEvent = createEvent('valuechanged');

                document.addEventListener('selectionchange', this.handleSelectionChange);
                this.onValueChangedListener = listen(this.et, 'valuechanged',
                    () => this.updateStack());
            },
            updateStack(wait = 2000) {
                const html = this.et.innerHTML;
                const state = this.stack[this.stackIndex];
                if (state && html && html !== state.html) {
                    const delta = +new Date() - this.lastTime;
                    if (!this.stackTimeoutId) {
                        if (delta >= wait) {
                            this.updateState();
                        } else {
                            this.stackTimeoutId = setTimeout(() => {
                                this.updateState();
                            }, wait - delta);
                        }
                    }
                }
            },

            updateState() {
                this.stackIndex++;
                // const caret = this.caretPosition();
                const caret = this.currentPosition;
                this.stack.push({
                    html: this.et.innerHTML,
                    caret: caret
                });
                if (this.stack.length > this.capacity) {
                    this.stack.shift();
                    return (this.stackIndex--);
                }
                this.stackTimeoutId = null;
                this.lastTime = +new Date();
                forEach(this.toolButtons, (b) => {
                    const name = b.getAttribute('data-edit');
                    if (name === 'undo') {
                        removeClass(b, 'va-disabled');
                    }
                });
                this.currentPosition = null;
                this.saveSelection();
            },
            handleEditorClick(e) {
                this.resetImage();
                this.isImageLink = false;
                this.resetCell();
                this.isTablePopupShow = false;
                this.isLinkPopupShow = false;
                this.currentLinkElem = null;
                this.closeModal();
                let target = e.target;
                while (target) {
                    const nodeName = this.getNodename(target);
                    if (nodeName === 'a') {
                        this.changeLink();
                        break;
                    }
                    if (nodeName === 'img' && !hasClass(target, 'emotion')) {
                        addClass(target, 'free-editor-image-selected');
                        this.isImageLink = true;
                        this.changeLink(target);
                        break;
                    }
                    if (nodeName === 'td' || nodeName === 'th') {
                        const dropmenu = this.tablePopup.querySelectorAll('.va-editor-dropdown-menu');
                        addClass(target, 'va-editor-selected-cell');
                        for (let i = 0; i < dropmenu.length; i++) {
                            dropmenu[i].lastElementChild['style'].display = 'none';
                        }
                        this.isTablePopupShow = true;
                        this.getPopupPosition(target, this.tablePopup);
                        break;
                    }
                    target = target.parentNode;
                }
            },
            handleSelectionChange(e) {
                this.resetCaretPosition();
                if (this.stackTimeoutId) {
                    clearTimeout(this.stackTimeoutId);
                    this.stackTimeoutId = null;
                }
            },
            toolbarButtonClasses(name) {
                return [
                    'va-editor-toolbar-icon va-editor-tooltip',
                    {
                        'va-disabled': name === 'undo' || name === 'redo',
                        'dropdown': name === 'align' || name === 'heading' || name === 'fontSize'
                    }
                ]
            },
            getButtons() {
                const set = (params) => {
                    for (const b in params) {
                        if (params.hasOwnProperty(b)) {
                            this.toolbarButtons.push(b);
                        }
                    }
                };
                if (this.buttons) {
                    this.toolbarButtons = this.buttons;
                } else {
                    set(this.defaultButtons);
                }
            },
            initSelection(newLine) {
                if (!this.et.childNodes) {
                    const p = document.createElement('p');
                    p.innerHTML = '<br>';
                    this.et.appendChild(p);
                    this.initSelection();
                    return;
                }
                const lastElem = this.et.lastElementChild;

                if (newLine && lastElem) {
                    const html = lastElem.innerHTML.toLowerCase();
                    const nodeName = lastElem.nodeName;
                    if (html !== '<br>' && html !== '<br\/>' || nodeName !== 'P') {
                        const p = document.createElement('p');
                        p.innerHTML = '<br>';
                        this.et.appendChild(p);
                        this.initSelection();
                    }
                }
            },

            toggleFullScreen(btn) {
                this.fullscreen = !this.fullscreen;
                if (this.fullscreen) {
                    addClass(btn, 'active');
                    addClass(this.container, 'va-editor-fullscreen');
                } else {
                    removeClass(btn, 'active');
                    removeClass(this.container, 'va-editor-fullscreen');
                }
            },
            execCommand(command, param = null) {
                this.restoreSelection();
                this.et.focus();
                document.execCommand(command, false, param);
                this.saveSelection();
                triggerEvent(this.et, this.onValueChangedEvent);
            },

            queryCommandValue(name) {
                return document.queryCommandValue(name);
            },

            queryCommandState(name) {
                return document.queryCommandState(name);
            },

            getCurrentRange(range) {
                if (window.getSelection) {
                    const sel = window.getSelection();
                    if (sel.rangeCount > 0) {
                        return sel.getRangeAt(0);
                    }
                } else if (document['selection']) {
                    const sel = document['selection'];
                    return sel.createRange();
                }
                return null;
            },
            saveSelection() {
                const range = this.getCurrentRange();
                const containerElem = this.getSelectionContainerElem(range);
                if (!containerElem) {
                    return;
                }
                if (this.et.contains(containerElem)) {
                    this.selectedRange = range;
                    this.changeMenuActive(containerElem);
                    this.getHTML();
                    this.currentPosition = this.caretPosition();
                }
            },
            restoreSelection(range = this.selectedRange) {
                const selection = window.getSelection();
                if (range) {
                    try {
                        selection.removeAllRanges();
                    } catch (ex) {
                        document.body['createTextRange']().select();
                        document['selection'].empty();
                    }
                    selection.addRange(range);
                }
            },
            setRangeAtStartOf(node, range) {
                if (range == null) {
                    range = this.selectedRange;
                }
                range.setEnd(node, 0);
                range.collapse(false);
                this.restoreSelection(range);
            },

            createRangeByElem(elem, toStart = false, isContent = true) {
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
                this.selectedRange = range;
            },

            isSelectionEmpty() {
                const range = this.selectedRange;
                if (range && range.startContainer) {
                    if (range.startContainer === range.endContainer) {
                        if (range.startOffset === range.endOffset) {
                            return true;
                        }
                    }
                }
                return false;
            },

            getSelectionText() {
                if (!this.isSelectionEmpty()) {
                    return this.selectedRange.toString();
                } else {
                    return '&#8203;';
                }
            },

            getSelectionContainerElem(range = this.selectedRange) {
                let elem = void 0;
                if (range) {
                    elem = range.commonAncestorContainer;
                    return elem.nodeType === 1 ? elem : elem.parentNode;
                }
            },
            onUploadChange(e) {
                const files = e.target.files;
                let file = null;
                let url = null;
                if (files && files.length > 0) {
                    file = files[0];
                    try {
                        const fileReader = new FileReader();
                        fileReader.onload = (event) => {
                            url = event.target.result;
                            const img = '<img src="' + url + '"/>';
                            this.execCommand('insertHTML', img);
                            this.$emit('on-upload-completed', {
                                files: files,
                                base64: url
                            });
                        };
                        fileReader.readAsDataURL(file);
                    } catch (e) {

                    }
                }
                this.closeModal();
            },

            uploadImage(value) {
                const url = value.trim();
                if (url) {
                    const img = new Image();
                    img.onload = () => {
                        const imgElem = '<img src="' + url + '"/>';
                        this.execCommand('insertHTML', imgElem);
                    };
                    img.src = url;
                }
                this.closeModal();
            },

            resetImage() {
                const images = this.et.querySelectorAll('img');
                for (let i = 0; i < images.length; i++) {
                    removeClass(images[i], 'va-editor-image-selected');
                }
            },

            openModal() {
                this.modal.style.opacity = 0;
                this.isModalShow = true;
                setTimeout(() => {
                    const offsetWidth = this.modal.offsetWidth;
                    const arrow = this.modal.querySelector('.va-editor-modal-arrow');
                    const containerWidth = this.container.offsetWidth;
                    let left = this.currentButton.offsetLeft + this.currentButton.offsetWidth / 2 - offsetWidth / 2;
                    let aLeft = '50%';
                    if (left < 0) {
                        left = this.currentButton.offsetLeft;
                        aLeft = this.currentButton.offsetWidth / 2 + 'px';
                    } else if (left + offsetWidth > containerWidth) {
                        left = this.currentButton.offsetLeft - offsetWidth + this.currentButton.offsetWidth;
                        aLeft = offsetWidth - this.currentButton.offsetWidth / 2 + 'px';
                    }
                    this.modal.style.left = left + 'px';
                    arrow.style.left = aLeft;
                    this.modal.style.opacity = 1;
                }, 50);
            },

            closeModal() {
                if (this.modal) {
                    this.isModalShow = false;
                    this.isHeadingShow = false;
                    this.isColorpickerShow = false;
                    this.isLinkShow = false;
                    this.isUploadShow = false;
                    this.isEmotionShow = false;
                    this.isFontSizeShow = false;
                    this.isTablePopupShow = false;
                    this.isTableShow = false;
                    this.isLinkPopupShow = false;
                    this.currentLinkElem = null;
                    this.isAlignShow = false;
                    this.selectedCol = this.selectedRow = 0;
                }
            },

            closePopup() {
                this.isTablePopupShow = false;
                const currentElem = this.getSelectionContainerElem();
                let cell = currentElem;
                const nodeName = this.getNodename(currentElem);
                if (nodeName !== 'td' && nodeName !== 'th') {
                    cell = currentElem.querySelector('td, th');
                }
                if (cell) {
                    this.setRangeAtStartOf(cell);
                    if (cell) {
                        addClass(cell, 'va-editor-selected-cell');
                    }
                }
                this.et.focus();
            },

            createTable(index) {
                const row = parseInt(index / 10 + '', 10) + 1;
                const col = index % 10 + 1;
                let table = '<table style="width: 100%">';
                const width = (100 / col).toFixed(1) + '%';
                let thead = '<thead><tr>';
                let colgroup = '<colgroup>';
                for (let i = 0; i < col; i++) {
                    thead += `<th><br></th>`;
                    colgroup += `<col style="width: ${width}"></col>`;
                }
                thead += '</tr></thead>';
                table += colgroup + thead + '<tbody>';
                for (let i = 0; i < row; i++) {
                    table += `<tr>`;
                    for (let j = 0; j < col; j++) {
                        table += `<td><br></td>`;
                    }
                    table += '</tr>';
                }
                table += '</tbody></table>';
                return table;
            },

            findElement(elem, tag) {
                while (elem) {
                    if (this.getNodename(elem) === tag) {
                        break;
                    }
                    elem = elem.parentNode;
                }
                return elem;
            },

            getTdLocation() {
                const currentElem = this.getSelectionContainerElem();
                const table = this.findElement(currentElem, 'table');
                const colgroup = table.firstElementChild;
                const nextElem = colgroup.nextElementSibling;
                const trs = [];
                forEach(nextElem.children, (elem) => {
                    trs.push(elem);
                });
                const lastElem = table.lastElementChild;
                forEach(lastElem.children, (elem) => {
                    trs.push(elem);
                });
                const tr = this.findElement(currentElem, 'tr');
                const tds = tr.children;
                const cols = colgroup.querySelectorAll('col');
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
                            cols: cols
                        }
                    }
                }
                return data;
            },

            resetCell() {
                const cells = this.et.querySelectorAll('td, th');
                for (let i = 0; i < cells.length; i++) {
                    removeClass(cells[i], 'va-editor-selected-cell');
                }
            },

            deleteTable() {
                const currentElem = this.getSelectionContainerElem();
                const table = this.findElement(currentElem, 'table');
                table.parentNode.removeChild(table);
                this.closePopup();
            },

            deleteRow() {
                const currentElem = this.getSelectionContainerElem();
                const table = this.findElement(currentElem, 'table');
                let parent;
                if (this.getNodename(currentElem) === 'th') {
                    parent = table.firstElementChild;
                } else {
                    parent = table.lastElementChild;
                }
                const tr = this.findElement(currentElem, 'tr');
                parent.removeChild(tr);
                this.closePopup();
            },

            deleteColumn() {
                const data = this.getTdLocation();
                const trs = data.trs;
                const index = data.index;
                let i = trs.length;
                const cols = data.cols;
                const width = (100 / (data.length - 1)).toFixed(1) + '%';
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
                this.closePopup();
            },

            addRow(position) {
                const data = this.getTdLocation();
                if (this.getNodename(data.elem) === 'td') {
                    const tr = document.createElement('tr');
                    const tds = [];
                    for (let i = 0; i < data.length; i++) {
                        const td = '<td><br></td>';
                        tds.push(td);
                    }
                    tr.innerHTML = tds.join('');
                    if (position === 1) {
                        insertAfter(data.table.lastElementChild, tr, data.parent);
                    } else {
                        insertBefore(data.table.lastElementChild, tr, data.parent);
                    }
                }
                this.closePopup();
            },

            addColumn(position) {
                const data = this.getTdLocation();
                const trs = data.trs;
                const index = data.index;
                const cols = data.cols;
                let i = trs.length;
                const width = (100 / (data.length + 1)).toFixed(1) + '%';
                while (i) {
                    i--;
                    let child = document.createElement('td');
                    const elem = trs[i].firstElementChild;
                    if (this.getNodename(elem) === 'th') {
                        child = document.createElement('th');
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
                const col = document.createElement('col');
                col.style.width = width;
                if (position === 1) {
                    insertAfter(cols[index].parentNode, col, cols[index]);
                } else {
                    insertBefore(cols[index].parentNode, col, cols[index]);
                }
                this.closePopup();
            },

            getNodeLength(node) {
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
            },

            resetCaretPosition() {
                this._startPosition = null;
                return this._endPosition = null;
            },

            getIndex(node) {
                const parent = node.parentNode;
                let index = 0;
                if (parent && parent.childNodes) {
                    forEach(parent.childNodes, (n, i) => {
                        if (n === node) {
                            index = i;
                        }
                    });
                }
                return index;
            },

            getRangePosition(type) {
                const currentRange = this.selectedRange;
                let range = currentRange[type + 'Container'];
                let offset = currentRange[type + 'Offset'];
                let prevNode;
                if (range.nodeType === Node.TEXT_NODE) {
                    prevNode = range.previousSibling;
                    while (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
                        range = prevNode;
                        offset += this.getNodeLength(prevNode);
                        prevNode = prevNode.previousSibling;
                    }
                } else {
                    offset = this.getIndex(range);
                }
                const position = [offset];
                let target = range;
                while (target) {
                    position.push(this.getIndex(target));
                    target = target.parentNode;
                    if (target && hasClass(target, 'va-editor')) {
                        break;
                    }
                }
                return position;
            },

            startPosition() {
                const range = this.selectedRange;
                if (range) {
                    this._startPosition = this.getRangePosition('start');
                }
                return this._startPosition;
            },

            endPosition() {
                const range = this.selectedRange;
                if (range) {
                    if (!this._endPosition) {
                        if (range.collapsed) {
                            return this._startPosition;
                        } else {
                            return this.getRangePosition('end');
                        }
                    }

                }
                return this._endPosition;
            },

            getNodeByPosition(position) {
                let node;
                if (position) {
                    node = this.et;
                    let length = position.length;
                    let target = this.et.childNodes;
                    while (length > 1) {
                        length--;
                        if (node['nodeType'] !== Node.TEXT_NODE) {
                            forEach(target, (n, i) => {
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
            },

            caretPosition(caret) {
                let startContainer, startOffset, endContainer, endOffset;
                let range;
                if (!caret) {
                    range = this.selectedRange;
                    return range ? {
                        start: this.startPosition(),
                        end: this.endPosition(),
                        collapsed: range.collapsed
                    } : {};
                } else {
                    if (!caret.start) {
                        return;
                    }
                    startContainer = this.getNodeByPosition(caret.start);
                    startOffset = caret.start[0];
                    if (caret.collapsed) {
                        endContainer = startContainer;
                        endOffset = startOffset;
                    } else {
                        endContainer = this.getNodeByPosition(caret.end);
                        endOffset = caret.end[0];
                    }
                    if (!startContainer || !endContainer) {
                        console.warn('invalid caret state');
                        return;
                    }
                }
                range = document.createRange();
                range.setStart(startContainer, startOffset);
                range.setEnd(endContainer, endOffset);
                return range;
            },

            onTdMouseenter(index) {
                this.selectedRow = parseInt(index / 10 + '', 10);
                this.selectedCol = index % 10;
            },

            onTdMousedown(index) {
                const table = this.createTable(index);
                this.execCommand('insertHTML', table);
                this.execCommand('enableObjectResizing', false);
                this.execCommand('enableInlineTableEditing', false);
                this.closeModal();
            },

            onMenuButtonClick(button, event) {
                const btn = event.target;
                if (this.selectedRange && !hasClass(btn, 'va-disabled')) {
                    this.closeModal();
                    if (typeof button['click'] !== 'undefined' && !this.readonly) {
                        console.log(button['click']);
                        this.restoreSelection();
                        this.currentButton = btn;
                        button.click(event, btn);
                        this.saveSelection();
                    }
                    event.stopPropagation();
                }
            },

            changeMenuActive(containerElem) {
                if (this.toolbar) {
                    if (this.toolButtons.length <= 0) {
                        this.toolButtons = this.toolbarElem.querySelectorAll('a');
                    }
                    for (const btn of this.toolButtons) {
                        const name = btn.getAttribute('data-edit');
                        if (this.queryCommandState(name)) {
                            addClass(btn, 'active');
                        } else {
                            removeClass(btn, 'active');
                        }
                        if (name === 'blockquote') {
                            const reg = /^BLOCKQUOTE$/i;
                            const value = this.queryCommandValue('formatBlock');
                            if (reg.test(value)) {
                                addClass(btn, 'active');
                            } else {
                                removeClass(btn, 'active');
                            }
                        }
                        if (name === 'heading') {
                            const reg = /^h/i;
                            const value = this.queryCommandValue('formatBlock');
                            if (reg.test(value)) {
                                addClass(btn, 'active');
                            } else {
                                removeClass(btn, 'active');
                            }
                        }
                        if (name === 'fullscreen') {
                            if (this.fullscreen) {
                                addClass(btn, 'active');
                            } else {
                                removeClass(btn, 'active');
                            }
                        }
                        if (name === 'createLink' && this.getNodename(containerElem) === 'a') {
                            addClass(btn, 'active');
                        }
                        if (name === 'fontSize') {
                            const elem = this.getSelectionContainerElem();
                            const size = getStyle(elem, 'fontSize');
                            this.currentFontSize = parseInt(size, 10);
                        }
                        if (name === 'align') {
                            for (const b of this.alignButtons) {
                                b.selected = false;
                                if (this.queryCommandState(b.name)) {
                                    btn.innerHTML = b.icon;
                                    b.selected = true;
                                }
                            }
                        }
                        this.foreColor = this.queryCommandValue('foreColor');
                        this.backColor = this.queryCommandValue('backColor');
                    }
                }
            },

            onHeadingClick(head) {
                this.execCommand('formatBlock', '<' + head + '>');
                this.closeModal();
                this.toolbarButtons['heading']['click']();
            },

            onLinkConfirm(value) {
                if (value.trim() !== '') {
                    const a = '<a href="' + value + '" target="_blank">' + value + '</a>';
                    this.execCommand('insertHTML', a);
                    this.closeModal();
                }
            },

            onEmotionClick(event) {
                const img = '<img src="' + event.target.src + '" class="emotion" width="20" height="20" alt="" />';
                this.execCommand('insertHTML', img);
                this.closeModal();
            },

            onColorChange(event) {
                if (this.colorType === 'foreColor') {
                    this.foreColor = event.value;
                    this.execCommand('foreColor', this.foreColor);
                } else {
                    this.backColor = event.value;
                    this.execCommand('backColor', this.backColor);
                }
            },

            onColorpickerClick() {
                setTimeout(() => {
                    this.closeModal();
                }, 150);
            },

            changeFontSize(event, value) {
                this.currentFontSize = value;
                this.execCommand('insertHTML', `<span style="font-size: ${value}px">${this.getSelectionText()}</span>`);
                this.closeModal();
                event.stopPropagation();
            },

            getHTML() {
                this.text = this.et.innerHTML;
                //this.onModelChange(this.text);
            },

            getNodename(elem) {
                if (!elem) {
                    return;
                }
                return elem.nodeName.toLowerCase();
            },

            changeLink(target) {
                const currentElem = target || this.getSelectionContainerElem();
                const nodeName = this.getNodename(currentElem);
                if (nodeName === 'a' || nodeName === 'img') {
                    this.getPopupPosition(currentElem, this.linkPopup);
                    this.currentLinkElem = currentElem;
                }
            },

            getCounter() {
                this.contentLength = this.et.textContent.length;
            },

            getPopupPosition(currentElem, popupElem) {
                const nodeName = this.getNodename(currentElem);
                const rect = getRect(currentElem);
                const etRect = getRect(this.et);
                if (nodeName === 'a' || nodeName === 'img') {
                    this.linkUrl = currentElem.href || currentElem.src;
                    this.isLinkPopupShow = true;
                }
                const offset = getHiddenElementOuterHeight(popupElem);
                const offsetLeft = rect.left - etRect.left;
                let left = offsetLeft - offset.width / 2 + rect.width / 2;
                const top = rect.top - etRect.top + offset.height + rect.height - 10;
                const arrow = popupElem.querySelector('.arrow');
                removeClass(popupElem, 'va-editor-popup-left va-editor-popup-right');
                if (left < 0) {
                    left = offsetLeft;
                    addClass(popupElem, 'va-editor-popup-left');
                } else if (offsetLeft + offset.width > etRect.width) {
                    left = offsetLeft - offset.width + rect.width;
                    addClass(popupElem, 'va-editor-popup-right');
                }
                popupElem.style.left = left + 'px';
                popupElem.style.top = top + 'px';
            },

            onLinkChange(value, width, height) {
                const nodeName = this.getNodename(this.currentLinkElem);
                if (nodeName === 'a') {
                    this.currentLinkElem.href = value;
                } else if (nodeName === 'img') {
                    this.currentLinkElem.src = value;
                    if (!/%$/.test(width)) {
                        width += 'px';
                    }
                    if (!/%$/.test(height)) {
                        height += 'px';
                    }
                    this.currentLinkElem.style.width = width;
                    this.currentLinkElem.style.height = height;
                }
                this.isLinkPopupShow = false;
                this.currentLinkElem = null;
            },

            onTableDropdown(showElem, hideElem) {
                if (showElem) {
                    hideElem.style.display = 'none';
                    showElem.style.display = 'block';
                }
            },

            isInEditor(event) {
                let target = event.target;
                let isIn = false;
                while (target) {
                    if (target === this.container) {
                        isIn = true;
                        break;
                    }
                    target = target.parentNode;
                }
                return isIn;
            },

            isInModal(e) {
                if (!this.isInEditor(e)) {
                    this.selectedRange = null;
                    this.resetCell();
                    this.closeModal();
                    return false;
                }
                const et = this.findElement(e.target, 'va-editor');
                if (et) {
                    const currentElem = this.getSelectionContainerElem();
                    const nodeName = this.getNodename(currentElem);
                    if (nodeName !== 'td' && nodeName !== 'th') {
                        this.isTablePopupShow = false;
                        this.resetCell();
                    }
                }
                if (this.isModalShow) {
                    let node = e.target;
                    let isIn = false;
                    while (node && typeof node !== 'undefined' && node.nodeName !== '#document') {
                        if (node === this.modal) {
                            isIn = true;
                            break;
                        }
                        node = node.parentNode;
                    }
                    if (!isIn) {
                        this.closeModal();
                    }
                }
            },

            isTdInSelected(index) {
                const row = parseInt(index / 10 + '', 10);
                const col = index % 10;
                return row <= this.selectedRow && col <= this.selectedCol;
            },
            onMouseDown() {
                this.et.addEventListener('mouseleave', () => {
                    this.saveSelection();
                })
            },
            onFocus() {
                if (this.stack.length === 0) {
                    setTimeout(() => {
                        this.saveSelection();
                        //this.updateState();
                    }, 10);
                }
            },
            onBlur() {
                this.resetCaretPosition();
            },
            onMouseup(event) {
                this.saveSelection();
                this.unbindMouseleaveListener();
            },

            onKeydown(event) {
            },

            onEtKeyup(event) {
                this.resetCell();
                this.isTablePopupShow = false;
                triggerEvent(this.et, this.onValueChangedEvent);
                this.getCounter();
            },

            unbindMouseleaveListener() {
                if (this.onMouseleaveListener) {
                    this.onMouseleaveListener = null;
                }
            }
        },
        created() {
            this.defaultButtons = {
                bold: {
                    title: 'Bold',
                    icon: 'format_bold',
                    click: () => {
                        this.execCommand('bold');
                    }
                },
                italic: {
                    title: 'Italic',
                    icon: 'format_italic',
                    click: () => {
                        this.execCommand('italic');
                    }
                },
                underline: {
                    title: 'Underline',
                    icon: 'format_underlined',
                    click: () => {
                        this.execCommand('underline');
                    }
                },
                strikethrough: {
                    title: 'Strikethrough',
                    icon: 'strikethrough_s',
                    click: () => {
                        this.execCommand('strikethrough');
                    }
                },
                // subscript: {
                //     title: 'Subscript',
                //     icon: '\uf12c',
                //     click: () => {
                //         this.execCommand('subscript');
                //     }
                // },
                // superscript: {
                //     title: 'Superscript',
                //     icon: '\uf12b',
                //     click: () => {
                //         this.execCommand('superscript');
                //     }
                // },
                heading: {
                    title: 'Heading',
                    icon: 'text_fields',
                    click: () => {
                        this.openModal();
                        this.isHeadingShow = true;
                    }
                },
                fontSize: {
                    title: 'Font size',
                    icon: 'title',
                    click: () => {
                        this.isFontSizeShow = true;
                        this.openModal();
                    }
                },
                foreColor: {
                    title: 'Colors',
                    icon: 'format_color_text',
                    click: () => {
                        this.isColorpickerShow = true;
                        this.colorType = 'foreColor';
                        this.color = this.foreColor;
                        this.openModal();
                    }
                },
                backColor: {
                    title: 'Background',
                    icon: 'color_lens',
                    click: () => {
                        this.isColorpickerShow = true;
                        this.colorType = 'backColor';
                        this.color = this.backColor;
                        this.openModal();
                    }
                },
                align: {
                    title: 'Align',
                    icon: 'format_align_left',
                    click: () => {
                        this.isAlignShow = true;
                        this.openModal();
                    }
                },
                insertOrderedList: {
                    title: 'Ordered List',
                    icon: 'format_list_numbered',
                    click: () => {
                        this.execCommand('insertOrderedList');
                    }
                },
                insertUnorderedList: {
                    title: 'Unordered List',
                    icon: 'format_list_bulleted',
                    click: () => {
                        this.execCommand('insertUnorderedList');
                    }
                },
                blockquote: {
                    title: 'Blockquote',
                    icon: 'format_quote',
                    click: () => {
                        this.execCommand('formatBlock', '<BLOCKQUOTE>');
                        const p = document.createElement('p');
                        p.innerHTML = '<br>';
                        this.et.appendChild(p);
                    }
                },
                table: {
                    title: 'Insert table',
                    icon: 'grid_on',
                    click: () => {
                        this.isTableShow = true;
                        this.openModal();
                    }
                },
                createLink: {
                    title: 'Insert Link',
                    icon: 'insert_link',
                    click: () => {
                        this.isLinkShow = true;
                        this.openModal();
                    }
                },
                insertImage: {
                    title: 'Insert Image',
                    icon: 'photo_size_select_actual',
                    click: () => {
                        this.isUploadShow = true;
                        this.openModal();
                    }
                },
                emotion: {
                    title: 'Insert Emotion',
                    icon: 'insert_emoticon',
                    click: () => {
                        this.isEmotionShow = true;
                        this.openModal();
                    }
                },
                fullscreen: {
                    title: 'Open Fullscreen',
                    icon: 'fullscreen',
                    click: (event, btn) => {
                        this.toggleFullScreen(btn);
                    }
                },
                undo: {
                    title: 'Undo',
                    icon: 'undo',
                    click: (event, btn) => {
                        this.execCommand('undo');
                    }
                },
                redo: {
                    title: 'Redo',
                    icon: 'redo',
                    click: (event, btn) => {
                        this.execCommand('redo');
                    }
                }
            };
            this.alignButtons = [
                {
                    name: 'justifyLeft',
                    title: 'Align Left',
                    icon: 'format_align_left',
                    selected: true,
                    click: () => {
                        this.execCommand('justifyLeft');
                        this.alignIcon = '\uf036';
                    }
                },
                {
                    name: 'justifyCenter',
                    title: 'Align Center',
                    icon: 'format_align_center',
                    click: () => {
                        this.execCommand('justifyCenter');
                        this.alignIcon = '\uf037';
                    }
                },
                {
                    name: 'justifyRight',
                    title: 'Align Right',
                    icon: 'format_align_right',
                    click: () => {
                        this.execCommand('justifyRight');
                        this.alignIcon = '\uf038';
                    }
                },
                {
                    name: 'justifyFull',
                    title: 'Align Justify',
                    icon: 'format_align_justify',
                    click: () => {
                        this.execCommand('justifyFull');
                        this.alignIcon = '\uf039';
                    }
                }];
            this.path = 'http://oumfrpm5j.bkt.clouddn.com/freeng_';
            this.emotions = ['1f60a', '1f60b', '1f60c', '1f60d', '1f60e', '1f60f', '1f61a', '1f61b',
                '1f61c', '1f61d', '1f61e', '1f61f', '1f62a', '1f62b', '1f62c',
                '1f62d', '1f62e', '1f62f', '1f600', '1f601', '1f602',
                '1f603', '1f604', '1f605', '1f606', '1f607', '1f608', '1f609',
                '1f610', '1f611', '1f612', '1f613', '1f614', '1f615', '1f616', '1f617', '1f618',
                '1f619', '1f620', '1f621', '1f622', '1f623', '1f624', '1f625', '1f626', '1f627', '1f628',
                '1f629', '1f630', '1f631', '1f632', '1f633', '1f634', '1f635', '1f636', '1f637'
            ];
            this.fontSize = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
            this.tds = new Array(50).fill(1);
        },
        mounted() {
            this.container = this.$refs.container;
            this.modal = this.$refs.modal;
            this.et = this.$refs.editor;
            this.linkPopup = this.$refs.linkPopup;
            this.tablePopup = this.$refs.tablePopup;
            this.getButtons();
            if (this.toolbar) {
                this.toolbarElem = this.$refs.toolbar;
            }
            setTimeout(() => {
                this.init();
            },1);
            if (this.readonly) {
                //this.domRenderer.setProperty(this.container, 'contenteditable', false);
            }
        },
        beforeDestroy() {
            document.removeEventListener('selectionchange', this.handleSelectionChange);
        }
    }
</script>

<style scoped>

</style>