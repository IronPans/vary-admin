<template>
    <div :class="prefixCls">
        <va-row :gutter="16">
            <va-col :span="3">
                <h5>Event</h5>
                <div>
                    <div class="calendar-events va-draggable" @mousedown="touchstart">
                        <va-badge :dot="true" :fixed="false" status="primary"/>
                        Event One
                    </div>
                    <div class="calendar-events va-draggable" @mousedown="touchstart">
                        <va-badge :dot="true" :fixed="false" status="info"/>
                        Event One
                    </div>
                    <div class="calendar-events va-draggable" @mousedown="touchstart">
                        <va-badge :dot="true" :fixed="false" status="warning"/>
                        Event One
                    </div>
                    <div class="calendar-events va-draggable" @mousedown="touchstart">
                        <va-badge :dot="true" :fixed="false" status="error"/>
                        Event One
                    </div>
                </div>
                <div>
                    <va-button theme="primary" @click="openModal" :block="true">Add New Event</va-button>
                </div>
            </va-col>
            <va-col :span="9">
                <div :class="`${prefixCls}-header`">
                    <div class="va-calendar-header-left">
                        <va-button size="sm" @click="toAdd(-1)">
                            <va-icon icon="keyboard_arrow_left"></va-icon>
                        </va-button>
                        <va-button size="sm" @click="toAdd(1)">
                            <va-icon icon="keyboard_arrow_right"></va-icon>
                        </va-button>
                        <va-button size="sm">
                            today
                        </va-button>
                    </div>
                    <div class="va-calendar-header-center">
                        {{selectLocale['monthNames'][selectedDate.m]}} {{selectedDate.y}}
                    </div>
                    <div class="va-calendar-header-right">
                        <va-button-group>
                            <va-button size="sm" :is-active="t === currentMode" v-for="(t, i) in btns"
                                       :key="i.toString()">{{t}}
                            </va-button>
                        </va-button-group>
                    </div>
                </div>
                <div :class="`${prefixCls}-body`">
                    <table class="table">
                        <thead>
                        <tr>
                            <td>
                                <div class="va-row">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th class="va-day-header" v-for="(w, i) in week" :key="i.toString()">
                                                <span>{{w}}</span>
                                            </th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="va-calendar-container">
                                    <div class="va-day-grid" ref="grid">
                                        <div class="va-calendar-week" v-for="(row, i) in data" :key="i.toString()">
                                            <div class="va-calendar-bg">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td class="va-day"
                                                            :class="{hover: point.row === i && point.col === j}"
                                                            v-for="(col, j) in row" :key="j.toString()"
                                                            :date-date="col.date"></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="va-calendar-content">
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <td class="va-day-top" v-for="(col, j) in row"
                                                            :key="j.toString()">
                                                            <span :class="`${col.type}`">{{col.d}}</span>
                                                        </td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td v-for="(col, j) in row" :key="j.toString()"
                                                            :class="{'va-event-container': col.events.length > 0}">
                                                            <a class="bg-blue va-draggable"
                                                               v-if="col.events.length === 1" @mousedown="touchstart">
                                                                <div class="va-event-content">
                                                                    <span class="va-time">{{col.events[0].time}}</span>
                                                                    <span class="va-title">{{col.events[0].title}}</span>
                                                                </div>
                                                            </a>
                                                            <a class="va-more va-draggable" @mousedown="touchstart"
                                                               v-else-if="col.events.length > 1">+2 more</a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </va-col>
        </va-row>
        <div class="va-draggable-item" ref="drag"
             :style="{top: dragStyle.top + 'px', left: dragStyle.left + 'px'}"
             v-show="isDragging"></div>
        <va-modal header="Add an Event" v-model="visible">
            <div class="m-b-20 m-t-10">
                <va-input placeholder="Event Name" :animated="true"></va-input>
            </div>
            <div>
                <h5>Tag Color</h5>
                <div class="event-tag">
                    <span v-for="(name, i) in tagThemes"
                          :key="i.toString()" :class="tagClasses(name)" @click="selectTagTheme(name)"></span>
                </div>
            </div>
            <div class="m-t-20 text-right">
                <va-button size="sm" theme="primary" class="text-uppercase">add event</va-button>
                <va-button size="sm" class="text-uppercase" @click="visible = false">cancel</va-button>
            </div>
        </va-modal>
    </div>
</template>

<script>
    import {listen} from '../../vary-ui/components/base/event';

    const prefixCls = 'va-calendar';

    export default {
        name: 'VaCalendar',
        props: {
            lang: {
                type: String,
                default: 'en'
            },
            events: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                prefixCls,
                cols: 7,
                rows: 6,
                firstDayOfWeek: 7,
                selectedDate: {},
                today: '',
                data: [],
                selectLocale: [],
                week: [],
                btns: ['Month', 'Week', 'Day'],
                currentMode: 'Month',
                dragElem: null,
                gridElem: null,
                documentTouchmoveListener: null,
                documentTouchendListener: null,
                isDragging: false,
                dragItem: null,
                target: null,
                touch: {
                    x: 0,
                    y: 0
                },
                dragStyle: {
                    top: 0,
                    left: 0
                },
                visible: false,
                tagThemes: ['blue', 'indigo', 'purple', 'pink', 'red',
                    'orange', 'yellow', 'green', 'teal', 'cyan', 'gray', 'dark'],
                selectedTheme: null,
                mainEvents: null,
                point: {
                    row: -1,
                    col: -1
                },
                eventMessage: null
            }
        },
        methods: {
            selectTagTheme(theme) {
                this.selectedTheme = theme;
            },
            tagClasses(theme) {
                return [
                    `bg-${theme}`,
                    {
                        selected: this.selectedTheme === theme
                    }
                ]
            },
            openModal() {
                this.visible = true;
            },
            getDaysAndFirstDayOfWeek(year, month, d = 1) {
                const date = new Date();
                const obj = {};
                date.setDate(d);
                date.setFullYear(year);
                date.setMonth(month);  // month 0 ~ 11
                // 获取上个月的天数、月份、年份、第一天是星期几
                date.setDate(0);
                obj.d = date.getDate();
                date.setDate(1);
                obj.w = date.getDay();
                obj.y = date.getFullYear();
                obj.m = date.getMonth();
                return obj;
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
            createDay(y, m, d = 1) {
                const data = [];
                let firstOfWeek = 0;
                const prev = this.getDaysAndFirstDayOfWeek(y, m, d);
                const today = this.getDaysAndFirstDayOfWeek(y, m + 1, d);
                const next = this.getDaysAndFirstDayOfWeek(y, m + 2, d);
                firstOfWeek = today.w;
                if (this.firstDayOfWeek === 7) {
                    firstOfWeek += 1;
                    firstOfWeek = firstOfWeek === 8 ? 1 : firstOfWeek;
                }
                for (let i = 0; i < firstOfWeek - 1; i++) {
                    const d = prev.d - firstOfWeek + i + 2;
                    const date = this.getFormatDate([prev.y, prev.m + 1, d]);
                    data.push({
                        d,
                        m: prev.m + 1,
                        y: prev.y,
                        type: 'pass',
                        date,
                        events: this.getEventsByDate(date)
                    });
                }
                for (let i = 0; i < today.d; i++) {
                    const d = i + 1, date = this.getFormatDate([today.y, today.m + 1, d]);
                    data.push({
                        d,
                        m: today.m + 1,
                        y: today.y,
                        type: 'current',
                        date,
                        events: this.getEventsByDate(date)
                    });
                }
                const both = today.d + firstOfWeek - 1;
                const b1 = (this.rows - 1) * this.cols, b2 = this.rows * this.cols;
                const futureDate = both < b1 ? b1 - both : b2 - both;
                for (let i = 0; i < futureDate; i++) {
                    const d = i + 1, date = this.getFormatDate([next.y, next.m + 1, d]);
                    data.push({
                        d,
                        m: next.m + 1,
                        y: next.y,
                        type: 'future',
                        selected: false,
                        date,
                        events: this.getEventsByDate(date)
                    });
                }
                const month = [];
                let week = [];
                for (let i = 0; i < data.length; i++) {
                    week.push(data[i]);
                    if (i % 7 === 6) {
                        month.push(week);
                        week = [];
                    }
                }
                this.selectedDate = {...this.selectedDate, m, y};
                return month;
            },
            toAdd(add) {
                let {m, y} = this.selectedDate;
                m = parseInt(m) + add;
                if (m >= 12) {
                    y += 1;
                    m = 0;
                } else if (m < 0) {
                    y -= 1;
                    m = 11;
                }
                this.data = this.createDay(y, m, 1);
            },
            getEventsByDate(date) {
                const data = [];
                for (const e of this.mainEvents) {
                    if (date === e.date) {
                        data.push(e);
                    }
                }
                return data;
            },
            getFormatDate(date) {
                return date.map(this.formatZero).join('-')
            },
            formatZero(value) {
                if (parseInt(value, 10) < 10) {
                    value = '0' + value;
                }
                return value;
            },
            getDraggable(event) {
                let target = event.target;
                while (target) {
                    if (target.classList.contains('va-draggable')) {
                        break;
                    }
                    target = target.parentNode;
                }
                return target;
            },
            isEventExited(ne, events) {
                let isExited = false;
                for (const e of events) {
                    if (e.title === ne.title && e.date === ne.date) {
                        isExited = true;
                        break;
                    }
                }
                return isExited;
            },
            getPointByWindow(event) {
                const rect = this.gridElem.getBoundingClientRect();
                const pX = event.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft);
                const pY = event.pageY - (document.body.scrollTop || document.documentElement.scrollTop);
                const {width, height} = this.getItemSize();

                const col = Math.ceil((pX - rect.left) / width) - 1;
                const row = Math.ceil((pY - rect.top) / height) - 1;
                this.point.col = col;
                this.point.row = row;
            },
            getPoint(event) {
                const touch = event.changedTouches ? event.changedTouches[0] : event;
                return {
                    pageX: touch.pageX,
                    pageY: touch.pageY
                }
            },
            getItemSize() {
                const td = this.gridElem.querySelector('.va-day');
                let width = 0, height = 0;
                if (td) {
                    width = td.offsetWidth;
                    height = td.offsetHeight;
                }
                return {width, height};
            },
            touchstart(event) {
                this.dragElem = this.getDraggable(event);
                if (!this.dragElem) {
                    return;
                }
                this.isDragging = true;
                const rect = this.dragElem.getBoundingClientRect();
                this.target = this.dragElem.cloneNode(true);
                this.dragStyle = {
                    top: rect.top,
                    left: rect.left
                };
                this.dragItem.appendChild(this.target);
                this.dragElem.style.visibility = 'hidden';
                const touch = this.getPoint(event);
                this.touch = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                this.documentTouchmoveListener = listen(document.body, 'mousemove', this.touchmove);
                this.documentTouchendListener = listen(document.body, 'mouseup', this.touchend);
            },
            touchmove(event) {
                if (this.isDragging) {
                    event.preventDefault();
                    this.getPointByWindow(event);
                    const touch = this.getPoint(event);
                    this.dragStyle = {
                        top: this.dragStyle.top + touch.pageY - this.touch.y,
                        left: this.dragStyle.left + touch.pageX - this.touch.x
                    };
                    this.touch = {
                        x: touch.pageX,
                        y: touch.pageY
                    };
                }
            },
            touchend(event) {
                this.isDragging = false;
                const ne = {
                    date: this.data[this.point.row][this.point.col].date,
                    title: 'use Vary Admin',
                    time: '5.00p'
                };
                if (!this.isEventExited(ne, this.mainEvents)) {
                    this.mainEvents.push(ne);
                }
                this.point = {
                    row: -1,
                    col: -1
                };
                this.data = this.createDay(this.selectedDate.y, this.selectedDate.m);
                this.dragItem.removeChild(this.target);
                this.target = null;
                this.dragElem.style.visibility = 'visible';
                if (this.documentTouchmoveListener) {
                    this.documentTouchmoveListener();
                    this.documentTouchmoveListener = null;
                }
                if (this.documentTouchendListener) {
                    this.documentTouchendListener();
                    this.documentTouchendListener = null;
                }
            }
        },
        created() {
            const locale = {
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May',
                    'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            };
            const locale_cn = {
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            };
            this.selectLocale = this.lang.toLowerCase() === 'cn' ? locale_cn : locale;
            this.week = this.selectLocale.dayNamesShort;
            if (this.firstDayOfWeek === 1) {
                this.week.unshift(this.week[this.week.length - 1]);
                this.week.pop();
            }
            this.mainEvents = [...this.events];
        },
        mounted() {
            const date = new Date();
            this.dragItem = this.$refs.drag;
            this.gridElem = this.$refs.grid;
            this.selectedDate.d = date.getDate();
            this.data = this.createDay(date.getFullYear(), date.getMonth());
        }
    }
</script>

<style lang="less">
    @import "calendar";
</style>