<template>
    <div :style="style" :class="styleClass" ref="ca"></div>
</template>

<script>
    import jQuery from 'jquery';
    import 'fullcalendar';

    const prefixCls = 'va-fullcalendar';

    export default {
        name: 'VaFullcalendar',
        props: {
            events: {
                type: Array,
                default() {
                    return []
                }
            },
            header: {
                type: [Object, String],
                default() {
                    return {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    }
                }
            },
            rtl: {
                type: Boolean
            },
            weekends: {
                type: Boolean,
                default: true
            },
            hiddenDays: {
                type: Array
            },
            fixedWeekCount: {
                type: Boolean
            },
            weekNumbers: {
                type: Boolean
            },
            businessHours: {
                type: [String]
            },
            height: {
                type: [String, Number]
            },
            contentHeight: {
                type: [String, Number]
            },
            aspectRatio: {
                type: Number,
                default: 1.35
            },
            eventLimit: {
                type: [Number]
            },
            defaultDate: {
                type: [String]
            },
            editable: {
                type: Boolean,
                default: true
            },
            droppable: {
                type: Boolean,
                default: true
            },
            selectable: {
                type: Boolean,
                default: true
            },
            eventStartEditable: {
                type: Boolean,
                default: true
            },
            eventDurationEditable: {
                type: Boolean,
                default: true
            },
            defaultView: {
                type: String,
                default: 'month'
            },
            allDaySlot: {
                type: Boolean,
                default: true
            },
            allDayText: {
                type: String,
                default: 'all-day'
            },
            slotDuration: {
                type: String,
                default: '00:30:00'
            },
            slotLabelInterval: {
                type: [String]
            },
            snapDuration: {
                type: [String]
            },
            scrollTime: {
                type: String,
                default: '06:00:00'
            },
            minTime: {
                type: String,
                default: '00:00:00'
            },
            maxTime: {
                type: String,
                default: '24:00:00'
            },
            slotEventOverlap: {
                type: Boolean,
                default: true
            },
            nowIndicator: {
                type: Boolean
            },
            dragRevertDuration: {
                type: Number,
                default: 500
            },
            dragOpacity: {
                type: Number,
                default: 0.75
            },
            dragScroll: {
                type: Boolean,
                default: true
            },
            eventOverlap: {
                type: Boolean,
                default: true
            },
            eventConstraint: {
                type: Boolean
            },
            locale: {
                type: String
            },
            timezone: {
                type: [Boolean, String],
                default: false
            },
            timeFormat: {
                type: String,
                default: 'HH:mm'
            },
            eventRender: {
                type: Function
            },
            dayRender: {
                type: Function
            },
            navLinks: {
                type: Boolean
            },
            options: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        data() {
            return {
                config: {},
                schedule: null
            }
        },
        computed: {
            style() {
                return {}
            },
            styleClass() {
                return [
                    prefixCls
                ]
            }
        },
        methods: {
            initConfig() {
                this.config = {
                    theme: true,
                    header: this.header,
                    isRTL: this.rtl,
                    weekends: this.weekends,
                    hiddenDays: this.hiddenDays,
                    fixedWeekCount: this.fixedWeekCount,
                    weekNumbers: this.weekNumbers,
                    businessHours: this.businessHours,
                    height: this.height,
                    contentHeight: this.contentHeight,
                    aspectRatio: this.aspectRatio,
                    eventLimit: this.eventLimit,
                    defaultDate: this.defaultDate,
                    locale: this.locale,
                    timezone: this.timezone,
                    timeFormat: this.timeFormat,
                    editable: this.editable,
                    droppable: this.droppable,
                    eventStartEditable: this.eventStartEditable,
                    eventDurationEditable: this.eventDurationEditable,
                    defaultView: this.defaultView,
                    allDaySlot: this.allDaySlot,
                    allDayText: this.allDayText,
                    slotDuration: this.slotDuration,
                    slotLabelInterval: this.slotLabelInterval,
                    snapDuration: this.snapDuration,
                    scrollTime: this.scrollTime,
                    minTime: this.minTime,
                    maxTime: this.maxTime,
                    slotEventOverlap: this.slotEventOverlap,
                    nowIndicator: this.nowIndicator,
                    dragRevertDuration: this.dragRevertDuration,
                    dragOpacity: this.dragOpacity,
                    dragScroll: this.dragScroll,
                    eventOverlap: this.eventOverlap,
                    //eventConstraint: this.eventConstraint,
                    eventRender: this.eventRender,
                    dayRender: this.dayRender,
                    navLinks: this.navLinks,
                    dayClick: (date, jsEvent, view) => {
                        this.$emit('on-day-click', {
                            'date': date,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    drop: (date, jsEvent, ui, resourceId) => {
                        this.$emit('on-drop', {
                            'date': date,
                            'jsEvent': jsEvent,
                            'ui': ui,
                            'resourceId': resourceId
                        });
                    },
                    eventClick: (calEvent, jsEvent, view) => {
                        this.$emit('on-event-click', {
                            'calEvent': calEvent,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventMouseover: (calEvent, jsEvent, view) => {
                        this.$emit('on-event-mouseover', {
                            'calEvent': calEvent,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventMouseout: (calEvent, jsEvent, view) => {
                        this.$emit('on-event-mouseout', {
                            'calEvent': calEvent,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventDragStart: (event, jsEvent, ui, view) => {
                        this.$emit('on-event-dragstart', {
                            'event': event,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventDragStop: (event, jsEvent, ui, view) => {
                        this.$emit('on-event-dragstop', {
                            'event': event,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                        this._updateEvent(event);

                        this.$emit('on-event-drop', {
                            'event': event,
                            'delta': delta,
                            'revertFunc': revertFunc,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventResizeStart: (event, jsEvent, ui, view) => {
                        this.$emit('on-event-resize-start', {
                            'event': event,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventResizeStop: (event, jsEvent, ui, view) => {
                        this.$emit('on-event-resize-stop', {
                            'event': event,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                        this._updateEvent(event);

                        this.$emit('on-event-resize', {
                            'event': event,
                            'delta': delta,
                            'revertFunc': revertFunc,
                            'jsEvent': jsEvent,
                            'view': view
                        });
                    },
                    viewRender: (view, element) => {
                        this.$emit('on-view-render', {
                            'view': view,
                            'element': element
                        });
                    },
                    viewDestroy: (view, element) => {
                        this.$emit('on-view-destroy', {
                            'view': view,
                            'element': element
                        });
                    },
                    navLinkDayClick: (weekStart, jsEvent) => {
                        this.$emit('on-navlink-day-click', {
                            'weekStart': weekStart,
                            'event': jsEvent
                        });
                    },
                    navLinkWeekClick: (weekStart, jsEvent) => {
                        this.$emit('on-navlink-week-click', {
                            'weekStart': weekStart,
                            'event': jsEvent
                        });
                    }
                };

                if (this.options) {
                    for (let prop in this.options) {
                        if (this.options.hasOwnProperty(prop)) {
                            this.config[prop] = this.options[prop];
                        }
                    }
                }
            },
            initialize() {
                this.schedule = jQuery(this.$refs.ca);
                this.schedule.fullCalendar(this.config);
                this.addEvents(this.events);
            },

            addEvents(events) {
                if (events) {
                    this.schedule.fullCalendar('removeEvents');
                    this.schedule.fullCalendar('addEventSource', events);
                }
            },

            gotoDate(date) {
                this.schedule.fullCalendar('gotoDate', date);
            },

            prev() {
                this.schedule.fullCalendar('prev');
            },

            next() {
                this.schedule.fullCalendar('next');
            },

            prevYear() {
                this.schedule.fullCalendar('prevYear');
            },

            nextYear() {
                this.schedule.fullCalendar('nextYear');
            },

            today() {
                this.schedule.fullCalendar('today');
            },

            incrementDate(duration) {
                this.schedule.fullCalendar('incrementDate', duration);
            },

            changeView(viewName) {
                this.schedule.fullCalendar('changeView', viewName);
            },

            getDate() {
                return this.schedule.fullCalendar('getDate');
            },

            updateEvent(event) {
                if (Array.isArray(event)) {
                    this.schedule.fullCalendar('updateEvents', event);
                } else {
                    this.schedule.fullCalendar('updateEvent', event);
                }
            },

            renderEvent(event) {
                if (Array.isArray(event)) {
                    this.schedule.fullCalendar('renderEvents', event);
                } else {
                    this.schedule.fullCalendar('renderEvent', event);
                }
            },

            _findEvent(id) {
                let event;
                if (this.events) {
                    for (let e of this.events) {
                        if (e.id === id) {
                            event = e;
                            break;
                        }
                    }
                }
                return event;
            },

            _updateEvent(event) {
                let sourceEvent = this._findEvent(event.id);
                if (sourceEvent) {
                    sourceEvent.start = event.start.format();
                    if (event.end) {
                        sourceEvent.end = event.end.format();
                    }
                }
            }
        },
        watch: {
            events: {
                deep: true,
                handler(val) {
                    this.addEvents(val);
                }
            }
        },
        created() {
            this.initConfig();
        },
        mounted() {
            this.initialize();
        },
        beforeDestroy() {
            jQuery(this.$refs.ca).fullCalendar('destroy');
            this.schedule = null;
        }
    }
</script>