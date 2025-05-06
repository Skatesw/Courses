const scheme = {
  header: {
    user: {
      id: 123,
      role: "Студент",
      photo: "/blankprofpic.png",
    },
    route: {
      subject: "Математический анализ",
      teacher: "Плеханова М.В.",
      type: "Практика",
    },
    userMenu: [
      {
        label: {
          user: {
            full_name: "Иван Иванов",
          },
        },
        link: "/profile",
      },
      {
        label: "Личные файлы / Оценки",
        link: "/profile",
      },
      {
        label: "Сообщения",
        link: "/profile",
      },
      {
        label: "Настройки",
        link: "/profile",
      },
      {
        label: "Выход",
        link: "/logout",
      },
    ],
  },
  sidebar: {
    logo: "/emb_csu.png",
    title: "ЧелГУ",
    menuItems: [
      {
        icon: "/un_icon2.png",
        text: "Мои Курсы",
        link: "/courses"
      },
      {
        icon: "/un_icon2.png",
        text: "Расписание",
        link: "/schedule"
      },
      {
        icon: "/un_icon2.png",
        text: "Успеваемость",
        link: "/progress"
      },
      {
        icon: "/un_icon2.png",
        text: "Сообщения",
        link: "/messages"
      },
    ],
  },


  coursesBlock: {
    filters: {
      year: ["Все года", "2025-2026", "2026-2027", "2027-2028", "2028-2029"],
      direction: ["Все направления","МТ", "МП", "МK", "МН"],
      form_of_study: ["Все формы обучения", "Очная", "Заочная"],
      type: ["Лекционный курс","Практический курс","Лабораторные занятия", "Семинар"],
    },
    courses: [
      {
        course_id: 1,
        subject: "Мат.анализ",
        type: "Лекционный курс",
        description: "Описание курса Мат.анализа",
        teacher: "Панов А.В.",
        year: "2024-2025",
        direction: "МТ",
        group_number: "201",
        form_of_study: "Очная"
      },
      {
        course_id: 2,
        subject: "Алгебра",
        type: "Лекционный курс",
        description: "Описание курса Алгебра",
        teacher: "Митина О.В.",
        year: "2025-2026",
        direction: "МП",
        group_number: "101",
        form_of_study: "Очная"
      },
      {
        course_id: 3,
        subject: "Геометрия",
        type: "Практический курс",
        description: "Описание курса Геометрия",
        teacher: "Набеева Л. Р.",
        year: "2026-2027",
        direction: "МК",
        group_number: "102",
        form_of_study: "Очная"
      },
      {
        course_id: 4,
        subject: "Мат.анализ",
        type: "Лабораторные занятия",
        description: "Описание курса Мат.анализа",
        teacher: "Турова Г.Д.",
        year: "2023-2024",
        direction: "МТ",
        group_number: "202",
        form_of_study: "Заочная"
      },
      {
        course_id: 5,
        subject: "Мат.анализ",
        type: "Семинар",
        description: "Описание курса Мат.анализа",
        teacher: "Шайхуллина П.А.",
        year: "2026-2027",
        direction: "МК",
        group_number: "202",
        form_of_study: "Очная"
      },
      {
        course_id: 6,
        subject: "Теория автом.",
        type: "Практический курс",
        description: "Описание курса Теории автоматов",
        teacher: "Казаков А.А.",
        year: "2025-2026",
        direction: "МТ",
        group_number: "302",
        form_of_study: "Заочная"
      },
      {
        course_id: 7,
        subject: "Дискр. мат.",
        type: "Лекционный курс",
        description: "Описание курса Дискр. мат.",
        teacher: "Кораблев Ф.Г.",
        year: "2024-2025",
        direction: "МК",
        group_number: "203",
        form_of_study: "Очная"
      },
      {
        course_id: 8,
        subject: "Информатика",
        type: "Лекционный курс",
        description: "Описание курса Информатика",
        teacher: "Алексеев М.Н.",
        year: "2025-2026",
        direction: "МТ",
        group_number: "103",
        form_of_study: "Очная"
      },
      {
        course_id: 9,
        subject: "Техн. баз данных",
        type: "Практический курс",
        description: "Описание курса Техн. баз данных",
        teacher: "Алексеева Т.М.",
        year: "2024-2025",
        direction: "МН",
        group_number: "401",
        form_of_study: "Заочная"
      }
    ]
  },

  calendarBlock: {
    schedule: [
      {
        day: 'Понедельник',
        time: '09:00',
        subject: 'Математический анализ',
        direction: "МТ",
        group_number: "104",
        classroom: '432',
        classroomLink: '',
        teacher: 'Турова Г.Д.'
      },
      {
        day: 'Вторник',
        time: '11:00',
        subject: 'Алгебра',
        direction: "МП",
        group_number: "104",
        classroom: 'А-17',
        classroomLink: '',
        teacher: 'Митина О.В.'
      },
      {
        day: 'Среда',
        time: '13:00',
        subject: 'Программирование',
        direction: "МК",
        group_number: "202",
        classroom: 'meet.google.com',
        classroomLink: 'https://meet.google.com/xxw-nods-mbz',
        teacher: 'Алексеев М.Н.'
      },
      {
        day: 'Четверг',
        time: '13:00',
        subject: 'Геометрия',
        direction: "МК",
        group_number: "202",
        classroom: '427',
        classroomLink: '',
        teacher: 'Набеева Л. Р.'
      }
    ]
  },

  courseDetails: {
    currentCourse: {
      id: 1,
      subject: "Мат.анализ",
      course_description: "Основы дифференциального и интегрального исчисления",
      teacher: {
        name: "Панов А.В.",
        position: "Профессор",
        department: "Кафедра математического анализа",
        email: "panov@university.ru"
      },
      schedule: [
        {
          day: "Понедельник",
          time: "09:00-10:30",
          room: "МТ-201",
          type: "Лекция"
        },
        {
          day: "Среда",
          time: "11:00-12:30",
          room: "МТ-203",
          type: "Практика"
        }
      ],
      materials: [
        {
          type: "literature",
          title: "Рекомендуемая литература",
          items: [
            "Демидович Б.П. - Сборник задач по математическому анализу",
            "Фихтенгольц Г.М. - Курс дифференциального и интегрального исчисления"
          ]
        },
        {
          type: "files",
          title: "Материалы курса",
          files: [
            {
              id: 1,
              name: "Лекция 1.pdf",
              type: "application/pdf",
              url: "/files/lecture1.pdf"
            },
            {
              id: 2,
              name: "Задания.pdf",
              type: "application/pdf",
              url: "/files/tasks.pdf"
            }
          ]
        }
      ]
    }
  }
};

export default scheme;