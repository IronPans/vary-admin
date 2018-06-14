<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="12">
                <va-card header="Form">
                    <div class="form-group row">
                        <label class="col-3">Normal</label>
                        <va-input :border="true" class="col-9 form-control"></va-input>
                    </div>
                    <div class="form-group row">
                        <label class="col-3">Placeholder</label>
                        <va-input placeholder="placeholder" :border="true" class="col-9 form-control"></va-input>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Disabled</label>
                        <va-input placeholder="Disabled" :disabled="true" :border="true"
                                  class="col-9 form-control"></va-input>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Checkboxs</label>
                        <div class="col-9">
                            <div v-for="(item, index) in items" :key="index.toString()">
                                <va-checkbox @on-change="handleChange" v-model="checkValue"
                                             :input-value="item.value">
                                    {{item.label}}
                                </va-checkbox>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Radios</label>
                        <div class="col-9">
                            <div v-for="(item, index) in items" :key="index.toString()">
                                <va-radio v-model="radioValue" name="sex" :value="item.value">
                                    {{item.label}}
                                </va-radio>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Slider</label>
                        <div class="col-3">
                            <va-slider></va-slider>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Select</label>
                        <div class="col-9">
                            <va-select placeholder="select" :options="items"></va-select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Rate</label>
                        <div class="col-9">
                            <va-rate :hover="true"></va-rate>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">DatePicker</label>
                        <div class="col-9">
                            <va-date-picker></va-date-picker>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">InputNumber</label>
                        <div class="col-9">
                            <va-input-number></va-input-number>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Input Groups</label>
                        <div class="col-9">
                            <va-input :border="true" class="form-control">
                                <va-icon icon="home" slot="startSlot"></va-icon>
                            </va-input>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3">Upload Files</label>
                        <div class="col-9">
                            <va-upload></va-upload>
                        </div>
                    </div>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-forms';

    export default {
        name: 'va-forms',
        data() {
            return {
                items: [
                    {
                        value: 'Movie',
                        label: 'Movie'
                    }, {
                        value: 'Food',
                        label: 'Food'
                    }, {
                        value: 'Game',
                        label: 'Game'
                    }
                ],
                radioValue: 'Food',
                checkValue: ['Food']
            }
        },
        methods: {
            handleChange(e) {
                console.log(e);
            }
        }
    }
</script>

<style>

</style>