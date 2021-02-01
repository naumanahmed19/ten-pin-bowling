<template>
  <div
    class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-indigo-400"
  >
    <span class="inline-block align-middle mr-8">
      <b class="capitalize">{{ title }}: </b>
      {{ message }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>