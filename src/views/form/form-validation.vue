<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="General Form">
          <va-form
            ref="formRef"
            :rules="rules"
            :group="form"
            inline
            @submit.native.prevent
          >
            <va-form-item label-width="80px" name="name" label="Name">
              <va-input placeholder="name" v-model="form.name" border></va-input>
            </va-form-item>
            <va-form-item label-width="80px" name="phone" label="Phone">
              <va-input placeholder="phone" v-model="form.phone" border></va-input>
            </va-form-item>
            <va-form-item label-width="80px" name="email" label="Email">
              <va-input placeholder="email" v-model="form.email" border></va-input>
            </va-form-item>
            <va-form-item>
              <va-button @click="handleSubmit('form')" theme="primary">
                Submit
              </va-button>
            </va-form-item>
          </va-form>
        </va-card>
        <va-card header="Range Validation" class="m-t-20">
          <va-form
            ref="rangeFormRef"
            :rules="rangeRules"
            :group="rangeForm"
            inline
            @submit.native.prevent
          >
            <va-form-item name="minLen">
              <va-input
                placeholder="Min 6 chars"
                v-model="rangeForm.minLen"
                border
              ></va-input>
            </va-form-item>
            <va-form-item name="maxLen">
              <va-input
                placeholder="Max 6 chars"
                v-model="rangeForm.maxLen"
                border
              ></va-input>
            </va-form-item>
            <va-form-item name="minValue">
              <va-input
                placeholder="Min value is 6"
                v-model="rangeForm.minValue"
                border
              ></va-input>
            </va-form-item>
            <va-form-item name="maxValue">
              <va-input
                placeholder="Max value is 6"
                v-model="rangeForm.maxValue"
                border
              ></va-input>
            </va-form-item>
            <va-form-item>
              <va-button @click="handleSubmit('rangeForm')" theme="primary">
                Submit
              </va-button>
            </va-form-item>
          </va-form>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Validation Type">
          <va-form
            ref="typeFormRef"
            :rules="typeRules"
            :group="typeForm"
            inline
            @submit.native.prevent
          >
            <va-form-item label-width="80px" name="name" label="Name">
              <va-input placeholder="name" v-model="typeForm.name" border></va-input>
            </va-form-item>
            <va-form-item label-width="80px" name="phone" label="Phone">
              <va-input placeholder="phone" v-model="typeForm.phone" border></va-input>
            </va-form-item>
            <va-form-item label-width="80px" name="email" label="Email">
              <va-input placeholder="email" v-model="typeForm.email" border></va-input>
            </va-form-item>
            <va-form-item label-width="80px" name="url" label="Url">
              <va-input placeholder="url" v-model="typeForm.url" border></va-input>
            </va-form-item>
            <va-form-item>
              <va-button @click="handleSubmit('typeForm')" theme="primary">
                Submit
              </va-button>
            </va-form-item>
          </va-form>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const formRef = ref();
const rangeFormRef = ref();
const typeFormRef = ref();

const form = reactive({
  name: "",
  phone: "",
  email: "",
});

const rules = {
  name: [{ type: "string", required: true }],
  phone: [
    { required: true },
    {
      type: "number",
      transform(value) {
        return +value;
      },
    },
    //                        {
    //                            validator(rule, value, callback, source, options) {
    //                                const errors = [];
    //                                if (isNaN(+value)) {
    //                                    errors.push(new Error('Must be a number'));
    //                                }
    //                                callback(errors);
    //                            }
    //                        }
  ],
  email: [{ required: true }, { type: "email", message: "Must be valid email!" }],
};

const typeForm = reactive({
  name: "",
  phone: "",
  email: "",
  url: "",
});

const typeRules = {
  name: [{ type: "string", required: true }],
  phone: [
    { required: true },
    {
      type: "number",
      transform(value) {
        return +value;
      },
    },
  ],
  email: [{ required: true }, { type: "email", message: "Must be valid email!" }],
  url: [{ type: "url", required: true }],
};
const rangeForm = reactive({
  minLen: "",
  maxLen: "",
  minValue: "",
  maxValue: "",
});
const rangeRules = {
  minLen: [
    { required: true },
    {
      validator(rule, value, callback, source, options) {
        const errors = [];
        if (value.length < 6) {
          errors.push(
            new Error("This value is too short. It should have 6 characters or more.")
          );
        }
        callback(errors);
      },
    },
  ],
  maxLen: [
    { required: true },
    {
      validator(rule, value, callback, source, options) {
        const errors = [];
        if (value.length > 6) {
          errors.push(
            new Error("This value is too long. It should have 6 characters or fewer.")
          );
        }
        callback(errors);
      },
    },
  ],
  minValue: [
    { required: true },
    {
      validator(rule, value, callback, source, options) {
        const errors = [];
        if (+value < 6) {
          errors.push(new Error("This value should be greater than or equal to 6."));
        }
        callback(errors);
      },
    },
  ],
  maxValue: [
    { required: true },
    {
      validator(rule, value, callback, source, options) {
        const errors = [];
        if (+value > 6) {
          errors.push(new Error("This value should be lower than or equal to 6."));
        }
        callback(errors);
      },
    },
  ],
};
const prefixCls = "va-form-validation";

function handleSubmit(formName) {
  const validate = {
    form() {
      formRef.value.validate((valid) => {});
    },
    rangeForm() {
      rangeFormRef.value.validate((valid) => {});
    },
    typeForm() {
      typeFormRef.value.validate((valid) => {});
    },
  };
}
// export default {
//   name: "va-form-validation",
//   data() {
//     return {
//       form: {
//         name: "",
//         phone: "",
//         email: "",
//       },
//       rules: {
//         name: [{ type: "string", required: true }],
//         phone: [
//           { required: true },
//           {
//             type: "number",
//             transform(value) {
//               return +value;
//             },
//           },
//           //                        {
//           //                            validator(rule, value, callback, source, options) {
//           //                                const errors = [];
//           //                                if (isNaN(+value)) {
//           //                                    errors.push(new Error('Must be a number'));
//           //                                }
//           //                                callback(errors);
//           //                            }
//           //                        }
//         ],
//         email: [{ required: true }, { type: "email", message: "Must be valid email!" }],
//       },
//       typeForm: {
//         name: "",
//         phone: "",
//         email: "",
//         url: "",
//       },
//       typeRules: {
//         name: [{ type: "string", required: true }],
//         phone: [
//           { required: true },
//           {
//             type: "number",
//             transform(value) {
//               return +value;
//             },
//           },
//         ],
//         email: [{ required: true }, { type: "email", message: "Must be valid email!" }],
//         url: [{ type: "url", required: true }],
//       },
//       rangeForm: {
//         minLen: "",
//         maxLen: "",
//         minValue: "",
//         maxValue: "",
//       },
//       rangeRules: {
//         minLen: [
//           { required: true },
//           {
//             validator(rule, value, callback, source, options) {
//               const errors = [];
//               if (value.length < 6) {
//                 errors.push(
//                   new Error(
//                     "This value is too short. It should have 6 characters or more."
//                   )
//                 );
//               }
//               callback(errors);
//             },
//           },
//         ],
//         maxLen: [
//           { required: true },
//           {
//             validator(rule, value, callback, source, options) {
//               const errors = [];
//               if (value.length > 6) {
//                 errors.push(
//                   new Error(
//                     "This value is too long. It should have 6 characters or fewer."
//                   )
//                 );
//               }
//               callback(errors);
//             },
//           },
//         ],
//         minValue: [
//           { required: true },
//           {
//             validator(rule, value, callback, source, options) {
//               const errors = [];
//               if (+value < 6) {
//                 errors.push(
//                   new Error("This value should be greater than or equal to 6.")
//                 );
//               }
//               callback(errors);
//             },
//           },
//         ],
//         maxValue: [
//           { required: true },
//           {
//             validator(rule, value, callback, source, options) {
//               const errors = [];
//               if (+value > 6) {
//                 errors.push(new Error("This value should be lower than or equal to 6."));
//               }
//               callback(errors);
//             },
//           },
//         ],
//       },
//     };
//   },
//   methods: {
//     handleSubmit(formName) {
//       this.$refs[formName].validate((valid) => {});
//     },
//   },
// };
</script>
