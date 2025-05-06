<script setup>
import { inject, computed } from 'vue';

const archivedCourses = inject('archivedCourses');
const restoreCourse = inject('restoreCourse');
const isEditingGlobal = inject('isEditingGlobal');
const hasArchivedCourses = computed(() => archivedCourses.value.length > 0);

</script>

<template>
    <div class="relative flex flex-col w-full px-6">
        <h2 class="text-xl font-bold mb-6 p-10 ml-49 relative mb-2">Архив курсов</h2>
        <div class="ml-55">

            <!-- Список курсов -->
            <div v-if="hasArchivedCourses">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="course in archivedCourses" :key="course.course_id"
                        class="relative mb-2 p-8 bg-white rounded-[1vw] shadow-2xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-3xl transition-all duration-300 border border-gray-100">

                        <!-- Заголовок карточки курса -->
                        <h2 class="absolute -top-5 left-6 px-3 py-2 border-1 border-black rounded-2xl bg-[url('/Rectangle.png')]">
                            {{ course.subject }}
                        </h2>

                        <!-- Тип курса -->
                        <span class="px-3 py-1 bg-gray-200 rounded-lg inline-block text-sm">
                            {{ course.type }}
                        </span>

                        <!-- Описание курса -->
                        <div class="mt-10 mb-10">
                            <p>{{ course.description }}</p>
                        </div>

                        <!-- ФИО препод., год, направление и группа-->
                        <div class="mt-8">
                            <p class="flex items-center">{{ course.teacher }}</p>
                            <p class="items-right">{{ course.year }} уч.год</p>
                            <p class="flex justify-end">{{ course.direction }} - {{ course.group_number }}</p>
                        </div>

                        <!-- Кнопка восстановления -->
                        <button
                            @click="restoreCourse(course.course_id)"
                            class="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                            Восстановить курс
                        </button>
                    </div>
                </div>
            </div>

            <!-- Если архив пуст -->
            <div v-else class="text-center py-10 text-gray-500">
                Архив пуст.
            </div>
        </div>
    </div>
</template>