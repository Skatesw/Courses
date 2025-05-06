<script setup>
import { ref, provide, watch, onMounted } from "vue";

import mockData from './mock-json.js';

import Header from "./components/Header.vue";
import Courses from "./components/courses.vue";

import Drawer from "./components/drawer.vue";
import Drawerminimised from "./components/drawerminimised.vue";
import Archive from "./components/archive.vue";
import Calendar from "./components/calendar.vue";
import Request from "./components/course_request_to_create.vue";


// Состояние приложения
const isDrawerOpen = ref(false);
const isEditingGlobal = ref(false);
const activeTab = ref('courses');// состояние активной вкладки
const archivedCourses = ref([]); // Хранилище архивированных курсов


const coursesData = ref(mockData.coursesBlock); // Инициализация данных курсов
const calendarData = ref(mockData.calendarBlock); // Инициализация данных календаря


// Функция для добавления курса
const addCourse = (newCourse) => {
  coursesData.value.courses.push({
    ...newCourse,
    course_id: Date.now().toString()
  });
};



// Функции управления состоянием
const toggleGlobalEditing = () => {
  isEditingGlobal.value = !isEditingGlobal.value;
};


const changeTab = (tab) => {
  activeTab.value = tab;
};



// Работа с архивом
const loadArchivedCourses = () => {
  const saved = localStorage.getItem('archivedCourses');
  if (saved) archivedCourses.value = JSON.parse(saved);
};

const saveArchivedCourses = () => {
  localStorage.setItem('archivedCourses', JSON.stringify(archivedCourses.value));
};

const archiveCourse = (course) => {
  // Удаляем курс из основного списка
  coursesData.value.courses = coursesData.value.courses.filter(c => c.course_id !== course.course_id);

  // Добавляем курс в архив
  archivedCourses.value.push({
    ...course,
    archivedAt: new Date().toISOString() // Добавляем метку времени архивации
  });

  saveArchivedCourses();
};

const restoreCourse = (courseId) => {
  const course = archivedCourses.value.find(c => c.course_id === courseId);
  if (course) {
    coursesData.value.courses.push(course);

    archivedCourses.value = archivedCourses.value.filter(c => c.course_id !== courseId);

    saveArchivedCourses();
  }
};

// Инициализация и наблюдение
loadArchivedCourses();
watch(archivedCourses, saveArchivedCourses, { deep: true });

// Предоставление данных компонентам
provide("isEditingGlobal", isEditingGlobal);
provide("archiveCourse", archiveCourse);
provide("restoreCourse", restoreCourse);
provide("archivedCourses", archivedCourses);

provide("activeTab", activeTab);
provide("changeTab", changeTab);

provide("coursesData", coursesData);
provide("addCourse", addCourse);

</script>

<template>
  <div @mouseenter="isDrawerOpen = true" @mouseleave="isDrawerOpen = false">
    <Drawer v-if="isDrawerOpen" @tab-change="changeTab" />
    <Drawerminimised v-if="!isDrawerOpen" @tab-change="changeTab" />
  </div>

  <div class=" border-gray-500">
    <Header />
  </div>

  <div>
<!--
    <div class="flex justify-between w-2/3 m-auto mt-5">

          <button
            @click="toggleGlobalEditing"
            class="px-4 py-2 hover:-translate-y-0.5 hover:-translate-x-0.5 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition cursor-pointer">
            {{ isEditingGlobal ? 'Завершить редактирование' : 'Редактировать' }}
          </button>

    </div>
-->
      <Courses v-if="activeTab === 'courses'" :data="coursesData" @archive-course="archiveCourse" />

      <Archive v-else-if="activeTab === 'archive'" />
      <Calendar v-else-if="activeTab === 'calendar'" :data="calendarData" />
      <Request v-else-if="activeTab === 'request'" />




  </div>
</template>



<style scoped></style>
