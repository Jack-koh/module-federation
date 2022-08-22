const fs = require("fs");
const path = require("path");
const util = require("util");

const { exec } = require("child_process");
const pexec = util.promisify(exec);

const log = console.log;
const error = console.error;

class Prepare {
  constructor() {
    this.path = {
      build: path.join(__dirname, "/build"),
      dist: path.join(__dirname, "/dist"),
    };

    this.remove = {
      build: this.rm.bind(this, "rm -rf ./build"),
      dist: this.rm.bind(this, "rm -rf ./dist"),
      all: this.rm.bind(this, "rm -rf ./dist ./build"),
    };
  }

  rm(cmd) {
    exec(cmd);
  }

  async tsCompile() {
    try {
      await pexec("tsc --project tsconfig.json");
      log("TS COMPILE: SUCCESS =====================");
    } catch (err) {
      error("TS COMPILE: FAIL ===================== \n" + err);
    }
  }

  async scssBuild() {
    try {
      await pexec("npm run build");
      log("BUILD SCSS: SUCCESS =====================");
    } catch (err) {
      error("BUILD SCSS: FAIL ===================== \n" + err);
    }
  }

  moveCss() {
    fs.readdirSync(this.path.build).forEach((file) => {
      // 1) css 파일 내 '/static/media' 문자열을 './assets' 으로 치환
      // 2) 변경된 css파일을 목적 경로로 이동
      if (file.includes("css")) {
        const target = path.join(this.path.build, `/${file}`);
        fs.renameSync(target, path.join(this.path.dist, `/${file}`));
        log("MOVE CSS: SUCCESS from build ========= to dist");
      }
    });
  }

  moveAssets() {
    fs.readdirSync(this.path.build).forEach((file) => {
      if (file === "assets") {
        fs.renameSync(
          path.join(this.path.build, `/${file}`),
          path.join(this.path.dist, `/${file}`),
        );
        log("MOVE IMAGES: SUCCESS from build ========= to dist");
      }
    });
  }

  version() {
    const target = path.join(__dirname, "/package.json");
    const context = fs.readFileSync(target, "utf8");

    // 버전 추출 및 가공
    const json = JSON.parse(context);
    const version = json.version.split("."); // [num, num, num]
    const minor = version.length - 1;
    version[minor] = Number(version[minor]) + 1;
    json.version = version.join(".");
    fs.writeFileSync(target, JSON.stringify(json, null, 2));
    log(`VERSION UPDATE =========== ${json.version} ============`);
  }
}

// publish 전 파일 세팅

const publish = async () => {
  try {
    // 계정 정보 확인
    const who = await pexec("npm whoami");
    if (who.stdout.trim() !== "jack.koh") throw new Error("Author is not correct");
    // prepare ===================
    const p = new Prepare();
    p.remove.all();
    await Promise.all([p.tsCompile(), p.scssBuild()]);
    p.moveAssets(); // asset 폴더 이동: build -> dist
    p.moveCss(); // css 파일 이동: build -> dist
    p.remove.build();
    p.version(); // version 업데이트
    // publish ===================
    exec("npm publish");
  } catch (err) {
    log(err);
  } finally {
    process.kill(process.pid);
  }
};
publish();
