<template>
    <div :class="classes">
        <div class="va-select-input" :class="{'va-select-timeonly': timeOnly}"
             @click="onClick()" v-if="!inline">
            <input type="text" :placeholder="placeholder" @input="onInputChange"
                   :value="formatValue()" :readonly="readonly">
        </div>
        <transition name="scaleInTop">
            <div class="va-date-picker-wrapper" v-if="inline || visible" :style="{width: contentWidth}">
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
                              {{selectLocale.monthNamesShort[currentMonth - 1]}} {{currentYear}}
                            </span>
                                <template v-else>
                                    <span>{{currentYear}} {{selectLocale.monthNamesShort[currentMonth - 1]}}</span>
                                </template>
                            </div>
                            <div v-if="yearState && !monthState" class="va-date-picker-years">
                                {{firstYear}} - {{firstYear + 9}}</div>
                            <div v-if="monthState" class="va-date-picker-years">{{selectYears}}
                            </div>
                        </div>
                        <div class="date-picker-select">
                            <div class="date-picker-select-next" @click="toNext">
                                <i class="va-icon">keyboard_arrow_right</i></div>
                        </div>
                    </div>
                    <div class="va-date-picker-table">
                        <table>
                            <thead>
                            <tr>
                                <th class="item" v-for="(w, i) in _week" :key="i.toString()">{{w}}</th>
                            </tr>
                            </thead>
                            <tbody class="date-picker-body">
                            <tr v-for="(week,i) in dates" :key="i.toString()">
                                <td :class="tdClasses(day)" :title="day.value"
                                    v-for="(day, j) in week" :key="j.toString()"
                                    @click="onDateSelect($event, day, j)">
                                    {{day.date}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="va-date-picker-footer" v-if="showNowBtn || showTime">
                            <div class="va-date-picker-time" v-if="showTime">
                                Time:
                                <div class="va-date-picker-time-wrapper">
                                <span><input type="number" :value="formatZero(currentHour)"
                                             @focus="onTimeFocus" @input="onTimeChange('h', $event)"></span>
                                    :<span><input type="number" :value="formatZero(currentMinute)"
                                                  @focus="onTimeFocus" @input="onTimeChange('m', $event)"></span>
                                    :<span><input type="number" :value="formatZero(currentSecond)"
                                                  @focus="onTimeFocus" @input="onTimeChange('s', $event)"></span>
                                </div>
                            </div>
                            <span @click="toToady()" v-if="showNowBtn">Now</span>
                        </div>
                    </div>
                    <div class="va-date-picker-year" v-if="yearState">
                        <table>
                            <tbody>
                            <tr v-for="(year, i) in years" :key="i.toString()">
                                <td v-for="(y,j) in year" :key="j.toString()"
                                    :class="{'va-date-active': currentYear == y - 1}" @click="selectYear(i, j, y - 1)">{{y - 1}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="va-date-picker-month" v-if="monthState">
                        <table>
                            <tbody>
                            <tr v-for="(month, i) in months" :key="i.toString()">
                                <td v-for="(m, j) in month" :key="j.toString()"
                                    :class="{'va-date-active': currentMonth - 1 == (i * 3 + j)}" @click="selectMonth(i, j)">
                                  <span v-if="lang === 'en'">
                                  {{m}}
                                </span>
                                    <template v-else>
                                        <span>{{selectLocale.monthNamesShort[i * 3 + j]}}</span>
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template v-else>
                    <div class="va-date-picker-time">
                        <va-time-selector :min="0" :max="24" type="h" v-model="currentHour"
                                         @on-change="onTimeSelectorChange"></va-time-selector>
                        <va-time-selector :min="0" :max="59" type="m" v-model="currentMinute"
                                         @on-change="onTimeSelectorChange"></va-time-selector>
                        <va-time-selector :min="0" :max="59" type="s" v-model="currentSecond"
                                         @on-change="onTimeSelectorChange"></va-time-selector>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
    import {listen} from '../base/event';
    import {dateFormat} from '../base/utils';
    import vaTimeSelector from './time-selector.vue';

    const prefixCls = 'va-date-picker';

    export default {
        name: 'va-date-picker',
        components: {
            vaTimeSelector
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            firstDayOfWeek: {
                type: Number,
                default: 7
            },
            lang: {
                type: String,
                default: 'en'
            },
            format: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            hourFormat: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 250
            },
            placeholder: {
                type: String,
                default: 'Select Time'
            },
            readonly: {
                default: false
            },
            timeOnly: {
                default: false
            },
            dateView: {
                type: String
            },
            minDate: {
                type: String
            },
            maxDate: {
                type: String
            },
            inline: {
                default: false
            },
            disabled: {
                default: false
            },
            showTime: {
                default: false
            },
            showNowBtn: {
                default: false
            }
        },
        data() {
            return {
                prefixCls,
                locale: {},
                locale_cn: {},
                week: [],
                currentDate: '',
                currentYear: 1970,
                currentMonth: 1,
                currentDay: 1,
                currentHour: 1,
                currentMinute: 1,
                currentSecond: 1,
                currentWeek: 1,
                todayDate: '',
                currentValue: this.value,
                dates: [],
                itemWidth: '',
                selfClick: false,
                visible: false,
                itemClick: false,
                yearState: false,
                monthState: false,
                months: '',
                years: '',
                firstYear: '',
                selectYears: '',
                selectMonths: '',
                selectLocale: {},
                bindDocumentClickListener: '',
                rows: 6,
                cols: 7,
                contentWidth: this.width
            }
        },
        computed: {
            classes() {
               return [
                   prefixCls,
                   {
                       [`${prefixCls}-inline`]: this.inline
                   }
               ]
            }
        },
        methods: {
            tdClasses(day) {
                return [
                    'item',
                    day.type,
                    {
                        selected: day.selected,
                        today: day.today
                    }
                ]
            },
            createCalendar() {
                this.dates = [];
                if (this.currentMonth >= 13) {
                    this.currentMonth = 1;
                    this.currentYear += 1;
                } else if (this.currentMonth <= 0) {
                    this.currentMonth = 12;
                    this.currentYear -= 1;
                }
                const data = this.getMonthFirstDay(this.currentYear, this.currentMonth);
                let first = data.day;
                const total = data.total;
                const dd = this.getSomeDay(this.currentYear + '-' + this.currentMonth + '-1', 1);
                const curDay = this.splitNum(this.currentDay);

                if (this.firstDayOfWeek === 7) {
                    first += 1;
                    first = first === 8 ? 1 : first;
                }
                for (let i = 0; i < first - 1; i++) {
                    const ymd = this.currentYear + '-' + (this.currentMonth - 1) + '-' + (dd.d - first + i + 2);
                    this.dates.push({
                        value: ymd,
                        month: this.currentMonth - 1,
                        date: (dd.d - first + i + 2),
                        type: 'pass'
                    });
                }
                for (let i = 1; i < (total + 1); i++) {
                    const ymd = this.currentYear + '-' + this.currentMonth + '-' + i;
                    const isToday = i === curDay;
                    let type = 'current';
                    const cur = new Date(ymd);
                    if (this.minDate && this.isDateValid(this.minDate)) {
                        type = new Date(this.minDate) < cur ? 'current' : 'pass';
                    }
                    if (this.maxDate && this.isDateValid(this.maxDate)) {
                        type = new Date(this.maxDate) > cur ? 'current' : 'pass';
                    }
                    this.dates.push({
                        value: ymd,
                        year: this.currentYear,
                        month: this.currentMonth,
                        date: i,
                        type: type,
                        selected: isToday,
                        today: isToday && this.currentMonth === (this.todayDate.getMonth() + 1)
                    });
                }
                const both = total + first - 1;
                const b1 = (this.rows - 1) * this.cols;
                const b2 = this.rows * this.cols;
                const futureDate = both < b1 ? b1 - both : b2 - both;
                for (let i = 0; i < futureDate; i++) {
                    const ymd = this.currentYear + '-' + (this.currentMonth + 1) + '-' + (i + 1);
                    this.dates.push({
                        value: ymd,
                        year: this.currentYear,
                        month: this.currentMonth + 1,
                        date: i + 1,
                        type: 'future',
                        selected: false
                    });
                }
                const month = [];
                let week = [];
                for (let i = 0; i < this.dates.length; i++) {
                    week.push(this.dates[i]);
                    if (i % 7 === 6) {
                        month.push(week);
                        week = [];
                    }
                }
                this.dates = month;
                this.selectYears = this.currentYear;
                this.createYear();
            },

            createMonth() {
                let month = [];
                this.months = [];
                const totalMonth = this.locale.monthNamesShort;
                for (let i = 0; i < 12; i++) {
                    month.push(totalMonth[i]);
                    if (i % 3 === 2) {
                        this.months.push(month);
                        month = [];
                    }
                }
            },

            createYear(add = 0) {
                let year = [];
                this.years = [];
                this.firstYear = parseInt(this.firstYear / 10 + '', 10) * 10 + add * 10;
                for (let i = 0; i < 12; i++) {
                    year.push(this.firstYear + i);
                    if (i % 3 === 2) {
                        this.years.push(year);
                        year = [];
                    }
                }
            },

            getDate(currentDate) {
                if (!(currentDate instanceof Date)) {
                    currentDate = new Date(currentDate);
                }
                this.currentYear = currentDate.getFullYear();
                this.currentMonth = currentDate.getMonth() + 1;
                this.currentDay = currentDate.getDate();
                if (this.hourFormat === '12') {
                    this.currentHour = currentDate.getHours() === 0 ? 12 : currentDate.getHours() % 12;
                } else {
                    this.currentHour = currentDate.getHours();
                }
                this.currentMinute = currentDate.getMinutes();
                this.currentSecond = currentDate.getSeconds();
                this.currentWeek = currentDate.getDate();
            },

            getMonthFirstDay(year, month) {
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
                    'total': dd,
                    'day': item
                };
            },

            getSomeDay(day, add) {
                const now = new Date(day);
                now.setDate(now.getDate() - add);
                const y = now.getFullYear();
                let m = now.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = now.getDate();
                d = d < 10 ? '0' + d : d;
                return {
                    'y': y,
                    'm': m,
                    'd': d
                };
            },

            setDate(date = new Date()) {
                const curDate = new Date();
                if (date && typeof date === 'string') {
                    if (!this.timeOnly) {
                        const tokens = date.trim().split(/\s+/);
                        if (this.showTime && tokens[1]) {
                            [this.currentHour, this.currentMinute, this.currentSecond] = tokens[1].split(':').map(t => {
                                const time = parseInt(t, 10);
                                if (!isNaN(time)) {
                                    return time;
                                }
                            });
                        }
                        const dates = tokens[0].split(/[-\/]/gm);
                        const arr = dates.map(d => {
                            return parseInt(d, 10);
                        });
                        // 日期格式会导致日期不准确
                        date = new Date(date);
                        //date = new Date(arr[0], arr[1] - 1, arr[2], this.currentHour, this.currentMinute, this.currentSecond);
                    } else {
                        [this.currentHour, this.currentMinute, this.currentSecond] = date.split(':').map(t => {
                            const time = parseInt(t, 10);
                            if (!isNaN(time)) {
                                return time;
                            }
                        });
                        date = curDate;
                        date.setHours(this.currentHour);
                        date.setMinutes(this.currentMinute);
                        date.setSeconds(this.currentSecond);
                    }
                }
                this.currentDate = date;
                this.getDate(date);
                this.$emit('on-change', this.currentValue);
            },

            selectYear(i, j, year) {
                this.itemClick = true;
                if ((!i && !j) || (i === 3 && j === 2)) {
                    return;
                }
                this.selectYears = year;
                this.selectMonths = 1;
                if (this.dateView === 'y') {
                    this.monthState = false;
                    this.itemClick = false;
                    this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay);
                    this.$emit('input', this.formatValue());
                } else {
                    this.monthState = true;
                }
            },

            selectMonth(i, j) {
                this.selectMonths = i * 3 + j + 1;
                this.itemClick = true;
                if (this.showTime) {
                    this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay
                        + ' ' + this.currentHour + ':' + this.currentMinute + ':' + this.currentSecond);
                } else {
                    this.selectDate(this.selectYears + '-' + this.selectMonths + '-' + this.currentDay);
                }
                this.createCalendar();
                if (this.dateView === 'ym') {
                    this.yearState = true;
                    this.monthState = false;
                    this.itemClick = false;
                    this.$emit('input', this.formatValue());
                } else if (this.dateView === 'm') {
                    this.monthState = true;
                    this.itemClick = false;
                    this.$emit('input', this.formatValue());
                } else {
                    this.yearState = false;
                    this.itemClick = true;
                    this.monthState = false;
                }
            },

            selectDate(value) {
                this.currentValue = value;
                this.setDate(value);
                this.currentValue = dateFormat(this.currentDate, this.format);
            },

            selectdReset() {
                for (const d of this.dates) {
                    d.forEach(v => {
                        v.selected = false;
                    });
                }
            },

            yearClick() {
                this.yearState = true;
                this.itemClick = true;
            },

            isDateValid(value) {
                let regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/;
                if (this.showTime) {
                    regExp = /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\s+\d{1,2}(:\d{1,2})*$/;
                }
                if (regExp.test(value)) {
                    const d = new Date(value);
                    if (d && d.getDate()) {
                        return true;
                    }
                }
                return false;
            },

            splitNum(v) {
                return parseInt(v, 10);
            },

            formatZero(value) {
                if (parseInt(value, 10) < 10) {
                    value = '0' + value;
                }
                return value;
            },

            toPrev(event) {
                if (!this.monthState && !this.yearState) {
                    this.currentMonth--;
                    this.createCalendar();
                }
                if (this.monthState) {
                    this.selectYears--;
                }
                if (!this.monthState && this.yearState) {
                    this.createYear(-1);
                }
                event.stopPropagation();
            },

            toNext(event) {
                if (!this.monthState && !this.yearState) {
                    this.currentMonth++;
                    this.createCalendar();
                }
                if (this.monthState) {
                    this.selectYears++;
                }
                if (!this.monthState && this.yearState) {
                    this.createYear(1);
                }
                event.stopPropagation();
            },

            toToady() {
                this.selectDate(this.todayDate);
                this.createCalendar();
                this.$emit('input', this.formatValue());
            },

            onDateSelect(event, item, index) {
                if (item.type === 'current') {
                    this.selectdReset();
                    this.selectDate(item.value);
                    item.selected = true;
                    this.$emit('input', this.formatValue());
                    this.close();
                } else {
                    this.itemClick = true;
                }
            },

            onInputChange(event) {
                const value = event.target.value;
                if (this.isDateValid(value)) {
                    this.setDate(value);
                    this.currentValue = value;
                    this.createCalendar();
                }
            },

            onTimeFocus() {
                this.itemClick = true;
            },

            onTimeChange(type, event) {
                const value = event.target.value;
                switch (type) {
                    case 'h':
                        this.currentHour = parseInt(value, 10);
                        break;
                    case 'm':
                        this.currentMinute = parseInt(value, 10);
                        break;
                    case 's':
                        this.currentSecond = parseInt(value, 10);
                        break;
                }
                this.currentDate = new Date(this.currentYear, this.currentMonth + 1, this.currentDay,
                    this.currentHour, this.currentMinute, this.currentSecond);
                this.setDate(this.currentDate);
                this.currentValue =dateFormat(this.currentDate, this.format);
            },

            formatValue() {
                let value = '';
                if (this.currentValue) {
                    value = this.currentValue;
                    if (this.dateView === 'y') {
                        value = this.currentValue.slice(0, 4);
                    } else if (this.dateView === 'ym') {
                        value = this.currentValue.slice(0, 7);
                    } else if (this.dateView === 'm') {
                        value = this.currentValue.slice(6, 7);
                    }
                }
                return value;
            },

            onClick() {
                if (this.disabled) { return; }
                if (!this.visible) {
                    this.open();
                } else {
                    this.close();
                }
            },

            open() {
                if (!this.inline) {
                    this.selfClick = true;
                    this.visible = true;
                }
            },

            close() {
                if (!this.inline) {
                    this.visible = false;
                    this.selfClick = false;
                    this.yearState = this.dateView === 'y' || this.dateView === 'ym';
                    this.monthState = this.dateView === 'm';
                }
            },

            onTimeSelectorChange(event) {
                const type = event.type;
                switch (type) {
                    case 'h':
                        this.currentHour = event.value;
                        break;
                    case 'm':
                        this.currentMinute = event.value;
                        break;
                    case 's':
                        this.currentSecond = event.value;
                }
                const date = new Date();
                date.setHours(this.currentHour);
                date.setMinutes(this.currentMinute);
                date.setSeconds(this.currentSecond);
                this.currentValue = dateFormat(date, 'hh:mm:ss');
                this.$emit('on-change', this.formatValue());
                this.$emit('input', this.formatValue());
            },

            onDocumentClickListener() {
                if (!this.inline) {
                    this.bindDocumentClickListener = listen(document, 'click', () => {
                        if (!this.selfClick && !this.itemClick) {
                            this.close();
                        }
                        this.itemClick = false;
                        this.selfClick = false;
                    });
                }
            },

            offDocumentClickListener() {
                if (this.bindDocumentClickListener) {
                    this.bindDocumentClickListener();
                    this.bindDocumentClickListener = null;
                }
            }
        },
        watch: {
            value(val) {
                if (val) {
                    this.selectDate(val);
                    this.createCalendar();
                }
            }
        },
        created() {
            this.locale = {
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May',
                    'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            };
            this.locale_cn = {
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            };
            this.selectLocale = this.lang.toLowerCase() === 'cn' ? this.locale_cn : this.locale;
            this._week = this.selectLocale.dayNamesShort;
        },
        mounted() {
            if (typeof this.contentWidth === 'number') {
                this.contentWidth = this.contentWidth + 'px';
            }
            if (!this.timeOnly) {
                if (this.showTime) {
                    this.format = 'yyyy-MM-dd hh:mm:ss';
                }
                if (this.firstDayOfWeek === 1) {
                    this._week.unshift(this._week[this._week.length - 1]);
                    this._week.pop();
                }
                this.todayDate = new Date();
                this.setDate(this.todayDate);
                if (this.currentValue) {
                    this.setDate(this.currentValue);
                    this.currentValue = dateFormat(this.currentDate, this.format);
                }
                this.dates = [];
                this.firstYear = this.todayDate.getFullYear();
                this.createCalendar();
                this.createMonth();
            } else {
                this.contentWidth = null;
                if (this.currentValue) {
                    this.setDate(this.currentValue);
                    this.currentValue = dateFormat(this.currentDate, 'hh:mm:ss');
                }
            }
            switch (this.dateView) {
                case 'y':
                case 'ym':
                    this.yearState = true;
                    break;
                case 'm':
                    this.monthState = true;
                    break;
            }
            this.onDocumentClickListener();
        },
        beforeDestroy() {
            this.offDocumentClickListener();
        }
    }
</script>