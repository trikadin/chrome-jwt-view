'use strict';

require('colors');

const
  fs = require('fs'),

  del = require('del'),
  gulp = require('gulp'),
  bump = require('gulp-bump'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),

  program = require('commander'),
  semver = require('semver');

function log() {
  if (!program.silent) {
    console.log.apply(console, arguments);
  }
}

function die(message, cmd) {
  cmd = cmd || program;
  log('  Fatal'.red + ':', cmd.name().yellow + ':', message);
  cmd.help();
}

function determineVersion() {
  return JSON.parse(fs.readFileSync('./package.json')).version;
}

program
  .version(determineVersion(), '-V')
  .option('--no-color', 'No colors in output')
  .option('--silent', 'Disable output')
  .option(
    '-e, --env <environment>',
    'Set environment (standalone|production) [env.NODE_ENV || standalone]',
    (value) => {
      if (!/^(?:standalone|production)$/.test(value)) {
        die(`invalid environment`);
      }

      return value;
    },
    process.env.NODE_ENV || 'standalone'
  )
  .allowUnknownOption();

const bumpCommand = program
  .command('bump [type]')
  .description(`Bump version (${'major|minor|patch'.yellow}) [${'patch'.yellow}]`)
  .action((type) => {
    if (type && ['major', 'minor', 'patch'].indexOf(type) === -1) {
      die(`invalid type "${type.yellow}"`, bumpCommand);
    }

    bumpCommand.type = type || 'patch';

    gulp.task(bumpCommand.type, [bumpCommand.name()]);
  })
  .option('-x, --exactly <version>', 'specify the exact version', (value) => {
    if (!semver.valid(value)) {
      die(`${value.yellow} is not valid semantic version`, bumpCommand);
    }

    return value.replace(/^[^0-9]*/, '');
  });

/*---------- BUILD ----------*/

const buildCommand = program
  .command('build')
  .description('Build project, if environment is standalone run watcher')
  .option(
    '-w, --watch [status]',
    'exactly enable or disable running of watcher [on|off] (on)',
    (value) => {
      // Использование без значения принудительно включает вотчер
      if (value === null) {
        value = 'on';
      }

      if (!/^(on|off)$/.test(value)) {
        die(`Invalid value for --watcher option: ${value.yellow}`, buildCommand);
      }

      return value === 'on';
    },
    null
  )
  .action(() => {
    buildCommand.current = true;
  });

program.parse(process.argv);

process.env.NODE_ENV = program.env;
log(`Environment: ${program.env.yellow}`);

/*---------- TASK BUMP ----------*/

gulp.task(bumpCommand.name(), (ignore) => {
  log(`Current version is ${program.version().yellow}`);

  const config = {};

  if (bumpCommand.exactly) {
    config.version = bumpCommand.exactly;
    log(`Bump to version ${config.version.yellow}`);
  } else {
    config.type = bumpCommand.type;
    log(`Bump ${config.type.yellow} version`);
  }

  gulp.src('./*.json')
    .pipe(bump(config))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      log(`Done, new version is ${determineVersion().yellow}`);
    });
});

/*---------- TASK BUMP END ----------*/

/*---------- TASK BUILD ----------*/

if (buildCommand.watch === null) {
  buildCommand.watch = program.env === 'standalone';
}

if (buildCommand.current) {
  log(`Watcher: ${(buildCommand.watch ? 'enabled' : 'disabled').yellow}`);
}

const dist = './dist';

gulp.task('build:clean', () => {
  return del([dist]);
});

gulp.task('build:manifest', ['build:clean'], (() => {
  const src = './manifest.json';

  function task(cb) {
    gutil.log(`[${'build:manifest'.cyan}]: updated`);
    gulp.src(src)
      .pipe(gulp.dest(dist))
      .on('end', typeof cb === 'function' ? cb : () => {});
  }

  return (cb) => {
    task(() => {
      if (buildCommand.watch) {
        gulp.watch(src, task);
      }

      cb();
    });
  };
})());

gulp.task('build:webpack', ['build:clean', 'build:manifest'], (cb) => {
  const
    compiler = webpack(require('./webpack.config')),
    isWatch = buildCommand.watch;

  function listener(err, stats) {
    if (err) {
      if (isWatch) {
        gutil.log(err);
        gutil.log(err.stack);
      } else {
        throw err;
      }
    }

    gutil.log(`[${'build:webpack'.cyan}]`, stats.toString({
      colors: true
    }));

    if (!isWatch) {
      cb();
    }
  }

  if (isWatch) {
    compiler.watch({}, listener);
  } else {
    compiler.run(listener);
  }
});

gulp.task('build:test-page', () => {
  require('./jwt-test');
});

gulp.task('build', [
  'build:clean',
  'build:manifest',
  'build:webpack'
].concat(buildCommand.watch ? 'build:test-page' : []));
