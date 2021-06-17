//TODO:Подключаем всю мощь возможностей gulp 
//src - для работы с файлом
//dest - для экспорта всех изменений
//watch - для слежки изменений файлов
//parallel - для запуска несколько функций одновременно
//series - для последовательного запуска функций
const {src, dest, watch, parallel, series} = require('gulp')

//TODO:Подключаем дополнительные модули (в документациях!)
//scss- плагин для компеляции файлов scss
//concat - для сборки файлов в один
//browserSync - для автообновления
//uglify - для минификации файлов js
//autoprefixer - для добавления префиксов для старых браузеров
//imagemin - для сжатия картинок
//del - для удаления папок
const scss = require('gulp-sass')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const image = require('gulp-imagemin')
const del = require('del')
const fileinclude = require('gulp-file-include');

//TODO:Функция для html-include
function html(){
   return src([
      //!Если сайт - многостраничник - нужно добавлять эти страницы ЗДЕСЬ!!!!
      'dev/components/main-box.html',
      //'app/includes/about.html'
   ])
      .pipe(fileinclude())
      .pipe(concat('index.html'))
      .pipe(dest('dev/'))
      .pipe(browserSync.stream())
}

//TODO:Функция для компиляции с scss в css
function styles(){
   //Путь к файлу для работы
   return src('dev/components/main-box.scss')
      //Подключение возможностей плагина через переменную scss (компелируем файл)
      .pipe(scss({
         outputStyle: 'compressed'
      }))
      //Сборка всех файлов css в один под название style.min.css
      .pipe(concat('style.min.css'))
      //Добавление префиксов
      .pipe(autoprefixer({
         overrideBrowserslist:[
            'last 10 version'
         ],
         grid: true
      }))
      //Отправка файла в конечный путь
      .pipe(dest('dev/static/css/'))
      //Настройка автообновления
      .pipe(browserSync.stream())
}

//TODO:Функция для автообновления js и его минификация
function script(){
   //Подлкючаем все файлы js
   return src([
      'dev/static/js/libs/*.js',
      'dev/components/section/modules.js',
      'dev/components/section/**/*.js',
      'dev/components/app.js',
   ])
      .pipe(concat('script.min.js'))
      .pipe(uglify())
      .pipe(dest('dev/static/js/'))
      .pipe(browserSync.stream())
}

//TODO:Функция для сжатия картинок
function images(){
   return (src(['dev/static/images/**/*']))
      .pipe(image([
         //Дополнительные настройки для оптимизации (скопировано в документации)
         image.gifsicle({interlaced: true}),
         image.mozjpeg({quality: 75, progressive: true}),
         image.optipng({optimizationLevel: 5}),
         image.svgo({
             plugins: [
                 {removeViewBox: true},
                 {cleanupIDs: false}
             ]
         })
     ]))
      .pipe(dest('dist/static/images/'))
}

//TODO:Функция очистки dist и его обновления
function cleanDist(){
   //Указывает какую папку удалить
   return del('dist')
}

//TODO:Функция автообновления страницы после отслежки
function browsersync(){
   browserSync.init({
      server: {
         baseDir: 'dev/'
      }
   })
}

//TODO:Функция экспорта всех чистых фацлов в папку dist
function build(){
   return src([
      'dev/static/css/style.min.css',
      'dev/static/js/script.min.js',
      'dev/static/fonts/**/*',
      'dev/*.html'
   ], {base: 'dev'})
      .pipe(dest('dist'))
}

//TODO:Функция слежения (первый параметр - объект слежки, а второй - что выполнять во время изменения)
function watching(){
   //Слежка за scss 
   watch(['dev/scss/**/*.scss', 'dev/components/section/**/*.scss', 'dev/components/*.scss', 'dev/components/widgets/*.scss'], styles)
   //Слежка за html-inlude
   watch(['dev/components/section/**/*.html', 'dev/components/*.html'], html)
   //Слежка за html и сразу автообновление
   watch(['dev/*.html']).on('change', browserSync.reload)
   //Слежка за js
   watch(['dev/components/section/**/*.js', 'dev/components/app.js', 'dev/components/section/modules.js', '!dev/static/js/script.min.js'], script)
}

//TODO:Вывод наших функций (что при запуске метода покажет expotrs)
exports.styles = styles
exports.watching = watching
exports.browsersync = browsersync
exports.script = script
exports.images = images
exports.cleanDist - cleanDist
exports.html = html

//Последовательный запуск функций 
//!ЧИСТКА DIST -> ЭКСПОРТ ФОТО -> ЭКСПОРТ ВСЕГО ОСТАЛЬНОГО
exports.build = series(cleanDist, images, build)

//parallel - запускает несколько функций по default(команда gulp) 
//!КОНКРЕТНО ДЛЯ АВТООБНОВЛЕНИЯ И КОМПЕЛЯЦИИ
exports.default = parallel(html, styles, script, browsersync, watching)