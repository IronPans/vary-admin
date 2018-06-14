<template>
    <div class="va-page-box">
        <va-row>
            <va-col :lg="12">
                <va-card header="Default Button">
                    <va-button size="lg">Default
                        <va-ripple></va-ripple>
                    </va-button>
                    <va-button theme="primary" size="lg">Primary</va-button>
                    <va-button theme="info" size="lg">Info</va-button>
                    <va-button theme="success" size="lg">Success</va-button>
                    <va-button theme="warning" size="lg">Warning</va-button>
                    <va-button theme="danger" size="lg">Danger</va-button>
                </va-card>
            </va-col>
        </va-row>
        <va-row class="m-t-20">
            <va-col :lg="12">
                <va-card header="Flat Button">
                    <va-button size="lg" :flat="true">Default</va-button>
                    <va-button theme="primary" size="lg" :flat="true">Primary</va-button>
                    <va-button theme="info" size="lg" :flat="true">Info</va-button>
                    <va-button theme="success" size="lg" :flat="true">Success</va-button>
                    <va-button theme="warning" size="lg" :flat="true">Warning</va-button>
                    <va-button theme="danger" size="lg" :flat="true">Danger</va-button>
                </va-card>
            </va-col>
        </va-row>

        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Rounded Button">
                    <va-button :rounded="true" theme="primary" size="lg">Primary</va-button>
                    <va-button :rounded="true" theme="info" size="lg">Info</va-button>
                    <va-button :rounded="true" theme="success" size="lg">Success</va-button>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Button with icon">
                    <va-button theme="primary">
                        <va-icon icon="tag_faces"/>  Button
                    </va-button>

                    <va-button theme="primary" shape="circle">
                        <va-icon icon="tag_faces"/>
                    </va-button>
                </va-card>
            </va-col>
        </va-row>

        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Size">
                    <va-button theme="primary" size="lg">LARGE</va-button>
                    <va-button theme="primary">MEDIUM</va-button>
                    <va-button theme="primary" size="sm">SMALL</va-button>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Block Button">
                    <va-button theme="primary" :block="true">Block</va-button>
                </va-card>
            </va-col>
        </va-row>

        <va-row :gutter="16" class="m-t-20">
            <va-col :lg="6">
                <va-card header="Button Group">
                    <va-button-group>
                        <va-button theme="primary">Button</va-button>
                        <va-button theme="primary">Button</va-button>
                        <va-button theme="primary">Button</va-button>
                    </va-button-group>
                </va-card>
            </va-col>
            <va-col :lg="6">
                <va-card header="Disabled Button">
                    <va-button :disabled="true">Disabled</va-button>
                    <va-button theme="primary" :disabled="true">Disabled</va-button>
                </va-card>
            </va-col>
        </va-row>
    </div>
</template>

<script>

    const prefixCls = 'va-button-case';

    export default {
        name: 'va-button-case'
    }
</script>