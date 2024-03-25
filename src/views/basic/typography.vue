<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Headings">
          <h1>This is a Heading 1</h1>
          <h2>This is a Heading 2</h2>
          <h3>This is a Heading 3</h3>
          <h4>This is a Heading 4</h4>
          <h5>This is a Heading 5</h5>
          <h6>This is a Heading 6</h6>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Text elements">
          <del>This line of text is meant to be treated as deleted text.</del>
          <br />
          <ins
            >This line of text is meant to be treated as an addition to the document.</ins
          >
          <br />
          <strong>rendered as bold text</strong> <br />
          <em>rendered as italicized text</em>
        </va-card>
        <va-card header="Transformation classes" class="m-t-20">
          <div class="text-uppercase">UPPERCASED TEXT.</div>
          <div class="text-lowercase">lowercased text.</div>
          <div class="text-capitalize">Capitalized Text.</div>
        </va-card>
      </va-col>
      <va-col :lg="6" class="m-t-20">
        <va-card header="Alignment classes">
          <div class="text-left">Left aligned text.</div>
          <div class="text-center">Center aligned text.</div>
          <div class="text-right">Right aligned text.</div>
          <div class="text-justify">Justified text.</div>
        </va-card>
      </va-col>
      <va-col :lg="6" class="m-t-20">
        <va-card header="Basic Blockquote">
          <blockquote>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
              erat a ante.
            </p>
            <small>Someone famous <cite>Source Title</cite></small>
          </blockquote>
          <blockquote class="blockquote-reverse">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
              erat a ante.
            </p>
            <small>Someone famous <cite>Source Title</cite></small>
          </blockquote>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
// const prefixCls = 'va-typography';

// export default {
//     name: 'va-typography'
// }
</script>
