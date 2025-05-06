<script setup>
import { ref, watch, computed } from "vue";
import DrawerItem from "./draweritem.vue"; // Компонент элемента бокового меню
import { inject } from 'vue';

// Определение событий компонента
const emit = defineEmits(['archive-course']);

// Определение props компонента
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      courses: [], // Массив курсов
      filters: {   // Фильтры для курсов
        year: [],         // Года
        direction: [],    // Направления
        form_of_study: [],// Формы обучения
        type: []          // Типы курсов
      }
    })
  }
});

// СОСТОЯНИЕ КОМПОНЕНТА

// Выбранные значения фильтров
const selectedYear = ref("Выберите год");
const selectedDirection = ref("Выберите направление");
const selectedFormOfStudy = ref("Выберите форму обучения");

// Поиск
const searchQuery = ref("");

// Глобальный режим редактирования
const isEditingGlobal = inject('isEditingGlobal');

// Текущий редактируемый курс
const editingCourse = ref(null);

// Данные редактируемого курса
const editedCourse = ref({});

// Флаг показа модального окна
const showModal = ref(false);

// ID курса для удаления
const courseToDelete = ref(null);

// Курс для архивирования
const courseToArchive = ref(null);

// Методы для перемещения курса в архив и возвращение из него
const archiveCourse = inject('archiveCourse');
const restoreCourse = inject('restoreCourse');

// Активная вкладка
const activeTab = ref('courses');

// Метод смены вкладки
const changeTab = inject('changeTab');

// Переключение вкладки
const switchTab = (tab) => {
  console.log('Переключаем на вкладку:', tab);
  activeTab.value = tab;
};

// Отфильтрованные курсы
const filteredCourses = ref(props.data.courses);



// ОСНОВНЫЕ ФУНКЦИИ

// Добавление нового курса
const addCourse = () => {
  const newCourse = {
    course_id: Date.now().toString(), // Уникальный ID
    subject: "",                      // Название курса
    course_type: "",                  // Тип курса
    course_description: "",           // Описание
    teacher_name: "",                 // Преподаватель
    year: "",                         // Год
    direction: "",                    // Направление
    group_number: "",                 // Номер группы
    form_of_study: "",                // Форма обучения
    isNew: true                       // Флаг нового курса
  };

  // Добавляем новый курс в массив
  props.data.courses.push(newCourse);

  // Устанавливаем его как редактируемый
  editingCourse.value = newCourse.course_id;

  // Копируем данные для редактирования
  editedCourse.value = { ...newCourse };

  // Применяем фильтры
  applyFilters();
};


// Фильтрация курсов
const applyFilters = () => {
  if (activeTab.value === 'courses') {
    filteredCourses.value = props.data.courses.filter((course) => {

      // Проверка = году
      const matchesYear =
        selectedYear.value === "Выберите год" ||
        selectedYear.value === "Все года" ||
        course.year === selectedYear.value;

      // Проверка = направлению
      const matchesDirection =
        selectedDirection.value === "Выберите направление" ||
        selectedDirection.value === "Все направления" ||
        course.direction.includes(selectedDirection.value);

      // Проверка = форме обучения
      const matchesFormOfStudy =
        selectedFormOfStudy.value === "Выберите форму обучения" ||
        selectedFormOfStudy.value === "Все формы обучения" ||
        course.form_of_study.includes(selectedFormOfStudy.value);

      // Проверка = поисковому запросу
      const matchesSearch =
        course.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.teacher_name.toLowerCase().includes(searchQuery.value.toLowerCase());

      // Курс проходит фильтрацию, если соответствует всем условиям
      return matchesYear && matchesDirection && matchesFormOfStudy && matchesSearch;
    });
  }
};

// Переключение глобального режима редактирования
const toggleGlobalEditing = () => {
  isEditingGlobal.value = !isEditingGlobal.value;

  // При выключении режима редактирования сбрасываем редактируемый курс
  if (!isEditingGlobal.value) {
    editingCourse.value = null;
  }
};

// Редактирования курса
const startEditing = (course) => {

  // Редактирование возможно только в глобальном режиме
  if (isEditingGlobal.value) {
    editingCourse.value = course.course_id;

    // Копируем данные курса для редактирования
    editedCourse.value = { ...course };
  }
};


// Сохранение изменений курса
const saveEditing = (courseId) => {

  // Находим индекс курса в массиве
  const index = props.data.courses.findIndex(c => c.course_id === courseId);
  if (index !== -1) {

    // Обновляем данные курса
    props.data.courses[index] = { ...editedCourse.value };
  }

  // Сбрасываем редактируемый курс
  editingCourse.value = null;

  // Применяем фильтры
  applyFilters();
};

// Отмена редактирования
const cancelEditing = () => {
  editingCourse.value = null;
};


// Загрузка архивированных курсов из localStorage
const loadArchivedCourses = () => {
  const saved = localStorage.getItem('archivedCourses');
  if (saved) archivedCourses.value = JSON.parse(saved);
};

// Сохранение архивированных курсов в localStorage
const saveArchivedCourses = () => {
  localStorage.setItem('archivedCourses', JSON.stringify(archivedCourses.value));
};

// Подтверждение архивирования курса
const confirmArchiveCourse = (course) => {
  courseToArchive.value = course;
  showModal.value = true;
};

// Обработка архивирования курса
const handleArchive = () => {
  if (courseToArchive.value) {

    // Удаляем курс из текущего списка
    const index = props.data.courses.findIndex(c => c.course_id === courseToArchive.value.course_id);
    if (index !== -1) {
      props.data.courses.splice(index, 1);
    }

    // Отправляем событие архивирования в родительский компонент
    emit('archive-course', courseToArchive.value);

    // Закрываем модальное окно
    showModal.value = false;

    // Сбрасываем курс для архивирования
    courseToArchive.value = null;

    // Обновляем отфильтрованный список
    applyFilters();
  }
};

// Удаление курса
const deleteCourse = () => {
  if (courseToDelete.value !== null) {

    // Находим и удаляем курс
    const index = props.data.courses.findIndex(c => c.course_id === courseToDelete.value);
    if (index !== -1) {
      props.data.courses.splice(index, 1);

      // Обновляем фильтры
      applyFilters();
    }
  }

  // Закрываем модальное окно
  showModal.value = false;

  // Сбрасываем курс для удаления
  courseToDelete.value = null;
};

// Подтверждение удаления курса
const confirmDeleteCourse = (courseId) => {
  courseToDelete.value = courseId;
  showModal.value = true;
};

// Следим за изменениями фильтров и применяем их
watch([selectedYear, selectedDirection, selectedFormOfStudy, searchQuery], applyFilters, { immediate: true });
</script>



<template>
<div class="relative flex flex-col w-full">

   <!-- Кнопка редактирования -->
    <div class="flex justify-between w-2/3 m-auto mt-5">
        <button
            @click="toggleGlobalEditing"
            class="px-4 py-2 hover:-translate-y-0.5 hover:-translate-x-0.5 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition cursor-pointer">
            {{ isEditingGlobal ? 'Завершить редактирование' : 'Редактировать' }}
         </button>
    </div>
    <div class="flex">

    <!-- Основное содержимое -->
    <div class="flex items-center justify-center gap-10 pb-10 ml-50 ">

      <!-- Вкладка "Мои Курсы" -->
      <div v-if="activeTab === 'courses'" class="p-10">
        <div class="flex items-center gap-5 pb-15 items-center ">

          <!-- Фильтры -->

          <select v-model="selectedYear" class="border border-gray-300 rounded-xl p-2 bg-white w-80">
            <option disabled value="Выберите год">Выберите год</option>
            <option v-for="year in props.data.filters.year"
            :key="year"
            :value="year">
              {{ year }}
            </option>
          </select>

          <select v-model="selectedDirection" class="border border-gray-300 rounded-xl p-2 bg-white w-80">
            <option disabled value="Выберите направление">Выберите направление</option>
            <option v-for="direction in props.data.filters.direction"
            :key="direction"
            :value="direction">
              {{ direction }}
            </option>
          </select>

          <select v-model="selectedFormOfStudy" class="border border-gray-300 rounded-xl p-2 bg-white w-80">
            <option disabled value="Выберите форму обучения">Выберите форму обучения</option>
            <option v-for="form in props.data.filters.form_of_study"
            :key="form"
            :value="form">
              {{ form }}
            </option>
          </select>

          <div class="border border-gray-300 rounded-xl bg-white">
            <div class="relative">
              <img class="absolute top-3 left-3" src="/search.png" alt="" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск..."
                class="bg-white p-2 pl-10 pr-4 rounded-xl focus:border-gray-300"
              />
            </div>
          </div>
        </div>

        <!-- Список курсов -->
        <div class="height-300px">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="course in filteredCourses"
              :key="course.course_id"
              class="relative mb-2 p-6 bg-white rounded-[1vw] shadow-2xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-3xl transition-all duration-300 border border-gray-100">

              <!-- Иконки управления -->
              <div v-if="isEditingGlobal && editingCourse !== course.course_id" class="absolute top-4 right-4 flex space-x-2">
                <img
                  src="/editing.png"
                  @click="startEditing(course)"
                  alt="edit_course"
                  class="cursor-pointer w-5 h-5 opacity-60 hover:opacity-100 transition"
                  title="Редактировать курс"/>
                <img
                  src="/archive_icon2.png"
                  @click="confirmArchiveCourse(course)"
                  alt="archive_course"
                  class="cursor-pointer w-5 h-5 opacity-60 hover:opacity-100 transition"
                  title="Архивировать курс"/>
                <img
                  src="/delete.png"
                  @click="confirmDeleteCourse(course.course_id)"
                  alt="delete_course"
                  class="cursor-pointer w-6 h-6 opacity-60 hover:opacity-100 transition"
                  title="Удалить курс"/>
              </div>


              <!-- Заголовок карточки курса -->
              <h2 class="absolute -top-5 left-6 px-3 py-2 border-1 border-black rounded-2xl bg-[url('/Rectangle.png')]">
                <template v-if="editingCourse === course.course_id">
                  <input v-model="editedCourse.subject"
                  class="bg-transparent border-b border-gray-300 focus:outline-none"/>
                </template>
                <template v-else>
                  {{ course.subject }}
                </template>
              </h2>


             <!-- Тип курса -->
              <div class="mt-1 mb-3">
                <template v-if="editingCourse === course.course_id">
                  <select
                      v-model="editedCourse.course_type"
                      class="border border-gray-300 rounded-xl p-2 bg-white w-full md:w-80 focus:outline-none focus:ring-2 focus:border-transparent transition-all">
                      <option value="Лекционный курс">Лекционный курс</option>
                      <option value="Практический курс">Практический курс</option>
                      <option value="Лабораторные занятия">Лабораторные занятия</option>
                      <option value="Семинар">Семинар</option>
                    </select>
                </template>
                <template v-else>
                  <span class="px-3 py-1 bg-gray-200 rounded-lg inline-block text-sm">
                    {{ course.type }}
                  </span>
                </template>
              </div>


              <!-- Редактирование курса -->
              <div class="mt-8">
                <template v-if="editingCourse === course.course_id">
                  <div class="space-y-4">
                    <input
                      v-model="editedCourse.subject"
                      placeholder="Название курса"
                      class="w-full p-2 border border-gray-300 rounded-lg">
                    <textarea
                      v-model="editedCourse.description"
                      placeholder="Описание курса"
                      class="w-full p-2 border border-gray-300 rounded-lg h-20">
                    </textarea>
                    <input
                      v-model="editedCourse.teacher"
                      placeholder="Преподаватель"
                      class="p-2 border border-gray-300 rounded-lg w-full">
                    <select
                      v-model="editedCourse.form_of_study"
                      class="border border-gray-300 rounded-xl p-2 bg-white w-full md:w-90 focus:outline-none focus:ring-2 focus:border-transparent transition-all">
                      <option disabled value="">Выберите форму обучения</option>
                      <option value="Очная">Очная</option>
                      <option value="Заочная">Заочная</option>
                    </select>
                    <div class="grid grid-cols-2 gap-4">
                      <select
                          v-model="editedCourse.direction"
                          class="border border-gray-300 rounded-xl p-2 bg-white w-full md:w-45 focus:outline-none focus:ring-2 focus:border-transparent transition-all">
                          <option disabled value="">Выберите направление</option>
                          <option value="МТ">МТ</option>
                          <option value="МП">МП</option>
                          <option value="МК">МК</option>
                          <option value="МН">МН</option>
                      </select>
                      <input
                        v-model="editedCourse.group_number"
                        placeholder="Номер группы"
                        class="p-2 border border-gray-300 rounded-lg">
                    </div>
                    <input
                        v-model="editedCourse.year"
                        placeholder="Год"
                        class="p-2 border border-gray-300 rounded-lg">
                    <div class="flex justify-end space-x-2">

                    <!-- Кнопки сохранения и отмнены редактирования -->
                    <button
                        @click="saveEditing(course.course_id)"
                        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Сохранить
                    </button>
                    <button
                        @click="cancelEditing"
                        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Отмена
                    </button>
                    </div>
                  </div>
                </template>


                <!-- Информация о курсе (описание, ФИО преподавателя, год обучения, направление и номер группы)-->
                <template v-else>
                  <p>{{ course.description }}</p>
                </template>
              </div>

              <div class="mt-8">
                <template v-if="editingCourse !== course.course_id">
                  <p class="flex items-center">{{ course.teacher }}</p>
                  <p class="items-right">{{ course.year }} уч.год</p>
                  <p class="flex justify-end">{{ course.direction }} - {{ course.group_number }}</p>
                </template>
              </div>
            </div>
          </div>



          <!-- Если курсы не найдены -->
          <div v-if="filteredCourses.length === 0" class="text-center py-10 text-gray-500">
            Курсы не найдены. Попробуйте изменить параметры фильтрации.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Модальное окно подтверждения архивирования -->
<div v-if="showModal && courseToArchive" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg max-w-sm w-full">
    <h3 class="text-lg font-medium mb-4">Архивировать курс?</h3>
    <p class="text-gray-500 mb-6">Курс "{{ courseToArchive.subject }}" будет перемещен в архив.</p>
    <div class="flex justify-end space-x-3">

      <button
        @click="showModal = false"
        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
        Отмена
      </button>
      <button
        @click="handleArchive"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
        Архивировать
      </button>
    </div>
  </div>
</div>



<!-- Модальное окно подтверждения удаления -->
<div v-if="showModal && courseToDelete" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
   <div class="bg-white p-6 rounded-lg max-w-sm w-full">
     <h3 class="text-lg font-medium mb-4">Удалить курс?</h3>
     <p class="text-gray-600 mb-6">Вы уверены, что хотите удалить этот курс? Это действие нельзя отменить.</p>
     <div class="flex justify-end space-x-3">

     <button
        @click="showModal = false"
        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
        Отмена
     </button>
     <button
        @click="deleteCourse"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        Удалить
     </button>
     </div>
    </div>
  </div>
</template>