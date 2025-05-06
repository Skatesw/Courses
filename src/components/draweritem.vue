<script setup>
const emit = defineEmits(['tab-change']);

const changeTab = (tab) => {
  emit('tab-change', tab);
};
</script>

<template>
    <div class="flex justify-self gap-5 items-center pt-20 opacity-50 hover:opacity-100 transition cursor-pointer"
         @click="changeTab('courses')">
      <img src="/un_icon2.png" alt="my courses"/>
      <p class="text-gray-700">Мои Курсы</p>
    </div>
    <div class="flex justify-self gap-5 items-center pt-20 opacity-50 hover:opacity-100 transition cursor-pointer"
         @click="changeTab('archive')">
      <img src="/archive_icon2.png" alt="archive"/>
      <p class="text-gray-700">Архив</p>
    </div>
    <div class="flex justify-self gap-5 items-center pt-20 opacity-50 hover:opacity-100 transition cursor-pointer"
         @click="changeTab('calendar')">
      <img src="/calendar_icon2.png" alt="calendar"/>
      <p class="text-gray-700">Календарь</p>
    </div>
    <div class="flex justify-self gap-5 items-center pt-20 opacity-50 hover:opacity-100 transition cursor-pointer"
         @click="changeTab('request')">
      <img src="/request_icon2.png" alt="request course"/>
      <p class="text-gray-700">Запрос на создание курса</p>
    </div>
</template>