var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var spawn = require('child_process').spawn
var node;

gulp.task('server', (cb) => {
    if (node) node.kill()
    node = spawn('node', ['./build/app.js'], { stdio: 'inherit' })
    node.on('close', (code) => {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
    cb(null)
})

gulp.task('build:ts', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('build'));
});

gulp.task('watch:ts', function (cb) {
    gulp.watch('./src/**/*.ts', gulp.series(['build:ts', 'server']))
    cb(null);
});

gulp.task('build', gulp.series(['build:ts']))

gulp.task('dev', gulp.series(['build', 'server', 'watch:ts']))

process.on('exit', () => {
    if (node) node.kill()
})