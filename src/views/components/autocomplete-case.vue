<template>
    <div class="va-page-box">
        <va-row>
            <va-col :lg="6">
                <va-card>
                    <va-autocomplete :data="this.suggestions"></va-autocomplete>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>
    const prefixCls = 'va-autocomplete-case';

    export default {
        name: 'va-autocomplete-case',
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