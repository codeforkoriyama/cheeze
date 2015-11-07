/*******************************************************************************
 * Copyright (c) 2015. Nobuyuki Kondo Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @date: 2015/2/2
 ******************************************************************************/
"use strict";

/************** Package List **************/
// ユーティリティパッケージ
var gulp = require('gulp'),
  spawn = require('child_process').spawn,     // gulp再起動用
  gutil = require('gulp-util'),
  watch = require('gulp-watch'),
  cached = require('gulp-cached'),
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sequence = require('run-sequence'),
  Notifier = require('node-notifier').NotificationCenter,
  notifier = new Notifier();



// Sassパッケージ
var compass = require('gulp-compass'),
  pleeease = require('gulp-pleeease');


// Hamlパッケージ
var haml = require('gulp-ruby-haml');

// ts/jsパッケージ
var ts = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps');


// 画像圧縮系
var imagemin = require('gulp-imagemin'),
  spritesmith = require('gulp.spritesmith');

// CSS解析
var stylestats = require('gulp-stylestats');


/************** Settings **************/
/** コンパイル用ファイルタイプ */
var fileType = {
  sass  : 'Sass',
  ts    : 'typeScript',
  haml  : 'Haml',
  js    : 'JavaScript',
  img   : 'image',
  sprite: 'ImageSprite'
};

/** エラーハンドラ */
var errHandler = function (err, title) {
  notifier.notify({
    message: err.message,
    title  : title + ' Compile Error',
    sound  : 'Glass'
  });
};


/** ファイルパス */
var paths = {
  css   : ['common/css{,*/}*.css'],
  sass  : ['_ws/sass/{,*/}*.sass'],
  haml  : ['_ws/haml/{,*/}*.haml', '!_ws/haml/{,*/}_*.haml'],
  ts: {
    def: ['_ws/typescript/{,*/}*.ts', '!_ws/typescript/{,*/}_*.ts', '!_ws/typescript/frameworks/*.ts', '!_ws/typescript/assets/*.ts'],
    assets: ['_ws/typescript/frameworks/*.ts', '_ws/typescript/assets/*.ts', '!_ws/typescript/frameworks/_*.ts', '!_ws/typescript/assets/_*.ts']
  },
  js: {
    def: ['_ws/js/{,*/}*.js', '!_ws/js/library/*.js', '!_ws/js/{,*/}_*.js', '!_ws/js/frameworks/*.js', '!_ws/js/assets/*.js'],
    lib: ['_ws/js/library/*.js', '!_ws/js/library/_*.js'],
    assets: ['_ws/js/frameworks/*.js', '_ws/js/assets/*.js', '!_ws/js/frameworks/_*.js', '!_ws/js/assets/_*.js']
  },
  image : ['_ws/img/{,*}/*.+(jpg|jpeg|png|gif|svg)', '!_ws/img/{,*}/_*.+(jpg|jpeg|png|gif|svg)'],
  sprite: ['_ws/sprite/{,*/}*.png']
};

/** 出力先 **/
var dest = {
  image: 'common/img',
  css  : 'common/css',
  sass : {
    def   : '_ws/sass',
    parts : '_ws/sass/parts',
    sprite: '_ws/sass/sprite'
  },
  js   : {
    dev: 'common/dev_js',
    pro: 'common/js',
    lib: 'common/js/libs'
  },
  ts   : {
    dts: '_ws/dts'
  }
};

/** タスク名 **/
var tasks = {
  sass : {
    def: 'sass'
  },
  css: {
    styleStats: 'cssStats'
  },
  image: {
    copy  : 'imageCopy',
    minify: 'imageMinify',
    sprite: 'imageSprite'
  },
  js   : {
    copy: 'jsCopy',
    lib : 'jsLib',
    assets: 'jsAssets',
    assetsBefore: 'jsAssetsBefore',
    assetsMini: 'jsAssetsMini'
  },
  haml : {
    def: 'haml'
  },
  ts   : {
    def: 'ts',
    assets: 'tsAssets',
    assetsBefore: 'tsAssetsBefore'
  },
  start: 'start',
  watch: 'watch',
  def  : 'default'
};

// 資産ファイルの結合後のファイル名
var jsAssetsFileName = 'Assets.js';


/************** Sass Tasks **************/

  // Sassコンパイル + ベンダプレフィックス処理
gulp.task(tasks.sass.def, function () {
  return gulp.src(paths.sass)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.sass);
        this.emit('end');
      }
    }))
    .pipe(cached('sassCache', {
      optimizeMemory: true
    }))
    .pipe(compass({
      style      : 'expanded',     // 改行有り：expanded  ネスト：nested  一行ずつ：compact  全圧縮：compressed
      comments   : false,
      relative   : true,     // background-image指定 => true:相対パス、false:絶対パス
      css        : 'common/css',
      sass       : '_ws/sass',
      javascript : 'common/js',
      font       : 'common/fonts',
      image      : 'common/img',
      sourcemap  : false,
      enviroment : 'production',   // production || development
      http_path  : '/',
      config_file: 'config.rb'
    }))
    .on('error', function (err) {
    })
    .pipe(pleeease({
      autoprefixer: {
        browsers: ["last 3 version", "> 1%", "ie 8", "ie 7", "Android 2.3"]    // ベンダプレフィックス
      },
      minifier    : {preserveHacks: true, removeAllComments: true}
      //minifier    : false
    }))
    .pipe(gulp.dest(dest.css));

  // gulp-compass: https://www.npmjs.com/package/gulp-compass
  // gulp-pleeease: https://www.npmjs.com/package/gulp-pleeease

});


/************** Image Tasks **************/

  // 画像のコピー
gulp.task(tasks.image.copy, function () {
  return gulp.src(paths.image)
    //.pipe(changed(dest.image))
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.img);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(dest.image));
});

// スプライト画像の生成
gulp.task(tasks.image.sprite, function () {
  gulp.watch(paths.sprite, function (arg) {
    var filePath = arg.path.match(/^(.+\/)(.+?)(\/.+?\..+?)$/),
      targetPath = filePath[1] + filePath[2] + '/*.png',
      sprite = gulp.src(targetPath)
        .pipe(plumber({
          errorHandler: function (err) {
            errHandler(err, fileType.sprite);
            this.emit('end');
          }
        }))
        .pipe(spritesmith({
          imgName           : filePath[2] + '.png',
          cssName           : '_' + filePath[2] + '.sass',
          //imgPath: dest.image + '/' + filePath[2] + '.png',
          imgPath           : filePath[2] + '.png',
          cssFormat         : 'sass',
          algorithm         : 'binary-tree',
          cssSpritesheetName: 'spriteSheet-' + filePath[2],
          cssTemplate       : 'spriteTemplate.css.mustache',
          cssVarMap         : function (sp) {
            sp.name = 'sprite-' + sp.name;
          }
        }));

    sprite.img.pipe(gulp.dest(dest.image));
    sprite.css.pipe(gulp.dest(dest.sass.sprite));

    // gulp.spritesmith: https://www.npmjs.com/package/gulp.spritesmith
  });

});

// 画像の圧縮処理
gulp.task(tasks.image.minify, function () {
  return gulp.src(paths.image)
    //.pipe(changed(dest.image))
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.img);
        this.emit('end');
      }
    }))
    .pipe(imagemin({
      progressive      : true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest(dest.image));

  // gulp-imagemin: https://www.npmjs.com/package/gulp-imagemin
});


/************** JavaScript Tasks **************/

  // ワークスペース内のJSをコピー
gulp.task(tasks.js.copy, function () {
  return gulp.src(paths.js.def)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.js);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(dest.js.dev))
    .pipe(uglify({
      compress        : false,
      preserveComments: 'some'
    }))
    .pipe(gulp.dest(dest.js.pro));
});

// 外部ライブラリの結合
gulp.task(tasks.js.lib, function () {
  return gulp.src(paths.js.lib)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.js);
        this.emit('end');
      }
    }))
    .pipe(uglify({
      preserveComments: 'all'
    }))
    .pipe(concat('library-set.js'))
    .pipe(gulp.dest(dest.js.lib));
});

// JavaScript資産ファイルの結合
gulp.task(tasks.js.assets, function(){
  // 前から順に実行
  sequence(tasks.js.assetsBefore, tasks.js.assetsMini);
});


// JavaScript資産ファイルの結合処理
gulp.task(tasks.js.assetsBefore, function(){
  return gulp.src(paths.js.assets)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.js);
        this.emit('end');
      }
    }))
    .pipe(concat(jsAssetsFileName))
    .pipe(gulp.dest(dest.js.dev));
});


// 資産ファイルのMinify化
gulp.task(tasks.js.assetsMini, function(){
  return gulp.src(dest.js.dev+'/'+jsAssetsFileName)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.ts);
        this.emit('end');
      }
    }))
    .pipe(uglify({
      compress: false
    }))
    .pipe(gulp.dest(dest.js.pro));
});

/************** Haml Tasks **************/

  // Hamlコンパイル
gulp.task(tasks.haml.def, function () {
  return gulp.src(paths.haml)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.haml);
        this.emit('end');
      }
    }))
    .pipe(cached('hamlCached', {
      optimizeMemory: true
    }))
    .pipe(haml({
      doubleQuote: true
    }))
    .pipe(gulp.dest('./'));

  // gulp-ruby-haml: https://www.npmjs.com/package/gulp-ruby-haml
});


/************** TypeScript Tasks **************/
var tsProject = ts.createProject({
  declarationFiles : true,
  noExternalResolve: false,
  removeComments   : false,
  noLib            : false,
  module           : 'commonjs',
  target           : 'ES3',
  sourceRoot       : '../_ws/typescript/',
  sortOutput       : true
});


// TypeScriptコンパイル
gulp.task(tasks.ts.def, function () {
  var tsRes = gulp.src(paths.ts.def)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.ts);
        this.emit('end');
      }
    }))
    .pipe(cached('tsCache', {
      optimizeMemory: true
    }))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  tsRes.dts.pipe(gulp.dest(dest.ts.dts));

  return tsRes.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.js.dev))
    .pipe(uglify({
      //preserveComments: 'some',
      compress: false
    }))
    .pipe(gulp.dest(dest.js.pro));

  // gulp-typescript: https://www.npmjs.com/package/gulp-typescript
});


// フレームとなる資産ファイルの結合
gulp.task(tasks.ts.assets, function(){
  // 前から順に実行
  sequence(tasks.ts.assetsBefore, tasks.js.assetsMini);
});

// 資産ファイルの結合処理
gulp.task(tasks.ts.assetsBefore, function(){
  return gulp.src(paths.ts.assets)
    .pipe(plumber({
      errorHandler: function (err) {
        errHandler(err, fileType.ts);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(concat(jsAssetsFileName))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.js.dev));
});

/************** CSS Analytis Tasks **************/
gulp.task(tasks.css.styleStats, function(){
  return gulp.src(paths.css)
    //.pipe(console.log(this))
    .pipe(stylestats());
});


/************** Start Tasks **************/
gulp.task(tasks.start, function () {
  // Sassの監視
  gulp.watch(paths.sass, [tasks.sass.def]);

  // 画像の監視
  gulp.watch(paths.image, [tasks.image.copy]);

  // JavaScript Copy
  gulp.watch(paths.js.def, [tasks.js.copy]);

  // JavaScript Library
  gulp.watch(paths.js.lib, [tasks.js.lib]);

  // JavaScript Assets
  gulp.watch(paths.js.assets, [tasks.js.assets]);

  // Haml
  gulp.watch(paths.haml, [tasks.haml.def]);

  // TypeScript
  gulp.watch(paths.ts.def, [tasks.ts.def]);

  // TypeScript Assets
  gulp.watch(paths.ts.assets, [tasks.ts.assets]);
});

/************** Default Tasks **************/
gulp.task(tasks.def, function () {
  cached.caches = {};

  var process;

  function restart() {
    if (process) process.kill();

    process = spawn('gulp', [tasks.start], {stdio: 'inherit'});
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});

