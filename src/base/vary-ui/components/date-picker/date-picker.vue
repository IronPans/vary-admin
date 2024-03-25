<template>
  <div :class="classes">
    <div
      class="va-select-input"
      :class="{ 'va-select-timeonly': timeOnly }"
      @click="onClick()"
      v-if="!inline"
    >
      <input
        type="text"
        :placeholder="placeholder"
        @input="onInputChange"
        :value="formatValue()"
        :readonly="readonly"
      />
    </div>
    <transition name="scaleInTop">
      <div
        class="va-date-picker-wrapper"
        v-if="inline || visible"
        :style="{ width: contentWidth }"
      >
        <div v-if="!timeOnly" class="va-date-picker-panel">
          <div class="va-date-picker-header">
            <div class="date-picker-select">
              <div class="date-picker-select-prev" @click="toPrev">
                <i class="va-icon">keyboard_arrow_left</i>
              </div>
            </div>
            <div class="date-picker-today" @click="yearClick">
              <div v-if="!yearState && !monthState">
                <span v-if="lang === 'en'">
                  {{ selectLocale.monthNamesShort[current.currentMonth - 1] }}
                  {{ current.currentYear }}
                </span>
                <template v-else>
                  <span
                    >{{ current.currentYear }}
                    {{ selectLocale.monthNamesShort[current.currentMonth - 1] }}</span
                  >
                </template>
              </div>
              <div v-if="yearState && !monthState" class="va-date-picker-years">
                {{ firstYear }} - {{ firstYear + 9 }}
              </div>
              <div v-if="monthState" class="va-date-picker-years">{{ selectYears }}</div>
            </div>
            <div class="date-picker-select">
              <div class="date-picker-select-next" @click="toNext">
                <i class="va-icon">keyboard_arrow_right</i>
              </div>
            </div>
          </div>
          <div class="va-date-picker-table">
            <table>
              <thead>
                <tr>
                  <th class="item" v-for="(w, i) in week" :key="i.toString()">
                    {{ w }}
                  </th>
                </tr>
              </thead>
              <tbody class="date-picker-body">
                <tr v-for="(week, i) in dates" :key="i.toString()">
                  <td
                    :class="tdClasses(day)"
                    :title="day.value"
                    v-for="(day, j) in week"
                    :key="j.toString()"
                    @click="onDateSelect($event, day, j)"
                  >
                    {{ day.date }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="va-date-picker-footer" v-if="showNowBtn || showTime">
              <div class="va-date-picker-time" v-if="showTime">
                Time:
                <div class="va-date-picker-time-wrapper">
                  <span
                    ><input
                      type="number"
                      :value="formatZero(current.currentHour)"
                      @focus="onTimeFocus"
                      @input="onTimeChange('h', $event)"
                  /></span>
                  :<span
                    ><input
                      type="number"
                      :value="formatZero(current.currentMinute)"
                      @focus="onTimeFocus"
                      @input="onTimeChange('m', $event)"
                  /></span>
                  :<span
                    ><input
                      type="number"
                      :value="formatZero(current.currentSecond)"
                      @focus="onTimeFocus"
                      @input="onTimeChange('s', $event)"
                  /></span>
                </div>
              </div>
              <span @click="toToady()" v-if="showNowBtn">Now</span>
            </div>
          </div>
          <div class="va-date-picker-year" v-if="yearState">
            <table>
              <tbody>
                <tr v-for="(year, i) in years" :key="i.toString()">
                  <td
                    v-for="(y, j) in year"
                    :key="j.toString()"
                    :class="{ 'va-date-active': current.currentYear == y - 1 }"
                    @click="selectYear(i, j, y - 1)"
                  >
                    {{ y - 1 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="va-date-picker-month" v-if="monthState">
            <table>
              <tbody>
                <tr v-for="(month, i) in months" :key="i.toString()">
                  <td
                    v-for="(m, j) in month"
                    :key="j.toString()"
                    :class="{ 'va-date-active': current.currentMonth - 1 == i * 3 + j }"
                    @click="selectMonth(i, j)"
                  >
                    <span v-if="lang === 'en'">
                      {{ m }}
                    </span>
                    <template v-else>
                      <span>{{ selectLocale.monthNamesShort[i * 3 + j] }}</span>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <template v-else>
          <div class="va-date-picker-time">
            <va-time-selector
              :min="0"
              :max="24"
              type="h"
              v-model="current.currentHour"
              @on-change="onTimeSelectorChange"
            ></va-time-selector>
            <va-time-selector
              :min="0"
              :max="59"
              type="m"
              v-model="current.currentMinute"
              @on-change="onTimeSelectorChange"
            ></va-time-selector>
            <va-time-selector
              :min="0"
              :max="59"
              type="s"
              v-model="current.currentSecond"
              @on-change="onTimeSelectorChange"
            ></va-time-selector>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  provide,
  defineComponent,
  onMounted,
  watch,
  ref,
  onUnmounted,
  computed,
} from "vue";
import { listen } from "../base/event";
import { dateFormat } from "../base/utils";
import vaTimeSelector from "./time-selector.vue";
import { pickerInjectKey, locale, locale_cn } from "./config";

const prefixCls = "va-date-picker";

export default defineComponent({
  name: "va-date-picker",
  components: {
    vaTimeSelector,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    firstDayOfWeek: {
      type: Number,
      default: 7,
    },
    lang: {
      type: String,
      default: "en",
    },
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    hourFormat: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 250,
    },
    placeholder: {
      type: String,
      default: "Select Time",
    },
    readonly: {
      default: false,
    },
    timeOnly: {
      default: false,
    },
    dateView: {
      type: String,
    },
    minDate: {
      type: String,
    },
    maxDate: {
      type: String,
    },
    inline: {
      default: false,
    },
    disabled: {
      default: false,
    },
    showTime: {
      default: false,
    },
    showNowBtn: {
      default: false,
    },
  },
  emits: ["on-change", "input"],
  setup(props, { emit }) {
    let bindDocumentClickListener: any = null;
    const selectLocale = props.lang.toLowerCase() === "cn" ? locale_cn : locale;
    const week = ref(selectLocale.dayNamesShort);
    const dates = ref([]);
    const selectYears = ref("");
    const selectMonths = ref("");
    const monthState = ref(false);
    const yearState = ref(false);
    const months = ref([]);
    let format = props.format;
    let itemClick = false;
    const firstYear = ref("");
    const years = ref([]);
    let selfClick = false;
    const current = ref({
      currentMinute: 0,
      currentMonth: 0,
      currentYear: 0,
      currentDay: 0,
      currentHour: 0,
      currentSecond: 0,
      currentDate: "",
    });
    const currentValue = ref("");
    const visible = ref(false);
    let todayDate = new Date();

    provide(pickerInjectKey, (data) => {
      current.value = {
        ...current.value,
        ...data,
      };
    });

    function tdClasses(day) {
      return [
        "item",
        day.type,
        {
          selected: day.selected,
          today: day.today,
        },
      ];
    }

    function createCalendar() {
      dates.value = [];
      if (current.value.currentMonth >= 13) {
        current.value.currentMonth = 1;
        current.value.currentYear += 1;
      } else if (current.value.currentMonth <= 0) {
        current.value.currentMonth = 12;
        current.value.currentYear -= 1;
      }
      const data = getMonthFirstDay(
        current.value.currentYear,
        current.value.currentMonth
      );
      let first = data.day;
      const total = data.total;
      const dd = getSomeDay(
        current.value.currentYear + "-" + current.value.currentMonth + "-1",
        1
      );
      const curDay = splitNum(current.value.currentDay);

      if (props.firstDayOfWeek === 7) {
        first += 1;
        first = first === 8 ? 1 : first;
      }
      for (let i = 0; i < first - 1; i++) {
        const ymd =
          current.value.currentYear +
          "-" +
          (current.value.currentMonth - 1) +
          "-" +
          (dd.d - first + i + 2);
        dates.value.push({
          value: ymd,
          month: current.value.currentMonth - 1,
          date: dd.d - first + i + 2,
          type: "pass",
        });
      }
      for (let i = 1; i < total + 1; i++) {
        const ymd =
          current.value.currentYear + "-" + current.value.currentMonth + "-" + i;
        const isToday = i === curDay;
        let type = "current";
        const cur = new Date(ymd);
        if (props.minDate && isDateValid(props.minDate)) {
          type = new Date(props.minDate) < cur ? "current" : "pass";
        }
        if (props.maxDate && isDateValid(props.maxDate)) {
          type = new Date(props.maxDate) > cur ? "current" : "pass";
        }
        dates.value.push({
          value: ymd,
          year: current.value.currentYear,
          month: current.value.currentMonth,
          date: i,
          type: type,
          selected: isToday,
          today: isToday && current.value.currentMonth === todayDate.getMonth() + 1,
        });
      }
      const both = total + first - 1;
      const b1 = (props.rows - 1) * props.cols;
      const b2 = props.rows * props.cols;
      const futureDate = both < b1 ? b1 - both : b2 - both;
      for (let i = 0; i < futureDate; i++) {
        const ymd =
          current.value.currentYear +
          "-" +
          (current.value.currentMonth + 1) +
          "-" +
          (i + 1);
        dates.value.push({
          value: ymd,
          year: current.value.currentYear,
          month: current.value.currentMonth + 1,
          date: i + 1,
          type: "future",
          selected: false,
        });
      }
      const month = [];
      let week = [];
      for (let i = 0; i < dates.value.length; i++) {
        week.push(dates.value[i]);
        if (i % 7 === 6) {
          month.push(week);
          week = [];
        }
      }
      dates.value = month;
      selectYears.value = current.value.currentYear;
      createYear();
    }

    function createMonth() {
      let month = [];
      months.value = [];
      const totalMonth = locale.monthNamesShort;
      for (let i = 0; i < 12; i++) {
        month.push(totalMonth[i]);
        if (i % 3 === 2) {
          months.value.push(month);
          month = [];
        }
      }
    }

    function createYear(add = 0) {
      let year = [];
      years.value = [];
      firstYear.value = parseInt(firstYear.value / 10 + "", 10) * 10 + add * 10;
      for (let i = 0; i < 12; i++) {
        year.push(firstYear.value + i);
        if (i % 3 === 2) {
          years.value.push(year);
          year = [];
        }
      }
    }

    function getDate(currentDate) {
      if (!(currentDate instanceof Date)) {
        currentDate = new Date(currentDate);
      }
      current.value.currentYear = currentDate.getFullYear();
      current.value.currentMonth = currentDate.getMonth() + 1;
      current.value.currentDay = currentDate.getDate();
      if (props.hourFormat === "12") {
        current.value.currentHour =
          currentDate.getHours() === 0 ? 12 : currentDate.getHours() % 12;
      } else {
        current.value.currentHour = currentDate.getHours();
      }
      current.value.currentMinute = currentDate.getMinutes();
      current.value.currentSecond = currentDate.getSeconds();
      current.value.currentWeek = currentDate.getDate();
    }

    function getMonthFirstDay(year, month) {
      const curDate = new Date();
      curDate.setFullYear(year);
      curDate.setMonth(month);
      curDate.setDate(0);
      const dd = curDate.getDate();
      curDate.setDate(1);
      let item = curDate.getDay();
      if (item === 0) {
        item = 7;
      }
      return {
        total: dd,
        day: item,
      };
    }

    function getSomeDay(day, add) {
      const now = new Date(day);
      now.setDate(now.getDate() - add);
      const y = now.getFullYear();
      let m = now.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = now.getDate();
      d = d < 10 ? "0" + d : d;
      return {
        y: y,
        m: m,
        d: d,
      };
    }

    function setDate(date = new Date()) {
      const curDate = new Date();
      if (date && typeof date === "string") {
        if (!props.timeOnly) {
          const tokens = date.trim().split(/\s+/);
          if (props.showTime && tokens[1]) {
            [
              current.value.currentHour,
              current.value.currentMinute,
              current.value.currentSecond,
            ] = tokens[1].split(":").map((t) => {
              const time = parseInt(t, 10);
              if (!isNaN(time)) {
                return time;
              }
            });
          }
          const dates = tokens[0].split(/[-\/]/gm);
          const arr = dates.map((d) => {
            return parseInt(d, 10);
          });
          // 日期格式会导致日期不准确
          date = new Date(date);
        } else {
          [
            current.value.currentHour,
            current.value.currentMinute,
            current.value.currentSecond,
          ] = date.split(":").map((t) => {
            const time = parseInt(t, 10);
            if (!isNaN(time)) {
              return time;
            }
          });
          date = curDate;
          date.setHours(current.value.currentHour);
          date.setMinutes(current.value.currentMinute);
          date.setSeconds(current.value.currentSecond);
        }
      }
      current.value.currentDate = date;
      getDate(date);
      emit("on-change", current.value);
    }

    function selectYear(i, j, year) {
      itemClick = true;
      if ((!i && !j) || (i === 3 && j === 2)) {
        return;
      }
      selectYears.value = year;
      selectMonths.value = 1;
      if (props.dateView === "y") {
        monthState.value = false;
        itemClick = false;
        selectDate(
          selectYears.value + "-" + selectMonths.value + "-" + current.value.currentDay
        );
        emit("input", formatValue());
      } else {
        monthState.value = true;
      }
    }

    function selectMonth(i, j) {
      selectMonths.value = i * 3 + j + 1;
      itemClick = true;
      if (props.showTime) {
        selectDate(
          selectYears.value +
            "-" +
            selectMonths.value +
            "-" +
            current.value.currentDay +
            " " +
            current.value.currentHour +
            ":" +
            current.value.currentMinute +
            ":" +
            current.value.currentSecond
        );
      } else {
        selectDate(
          selectYears.value + "-" + selectMonths.value + "-" + current.value.currentDay
        );
      }
      createCalendar();
      if (props.dateView === "ym") {
        yearState.value = true;
        monthState.value = false;
        itemClick = false;
        emit("input", formatValue());
      } else if (props.dateView === "m") {
        monthState.value = true;
        itemClick = false;
        emit("input", formatValue());
      } else {
        yearState.value = false;
        itemClick = true;
        monthState.value = false;
      }
    }

    function selectDate(value) {
      //   currentValue.value = value;
      setDate(value);
      currentValue.value = dateFormat(current.value.currentDate, format);
    }

    function selectdReset() {
      for (const d of dates.value) {
        d.forEach((v) => {
          v.selected = false;
        });
      }
    }

    function yearClick() {
      yearState.value = true;
      itemClick = true;
    }

    function isDateValid(value) {
      let regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/;
      if (props.showTime) {
        regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\s+\d{1,2}(:\d{1,2})*$/;
      }
      if (regExp.test(value)) {
        const d = new Date(value);
        if (d && d.getDate()) {
          return true;
        }
      }
      return false;
    }

    function splitNum(v) {
      return parseInt(v, 10);
    }

    function formatZero(value) {
      if (parseInt(value, 10) < 10) {
        value = "0" + value;
      }
      return value;
    }

    function toPrev(event) {
      if (!monthState.value && !yearState.value) {
        current.value.currentMonth--;
        createCalendar();
      }
      if (monthState.value) {
        selectYears.value--;
      }
      if (!monthState.value && yearState.value) {
        createYear(-1);
      }
      event.stopPropagation();
    }

    function toNext(event) {
      if (!monthState.value && !yearState.value) {
        current.value.currentMonth++;
        createCalendar();
      }
      if (monthState.value) {
        selectYears.value++;
      }
      if (!monthState.value && yearState.value) {
        createYear(1);
      }
      event.stopPropagation();
    }

    function toToady() {
      selectDate(todayDate);
      createCalendar();
      emit("input", formatValue());
    }

    function onDateSelect(event, item, index) {
      if (item.type === "current") {
        selectdReset();
        selectDate(item.value);
        item.selected = true;
        emit("input", formatValue());
        close();
      } else {
        itemClick = true;
      }
    }

    function onInputChange(event) {
      const value = event.target.value;
      if (isDateValid(value)) {
        setDate(value);
        currentValue.value = value;
        createCalendar();
      }
    }

    function onTimeFocus() {
      itemClick = true;
    }

    function onTimeChange(type, event) {
      const value = event.target.value;
      switch (type) {
        case "h":
          current.value.currentHour = parseInt(value, 10);
          break;
        case "m":
          current.value.currentMinute = parseInt(value, 10);
          break;
        case "s":
          current.value.currentSecond = parseInt(value, 10);
          break;
      }
      current.value.currentDate = new Date(
        current.value.currentYear,
        current.value.currentMonth + 1,
        current.value.currentDay,
        current.value.currentHour,
        current.value.currentMinute,
        current.value.currentSecond
      );
      setDate(current.value.currentDate);
      currentValue.value = dateFormat(current.value.currentDate, format);
    }

    function formatValue() {
      let value = "";
      if (currentValue.value) {
        value = currentValue.value;
        if (props.dateView === "y") {
          value = currentValue.value.slice(0, 4);
        } else if (props.dateView === "ym") {
          value = currentValue.value.slice(0, 7);
        } else if (props.dateView === "m") {
          value = currentValue.value.slice(6, 7);
        }
      }
      return value;
    }

    function onClick() {
      if (props.disabled) {
        return;
      }
      if (!visible.value) {
        open();
      } else {
        close();
      }
    }

    function open() {
      if (!props.inline) {
        selfClick = true;
        visible.value = true;
      }
    }

    function close() {
      if (!props.inline) {
        visible.value = false;
        selfClick = false;
        yearState.value = props.dateView === "y" || props.dateView === "ym";
        monthState.value = props.dateView === "m";
      }
    }

    function onTimeSelectorChange(event) {
      const type = event.type;
      switch (type) {
        case "h":
          current.value.currentHour = event.value;
          break;
        case "m":
          current.value.currentMinute = event.value;
          break;
        case "s":
          current.value.currentSecond = event.value;
      }
      const date = new Date();
      date.setHours(current.value.currentHour);
      date.setMinutes(current.value.currentMinute);
      date.setSeconds(current.value.currentSecond);
      currentValue.value = dateFormat(date, "hh:mm:ss");
      emit("on-change", formatValue());
      emit("input", formatValue());
    }

    function onDocumentClickListener() {
      if (!props.inline) {
        bindDocumentClickListener = listen(document, "click", () => {
          if (!selfClick && !itemClick) {
            close();
          }
          itemClick = false;
          selfClick = false;
        });
      }
    }

    function offDocumentClickListener() {
      if (bindDocumentClickListener) {
        bindDocumentClickListener();
        bindDocumentClickListener = null;
      }
    }

    watch(props.value, (val) => {
      if (val) {
        selectDate(val);
        createCalendar();
      }
    });

    const contentWidth = ref(props.width);

    onMounted(() => {
      if (typeof contentWidth.value === "number") {
        contentWidth.value = contentWidth.value + "px";
      }
      if (!props.timeOnly) {
        if (props.showTime) {
          format = "yyyy-MM-dd hh:mm:ss";
        }
        if (props.firstDayOfWeek === 1) {
          week.value.unshift(week.value[week.value.length - 1]);
          week.value.pop();
        }
        todayDate = new Date();
        setDate(todayDate);
        if (currentValue.value) {
          setDate(currentValue.value);
          currentValue.value = dateFormat(current.value.currentDate, format);
        }
        dates.value = [];
        firstYear.value = todayDate.getFullYear();
        createCalendar();
        createMonth();
      } else {
        contentWidth.value = null;
        if (currentValue.value) {
          setDate(currentValue.value);
          currentValue.value = dateFormat(current.value.currentDate, "hh:mm:ss");
        }
      }
      switch (props.dateView) {
        case "y":
        case "ym":
          yearState.value = true;
          break;
        case "m":
          monthState.value = true;
          break;
      }
      onDocumentClickListener();
    });

    onUnmounted(() => {
      offDocumentClickListener();
    });

    return {
      prefixCls,
      timeOnly: props.timeOnly,
      contentWidth,
      selectMonth,
      monthState,
      yearState,
      years,
      dates,
      months,
      firstYear,
      visible,
      week,
      formatValue,
      onClick,
      line: props.inline,
      onInputChange,
      placeholder: props.placeholder,
      readonly: props.readonly,
      showNowBtn: props.showNowBtn,
      showTime: props.showTime,
      toNext,
      toPrev,
      lang: props.lang,
      current,
      onTimeFocus,
      selectLocale,
      tdClasses,
      onDateSelect,
      yearClick,
      selectYear,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-inline`]: props.inline,
          },
        ];
      }),
    };
  },
});
</script>
