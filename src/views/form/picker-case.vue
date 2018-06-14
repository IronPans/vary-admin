<template>
    <div class="va-page-box">
        <va-row :gutter="16">
            <va-col :lg="4">
                <va-card header="Autocomplete">
                    <va-autocomplete :data="this.suggestions" placeholder="name"></va-autocomplete>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card header="ColorPicker">
                    <va-color-picker :show-input="true"></va-color-picker>
                </va-card>
            </va-col>
            <va-col :lg="4">
                <va-card header="DatePicker">
                    <va-date-picker></va-date-picker>
                </va-card>
            </va-col>
        </va-row>
        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="4">
                <va-card header="TimePicker">
                    <va-date-picker :time-only="true"></va-date-picker>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-picker-case';

    export default {
        name: 'va-picker-case',
        data() {
            return {
                suggestions: [
                    { label: 'Afghanistan' },
                    { label: 'Aland Islands' },
                    { label: 'Albania' },
                    { label: 'Algeria' },
                    { label: 'American Samoa' },
                    { label: 'Andorra' },
                    { label: 'Angola' },
                    { label: 'Anguilla' },
                    { label: 'Antarctica' },
                    { label: 'Antigua and Barbuda' },
                    { label: 'Argentina' },
                    { label: 'Armenia' },
                    { label: 'Aruba' },
                    { label: 'Australia' },
                    { label: 'Austria' },
                    { label: 'Azerbaijan' },
                    { label: 'Bahamas' },
                    { label: 'Bahrain' },
                    { label: 'Bangladesh' },
                    { label: 'Barbados' },
                    { label: 'Belarus' },
                    { label: 'Belgium' },
                    { label: 'Belize' },
                    { label: 'Benin' },
                    { label: 'Bermuda' },
                    { label: 'Bhutan' },
                    { label: 'Bolivia, Plurinational State of' },
                    { label: 'Bonaire, Sint Eustatius and Saba' },
                    { label: 'Bosnia and Herzegovina' },
                    { label: 'Botswana' },
                    { label: 'Bouvet Island' },
                    { label: 'Brazil' },
                    { label: 'British Indian Ocean Territory' },
                    { label: 'Brunei Darussalam' },
                ]
            }
        }
    }
</script>