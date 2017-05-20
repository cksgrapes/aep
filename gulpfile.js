/* Gulp Plugins
======================================== */

var fs            = require('fs'),
    gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    pngquant      = require('imagemin-pngquant'),
    webpack       = require('webpack'),
    webpackStream = require('webpack-stream'),
    // gulp-*, gulp.*で始まる名前のものを一括で読込
    $           = require('gulp-load-plugins')();

/* Setting
======================================== */

//開発環境パス
var src = {
  'base'   : './dev/',
  'ejs'    : ['./dev/**/*.ejs','!./dev/**/_*.ejs'],
  'stylus' : ['./dev/**/*.styl','!./dev/**/_*.styl'],
  'js'     : ['./dev/**/*.js'],
  'img'    : ['./dev/**/*.{png,jpg,gif,svg,ico}']
};

//出力環境パス
var dest = {
  'base' : './htdocs/',
  'css'  : './htdocs/assets/css/',
  'js'   : './htdocs/assets/js/',
  'img'  : './htdocs/assets/images/'
};

//対象ブラウザ
var AUTOPREFIXER_BROWSERS = [
  'last 2 versions',
  'ie >= 11',
  'iOS >= 9',
  'Android >= 4.4'
];

//その他オプション
var　option = {
  'port'   : 3000, //サーバーのポート番号
  'htmlmin': false, //HTMLの圧縮
  'cssmin' : true, //CSSの圧縮
};

/* Tasks
======================================== */

/**
 * ejsのコンパイル
 */
gulp.task('ejs', function() {
  gulp.src(src.ejs)
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe($.ejs({
      site: JSON.parse(fs.readFileSync(src.base + 'include/config.json'))
    },
    {
      ext: '.html'
    }
  ))
  .pipe($.if(option.htmlmin, $.htmlmin({
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
  })))
  .pipe(gulp.dest(dest.base));
});

/**
 * Stylusのコンパイル・圧縮
 */
gulp.task('stylus', function() {
  gulp.src(src.stylus)
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe($.sourcemaps.init())
  .pipe($.stylus({
    'include css': true
  }))
  .pipe($.autoprefixer({
    browsers: AUTOPREFIXER_BROWSERS,
  }))
  .pipe($.csscomb())
  .pipe($.if(option.cssmin, $.cleanCss()))
  .pipe($.sourcemaps.write('maps', {
    includeContent: false,
    sourceRoot: dest.css + 'maps'
  }))
  .pipe(gulp.dest(dest.css));
});

/**
 * JSの結合・圧縮・コピー
 */

//webpackでJS結合
gulp.task('js', function() {
  var webpackConfig = require('./webpack.config.js');

  gulp.src(src.js)
    .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe(webpackStream(webpackConfig,webpack))
    .pipe(gulp.dest(dest.js));
});

/**
 * 画像の圧縮
 */
gulp.task('imagemin', function() {
  return gulp.src(src.img)
  .pipe($.changed(dest.img))
  .pipe($.filter(['**','!**/include/**']))
  .pipe($.imagemin({
    plugins: [
      pngquant({
        quality: 60-80,
        speed: 1
      }),
      $.imagemin.jpegtran({
        progressive: true
      }),
      $.imagemin.optipng({
        interlaced: true
      })
    ]
  }))
  .pipe(gulp.dest(dest.img));
});

/**
 * ベースファイルのコピー
 */
gulp.task( 'fontcopy', function () {
  gulp.src(['./dev/include/fonts/**/*'], {base:'./dev/include/'})
    .pipe(gulp.dest(dest.css));
});

 /*========================================*/
/* Server / Watch
/*========================================*/

/**
 * ローカルサーバーの起動
 */
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'htdocs/'
    }
  });
});

/**
 * ファイル監視
 */
gulp.task('watch', function() {
  // 出力領域が更新されたらオートリロード
  $.watch([
      dest.base + '**/*.html',
      dest.base + '**/*.json',
      dest.base + '**/*.css',
      dest.base + '**/*.js',
      dest.base + '**/*.jpg',
      dest.base + '**/*.png',
      dest.base + '**/*.svg',
  ], function (){
      browserSync.reload();
  });


  // 開発環境のファイルを監視
  $.watch( [
      src.base + '**/*.ejs',
      src.base + '**/*.json'
  ] , function () {
    gulp.start( 'ejs' );
  });
  $.watch( [
      src.base + '**/*.styl'
  ], function () {
    gulp.start( 'stylus' );
  });
  $.watch( src.js , function () {
    gulp.start( 'js' );
  });
  $.watch( src.img , function () {
    gulp.start( 'imagemin' );
  });
});

/**
 * デフォルトタスク
 */
gulp.task('default', ['server', 'watch'] );

/**
 * リリース用タスク
 */
 gulp.task('release',['ejs','stylus','js','imagemin','fontcopy'])
