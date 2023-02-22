<script setup>
// import { ref } from 'vue';
// let quantity=ref(3)

const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  tourId: {
    type: Number,
    required: true,
  },
});

// console.log(props.tourId)
const emit = defineEmits(["eventEmit"]);
const onChange = (e) => {
  // console.log("child", Number(e.target.value), props.tourId);
  emit("eventEmit", {quantity:Number(e.target.value),tourId:props.tourId});
};
</script>

<template>

  <select v-model="props.quantity" @change="onChange">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
</template>
