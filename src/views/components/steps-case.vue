<template>
  <div class="va-page-box">
    <va-row>
      <va-col :lg="12">
        <va-card header="Default Steps">
          <va-steps v-model="value" :items="steps">
            {{ steps }}
            <template #content="{ index, item }">
              <template v-if="index === 0">
                Click to Next Step!
                <div class="m-t-10">
                  <va-button @click="toNext" theme="primary">Next</va-button>
                </div>
              </template>
              <template v-else-if="index === 1">
                Click to Next Step 2!
                <div class="m-t-10">
                  <va-button @click="toNext" theme="primary">Next</va-button>
                </div>
              </template>
              <template v-else-if="index === 2">
                Click to Complete!
                <div class="m-t-10">
                  <va-button @click="toNext" theme="success">Complete</va-button>
                </div>
              </template>
            </template>
            <!-- <va-step-pane label="test">
              Click to Next Step!
              <div class="m-t-10">
                <va-button @click="toNext" theme="primary">Next</va-button>
              </div>
            </va-step-pane>
            <va-step-pane label="test1">
              Click to Next Step!
              <div class="m-t-10">
                <va-button @click="toNext" theme="primary">Next</va-button>
              </div>
            </va-step-pane>
            <va-step-pane label="test2">
              Click to Complete!
              <div class="m-t-10">
                <va-button @click="toNext" theme="success">Complete</va-button>
              </div>
            </va-step-pane> -->
          </va-steps>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(0);
const steps = [
  {
    label: "Steps 1",
    content: "",
  },
  {
    label: "Steps 2",
    content: "",
  },
  {
    label: "Steps 3",
    content: "",
  },
];

function toNext() {
  value.value += 1;
}
</script>
