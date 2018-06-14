<template>
    <div :class="`${prefixCls}-box`">
        <div :class="`${prefixCls}`" ref="container"
             @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
            <div class="va-upload-toolbar">
                <div class="va-upload-text" v-if="$slots.header">
                    <slot name="header"></slot>
                    <div class="va-upload-inner">
                        <input type="file" name="uploadFile"
                               :multiple="multiple" :accept="options.accept"
                               @change="onFileSelect">
                    </div>
                </div>
                <template v-else>
                    <div class="va-upload-text">
                        <va-button :disabled="isUploading">{{title}}</va-button>
                        <div class="va-upload-inner">
                            <input type="file" name="uploadFile"
                                   :multiple="multiple" :accept="options.accept"
                                   @change="onFileSelect">
                        </div>
                    </div>
                    <div class="va-upload-advanced" v-if="isAdvanced()">
                        <va-button :disabled="isUploading || !uploadProgress || isCompleted"
                                   @click="upload">
                            Upload
                        </va-button>
                        <va-button :disabled="isUploading || files.length <= 0" @click="clear">
                            Delete All
                        </va-button>
                    </div>
                </template>
            </div>
        </div>
        <div class="va-upload-progress" v-if="showProgress && isAdvanced()">
            <va-progress :value="progress"></va-progress>
        </div>
        <div class="va-upload-invalid" v-if="invalidMessage">
            {{invalidMessage}}
        </div>
        <div class="va-upload-review" v-if="review && isAdvanced()">
            <ul>
                <li v-for="(file, i) in files" class="va-upload-item" :key="i.toString()">
                    <img v-if="isImage(file)" :src="file['dataURL']" :alt="file.name">
                    {{file.name}}
                    <span class="va-file-size">{{formatSize(file['size'])}}</span>
                    <span class="va-upload-delete" @click="onDelete(i)">
                        <i class="fa fa-close"></i>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {addClass, removeClass} from '../base/dom';
    import VaButton from '../button';

    const prefixCls = 'va-upload';

    export default {
        name: 'VaUpload',
        components: {
            VaButton
        },
        props: {
            name: {
                type: String,
                default: 'files[]'
            },
            title: {
                type: String,
                default: 'Choose'
            },
            review: {
                type: Boolean
            },
            multiple: {
                type: Boolean
            },
            maxFileSize: {
                type: Number
            },
            disabled: {
                type: Boolean
            },
            mode: {
                type: String
            },
            autoUpload: {
                type: Boolean,
                default: false
            },
            showProgress: {
                type: Boolean,
                default: true
            },
            options: {
                type: Object,
                default() {
                    return {
                        method: 'POST',
                        url: '',
                        withCredentials: false,
                        invalidFileSizeMessage: '',
                        invalidFileTypeMessage: ''
                    }
                }
            }
        },
        data() {
            return {
                prefixCls,
                isCompleted: false,
                isUploading: false,
                uploadProgress: 0,
                progress: 0,
                files: [],
                uploadElem: null,
                currentTitle: this.title,
                invalidMessage: ''
            }
        },
        methods: {
            onFileSelect(event) {
                this.invalidMessage = '';
                const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
                for (const file of files) {
                    if (this.maxFileSize) {
                        if (file.size > this.maxFileSize) {
                            this.invalidMessage = this.invalidFileSizeMessage;
                            break;
                        }
                    }
                    if (this.accept) {
                        const regExp = new RegExp(this.accept);
                        if (!regExp.test(this.accept)) {
                            this.invalidMessage = this.invalidFileTypeMessage;
                            break;
                        }
                    }
                    if (this.review && this.isImage(file)) {
                        file['dataURL'] = window.URL.createObjectURL(file)
                    }
                    file['uploaded'] = false;
                    this.files.push(file);
                    if (!this.isAdvanced()) {
                        this.currentTitle = this.files.length > 1 ? `${this.files.length}个文件` : this.files[0].name;
                    }
                }
                let num = 0;
                for (const file of this.files) {
                    if (!file['uploaded']) {
                        num++;
                    }
                }
                this.uploadProgress = Math.round(num / this.files.length * 100);
                this.progress = 100 - this.uploadProgress;
                this.isCompleted = false;
                if (!this.invalidMessage) {
                    //this.onChange.emit({files: this.files});
                    if (this.url && this.autoUpload) {
                        this.upload();
                    }
                }
            },

            onDelete(index) {
                this.files.splice(index, 1);
                //this.onRemove.emit({files: this.files});
//                if (this.mode === 'advanced') {
//                    this.inputElem.value = '';
//                }
            },

            upload(files) {
                if (!this.url && this.uploadProgress) {
                    return;
                }
                const xhr = new XMLHttpRequest(),
                    formData = new FormData();
                this.isUploading = true;

//                this.onBeforeUpload.emit({
//                    'xhr': xhr,
//                    'formData': formData
//                });

                for (const file of this.files) {
                    if (!file['uploaded']) {
                        formData.append(this.name, file, file.name);
                    }
                }
                const progress = this.progress;
                xhr.upload.onprogress = (event) => {
                    this.progress = progress + Math.round(event.lengthComputable
                            ? event.loaded * this.uploadProgress / event.total : 0);
                    this.onProgress.emit({event: event, progress: this.progress});
                };

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            for (const file of this.files) {
                                if (!file['uploaded']) {
                                    file['uploaded'] = true;
                                }
                            }
                            //this.onUpload.emit({xhr: xhr, files: this.files});
                        } else {
                            //this.onError.emit({xhr: xhr, files: this.files});
                        }
                    }
                    this.isCompleted = true;
                    this.isUploading = false;
                };

                if (this.options.headers) {
                    for (const header of this.options.headers) {
                        xhr.setRequestHeader(header.name, header.value);
                    }
                }

                xhr.open(this.method, this.url, true);

//                this.onBeforeSend.emit({
//                    'xhr': xhr,
//                    'formData': formData
//                });

                xhr.withCredentials = this.withCredentials;

                xhr.send(formData);
            },

            isImage(file) {
                return /^image\//.test(file.type);
            },

            isAdvanced() {
                return this.mode === 'advanced';
            },

            onDragEnter(event) {
                if (!this.disabled) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            },

            onDragOver(event) {
                if (!this.disabled) {
                    addClass(this.uploadElem, 'va-upload-active');
                    event.stopPropagation();
                    event.preventDefault();
                }
            },

            onDragLeave() {
                if (!this.disabled) {
                    removeClass(this.uploadElem, 'va-upload-active');
                }
            },

            onDrop(event) {
                if (!this.disabled) {
                    removeClass(this.uploadElem, 'va-upload-active');
                    event.stopPropagation();
                    event.preventDefault();
                    const files = event.dataTransfer ?
                        event.dataTransfer.files : event.target.files;
                    const allowDrop = this.multiple || (files && files.length === 1);
                    if (allowDrop) {
                        this.onFileSelect(event);
                    }
                }
            },

            formatSize(bytes) {
                if (bytes === 0) {
                    return '0 B';
                }
                const k = 1000,
                    dm = 3,
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));

                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },

            clear() {
                this.files = [];
                this.uploadProgress = 0;
                this.progress = 0;
            }
        },
        mounted() {
            this.uploadElem = this.$refs.container;
            if (this.mode === 'advanced') {
                this.uploadElem.addEventListener('dragover', this.onDragOver);
            }

        }
    }
</script>