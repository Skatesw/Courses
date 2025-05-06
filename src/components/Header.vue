
<template>
  <header class="flex justify-between items-center w-2/3 m-auto mt-10">
    <div>
      <h1 class="text-2xl font-bold text-gray-800 mb-6 mr-10 ">Мои курсы</h1>
      <h2 class="text-xl text-gray-700 mb-6 mr-10">Обзор курсов</h2>

    </div>

    <div class="flex items-center gap-10 pb-10">

      <select class="border border-gray-300 rounded-xl p-2 bg-white">
       <option disabled selected>Преподаватель</option>
        <option>О пользователе</option>
        <option>Личные файлы / Оценки</option>
        <option>Сообщения</option>
        <option>Настройки</option>
        <option>Выход</option>
      </select>

      <img
        class="w-15 rounded-full border border-grey-300"
        src="/blankprofpic.png"
        alt="userphoto"
      />
    </div>
  </header>
</template>



<style scoped>
::v-deep(.my-custom-select .vs__dropdown-toggle) {
  border-radius: var(--radius-xl);
  border-color: var(--color-white);
  background-color: var(--color-white);
  padding: calc(var(--spacing) * 4);
  padding-left: calc(var(--spacing) * 5);
  height: 40px !important; /* Высота */
  display: flex !important;
  align-items: center !important;
  box-shadow: none !important;
  font-size: 14px !important;
  cursor: pointer;
  font-family: "Arial", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 500;
  text-wrap: pretty;
  text-align: justify;
  white-space: normal;
}

::v-deep(.my-custom-select .vs__clear) {
  display: none !important;
}

::v-deep(.vs__selected) {
  position: relative;
}

::v-deep(.my-custom-select .vs__search) {
  display: none !important;
}

::v-deep(.my-custom-select .vs__open-indicator) {
  display: none !important;
}

::v-deep(.my-custom-select .vs__dropdown-toggle::after) {
  content: "";
  position: absolute !important;
  top: calc(var(--spacing) * 3);
  left: calc(var(--spacing) * 2);
  top: 55% !important;
  transform: translateY(-50%);
  padding-left: calc(var(--spacing) * 4);
  width: 11px;
  height: 11px;
  background-size: contain;
  background: url("/Icon2.png") no-repeat center center !important;
  cursor: pointer;
}
</style>


