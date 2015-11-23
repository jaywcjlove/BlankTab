var gulp = require('gulp');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// 浏览器兼容自动处理
var autoprefixer = require('gulp-autoprefixer');
var browserslist = ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'];

gulp.task('default', ['script','stylus','ejs','copy']);

// 侦听文件改变执行任务
gulp.task('watch', function (cb) {
    gulp.watch('./js/**/*', ['script']);
    gulp.watch('./styl/**/*', ['stylus']);
    gulp.watch('./templates/**/*', ['ejs']);
    gulp.watch('./manifest.json', ['copy']);
});

gulp.task('ejs',function(){

    gulp.src("./templates/*.ejs")
        .pipe(ejs({
            title: "打开新标签页"
        }).on('error',gutil.log))  
        .pipe(gulp.dest("./build"));

})

gulp.task('stylus',function(){

    gulp.src('./styl/*.styl')
        .pipe(stylus({
            compress:true
        }))
        .pipe(autoprefixer({
            browsers: browserslist,
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'));

})

gulp.task('script',function(){

    gulp.src(['js/jQuery.3.0.0.min.js','js/database.js','js/store.js','js/tab.js','js/main.js'])
        .pipe(uglify().on('error',gutil.log))
        .pipe(concat('main.min.js').on('error',gutil.log))
        .pipe(gulp.dest('./build/js'));

    gulp.src(['js/jQuery.3.0.0.min.js','./js/store.js','./js/page_popup.js'])
        .pipe(uglify().on('error',gutil.log))
        .pipe(concat('page_popup.min.js').on('error',gutil.log))
        .pipe(gulp.dest('./build/js'));

    gulp.src('./js/background.js')
        .pipe(uglify().on('error',gutil.log))
        .pipe(gulp.dest('./build/js'));
        
    gulp.src('./js/getcontent.js')
        .pipe(uglify().on('error',gutil.log))
        .pipe(gulp.dest('./build/js'));

})

gulp.task('copy',function(){

    gulp.src('./manifest.json')
        .pipe(gulp.dest('./build'));

    gulp.src('./css/*.css')
        .pipe(gulp.dest('./build/css'));

    gulp.src('./img/*')
        .pipe(gulp.dest('./build/img'));

})