<template>
  <div :class="`${prefixCls}-box`">
    <div
      :class="`${prefixCls}`"
      ref="uploadElem"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <div class="va-upload-toolbar">
        <div class="va-upload-text" v-if="$slots.header">
          <slot name="header"></slot>
          <div class="va-upload-inner">
            <input
              type="file"
              name="uploadFile"
              :multiple="multiple"
              :accept="options.accept"
              @change="onFileSelect"
            />
          </div>
        </div>
        <template v-else>
          <div class="va-upload-text">
            <va-button :disabled="isUploading">{{ currentTitle }}</va-button>
            <div class="va-upload-inner">
              <input
                type="file"
                name="uploadFile"
                :multiple="multiple"
                :accept="options.accept"
                @change="onFileSelect"
              />
            </div>
          </div>
          <div class="va-upload-advanced" v-if="isAdvanced()">
            <va-button
              :disabled="isUploading || !uploadProgress || isCompleted"
              @click="upload"
            >
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
      {{ invalidMessage }}
    </div>
    <div class="va-upload-review" v-if="review && isAdvanced()">
      <ul>
        <li v-for="(file, i) in files" class="va-upload-item" :key="i.toString()">
          <img v-if="isImage(file)" :src="file['dataURL']" :alt="file.name" />
          {{ file.name }}
          <span class="va-file-size">{{ formatSize(file["size"]) }}</span>
          <span class="va-upload-delete" @click="onDelete(i)">
            <i class="fa fa-close"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { addClass, removeClass } from "../base/dom";
import VaButton from "../button";

const prefixCls = "va-upload";

export default defineComponent({
  name: "VaUpload",
  components: {
    VaButton,
  },
  props: {
    name: {
      type: String,
      default: "files[]",
    },
    title: {
      type: String,
      default: "Choose",
    },
    review: {
      type: Boolean,
    },
    multiple: {
      type: Boolean,
    },
    maxFileSize: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
    mode: {
      type: String,
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    showProgress: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default() {
        return {
          method: "POST",
          url: "",
          withCredentials: false,
          invalidFileSizeMessage: "",
          invalidFileTypeMessage: "",
        };
      },
    },
  },
  emits: ["on-progress"],
  setup(props, { emit }) {
    const { options } = props;
    const uploadElem = ref();
    const isUploading = ref(false);
    const files = ref<any>([]);
    const isCompleted = ref(false);
    const currentTitle = ref(props.title || "");
    const progress = ref(0);
    const invalidMessage = ref("");
    const uploadProgress = ref(0);
    function onFileSelect(event: any) {
      invalidMessage.value = "";
      const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      console.log(fileList);
      for (const file of fileList) {
        if (props.maxFileSize) {
          if (file.size > props.maxFileSize) {
            invalidMessage.value = options.invalidFileSizeMessage;
            break;
          }
        }
        if (options.accept) {
          const regExp = new RegExp(options.accept);
          if (!regExp.test(options.accept)) {
            invalidMessage.value = options.invalidFileTypeMessage;
            break;
          }
        }
        if (props.review && isImage(file)) {
          file["dataURL"] = window.URL.createObjectURL(file);
        }
        file["uploaded"] = false;
        files.value.push(file);
        if (!isAdvanced()) {
          currentTitle.value =
            files.value.length > 1 ? `${files.value.length}个文件` : files.value[0].name;
        }
      }
      let num = 0;
      for (const file of files.value) {
        if (!file["uploaded"]) {
          num++;
        }
      }
      uploadProgress.value = Math.round((num / files.value.length) * 100);
      progress.value = 100 - uploadProgress.value;
      isCompleted.value = false;
      if (!invalidMessage.value) {
        //onChange.emit({files: files});
        if (options.url && props.autoUpload) {
          upload(files.value);
        }
      }
    }

    function onDelete(index: number) {
      files.value.splice(index, 1);
      //onRemove.emit({files: files});
      //                if (mode === 'advanced') {
      //                    inputElem.value = '';
      //                }
    }

    function upload(files: any) {
      if (!options.url && uploadProgress) {
        return;
      }
      const xhr = new XMLHttpRequest(),
        formData = new FormData();
      isUploading.value = true;

      //                onBeforeUpload.emit({
      //                    'xhr': xhr,
      //                    'formData': formData
      //                });

      for (const file of files) {
        if (!file["uploaded"]) {
          formData.append("name", file, file.name);
        }
      }
      let newProgress = progress.value;
      xhr.upload.onprogress = (event) => {
        newProgress =
          newProgress +
          Math.round(
            event.lengthComputable
              ? (event.loaded * uploadProgress.value) / event.total
              : 0
          );
        emit("on-progress", { event: event, progress: progress });
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            for (const file of files) {
              if (!file["uploaded"]) {
                file["uploaded"] = true;
              }
            }
            //onUpload.emit({xhr: xhr, files: files});
          } else {
            //onError.emit({xhr: xhr, files: files});
          }
        }
        isCompleted.value = true;
        isUploading.value = false;
      };

      if (options.headers) {
        for (const header of options.headers) {
          xhr.setRequestHeader(header.name, header.value);
        }
      }

      xhr.open(options.method, options.url, true);

      //                onBeforeSend.emit({
      //                    'xhr': xhr,
      //                    'formData': formData
      //                });

      xhr.withCredentials = options.withCredentials;

      xhr.send(formData);
    }

    function isImage(file) {
      return /^image\//.test(file.type);
    }

    function isAdvanced() {
      return props.mode === "advanced";
    }

    function onDragEnter(event) {
      if (!props.disabled) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    function onDragOver(event) {
      if (!props.disabled) {
        addClass(uploadElem, "va-upload-active");
        event.stopPropagation();
        event.preventDefault();
      }
    }

    function onDragLeave() {
      if (!props.disabled) {
        removeClass(uploadElem, "va-upload-active");
      }
    }

    function onDrop(event) {
      if (!props.disabled) {
        removeClass(uploadElem, "va-upload-active");
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        const allowDrop = props.multiple || (files && files.length === 1);
        if (allowDrop) {
          onFileSelect(event);
        }
      }
    }

    function formatSize(bytes: number) {
      if (bytes === 0) {
        return "0 B";
      }
      const k = 1000,
        dm = 3,
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    function clear() {
      files.value = [];
      uploadProgress.value = 0;
      progress.value = 0;
    }

    onMounted(() => {
      if (props.mode === "advanced") {
        uploadElem.value.addEventListener("dragover", onDragOver);
      }
    });
    return {
      prefixCls,
      isCompleted,
      isUploading,
      uploadProgress,
      progress,
      files,
      uploadElem,
      currentTitle,
      invalidMessage,
      onDragEnter,
      onDragLeave,
      onDrop,
      onFileSelect,
      isAdvanced,
      upload,
      isImage,
      formatSize,
      onDelete,
      clear,
    };
  },
});
</script>
