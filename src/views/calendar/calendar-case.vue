<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <!--<va-col :span="3">-->
      <!--<va-card>-->
      <!--<h5>Event</h5>-->
      <!--<div>-->
      <!--<div draggable="true" class="calendar-events va-draggable" @dragstart="drag">-->
      <!--<va-badge :dot="true" :fixed="false" status="primary"/>-->
      <!--Event One-->
      <!--</div>-->
      <!--<div class="calendar-events va-draggable">-->
      <!--<va-badge :dot="true" :fixed="false" status="info"/>-->
      <!--Event One-->
      <!--</div>-->
      <!--<div class="calendar-events va-draggable">-->
      <!--<va-badge :dot="true" :fixed="false" status="warning"/>-->
      <!--Event One-->
      <!--</div>-->
      <!--<div class="calendar-events va-draggable">-->
      <!--<va-badge :dot="true" :fixed="false" status="error"/>-->
      <!--Event One-->
      <!--</div>-->
      <!--</div>-->
      <!--<div>-->
      <!--<va-button theme="primary" :block="true">Add New Event</va-button>-->
      <!--</div>-->
      <!--</va-card>-->
      <!--</va-col>-->
      <va-col :span="12">
        <va-card header="Full Calender">
          <!--<va-calendar :events="events"></va-calendar>-->
          <va-fullcalendar
            @on-event-click="eventClick"
            :droppable="true"
            :eventLimit="4"
            :events="events"
          ></va-fullcalendar>
        </va-card>
      </va-col>
    </va-row>
    <va-modal header="Add an Event" v-model="visible">
      <div class="m-b-20">
        <va-input placeholder="Event Name" v-model="selectedEvent.title"></va-input>
      </div>
      <div class="m-b-20">
        Start：<va-date-picker v-model="selectedEvent.start"></va-date-picker>
        End：<va-date-picker v-model="selectedEvent.end"></va-date-picker>
      </div>
      <div>
        <h5>Tag Color</h5>
        <div class="event-tag">
          <span
            v-for="(name, i) in tagThemes"
            :key="i.toString()"
            :class="tagClasses(name)"
            @click="selectTagTheme(name)"
          ></span>
        </div>
      </div>
      <div class="m-t-20 text-right">
        <va-button size="sm" theme="primary" class="text-uppercase">add event</va-button>
        <va-button size="sm" class="text-uppercase" @click="visible = false"
          >cancel</va-button
        >
      </div>
    </va-modal>
  </div>
</template>

<script setup lang="ts">
import "moment";
import { ref, onMounted } from "vue";
import VaCalendar from "@/base/components/calendar";
import BaseRequest from "@/views/base/BaseRequest";
// const prefixCls = "va-calendar-case";

const events = ref([]);
const visible = ref(false);
const tagThemes = ["primary", "info", "success", "warning", "danger"];
const selectedEvent = ref({
  title: "",
  start: 0,
  end: 0,
});
const selectedTheme = ref("");

onMounted(() => {
  getEvents();
});

function formatDate(date: any) {
  if (!date || typeof date === "string") {
    return date;
  }
  return date.format("L");
}
function selectTagTheme(theme: string) {
  selectedTheme.value = `bg-${theme}`;
}
async function getEvents() {
  const bs = new BaseRequest();
  const result = await bs.get("assets/json/events.json");
  events.value = result.data;
}

function tagClasses(theme: string) {
  return [
    `bg-${theme}`,
    {
      selected: selectedTheme.value === `bg-${theme}`,
    },
  ];
}
// function drag(event) {
//   event.dataTransfer.setData("Text", event.target.id);
// }
function eventClick(event: any) {
  visible.value = true;
  const ev = event.calEvent;
  ev["start"] = formatDate(ev["start"]);
  ev["end"] = formatDate(ev["end"]);
  selectedEvent.value = ev;
  selectedTheme.value = ev.className[0];
}

// export default {
//   name: "va-calendar-case",
//   components: {
//     VaCalendar,
//   },
//   data() {
//     return {
//       events: [],
//       visible: false,
//       tagThemes: ["primary", "info", "success", "warning", "danger"],
//       selectedEvent: {},
//       selectedTheme: null,
//     };
//   },
//   methods: {
//     formatDate(date) {
//       if (!date || typeof date === "string") {
//         return date;
//       }
//       return date.format("L");
//     },
//     selectTagTheme(theme) {
//       this.selectedTheme = `bg-${theme}`;
//     },
//     async getEvents() {
//       const bs = new BaseRequest();
//       const result = await bs.get("assets/json/events.json");
//       this.events = result.data;
//     },
//     tagClasses(theme) {
//       return [
//         `bg-${theme}`,
//         {
//           selected: this.selectedTheme === `bg-${theme}`,
//         },
//       ];
//     },
//     drag(event) {
//       event.dataTransfer.setData("Text", event.target.id);
//     },
//     eventClick(event) {
//       this.visible = true;
//       const ev = event.calEvent;
//       ev["start"] = this.formatDate(ev["start"]);
//       ev["end"] = this.formatDate(ev["end"]);
//       this.selectedEvent = ev;
//       this.selectedTheme = ev.className[0];
//     },
//   },
//   created() {
//     this.getEvents();
//   },
// };
</script>

<style lang="less" scoped>
.calendar-events {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #fff;
  cursor: move;

  > .va-badge {
    margin-right: 10px;
  }

  &:hover {
    border: 1px dashed rgba(120, 130, 140, 0.13);
  }
}
</style>
