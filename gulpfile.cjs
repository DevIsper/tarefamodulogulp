const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const obfuscate = require("gulp-obfuscate");
const imagemin = require("gulp-imagemin");

// Compilação do SASS
function compilaSass() {
    return gulp.src("./src/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./build/styles"));
}

// Compressão de imagens
function comprimeImg() {
    return gulp.src('./src/media/img/**/*', {encoding: false})
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./build/media/img'));
}

// Compressão e ofuscação de JavaScript
function comprimeJS() {
    return gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest("./build/js"));
}

// Tarefa padrão e watchers
function watchFiles() {
    gulp.watch("./src/styles/**/*.scss", compilaSass);
    gulp.watch("./src/js/**/*.js", comprimeJS);
    gulp.watch("./src/media/img/**/*", comprimeImg);
}

// Exportação das tarefas
exports.compilaSass = compilaSass;
exports.comprimeImg = comprimeImg;
exports.comprimeJS = comprimeJS;
exports.default = gulp.series(
    gulp.parallel(compilaSass, comprimeImg, comprimeJS),
    watchFiles
);
