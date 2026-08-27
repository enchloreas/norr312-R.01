// Comprehensive Shim for Node 24 on Windows filesystem quirks (readlink EISDIR & mkdir EPERM on unowned drives)
const fs = require("node:fs");
let fsPromises;
try {
  fsPromises = require("node:fs/promises");
} catch {}

function patchFs(targetFs) {
  if (!targetFs) return;

  const origReadlink = targetFs.readlink;
  const origReadlinkSync = targetFs.readlinkSync;
  const origMkdir = targetFs.mkdir;
  const origMkdirSync = targetFs.mkdirSync;

  if (origReadlink) {
    targetFs.readlink = function (path, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = undefined;
      }
      return origReadlink.call(targetFs, path, options, (err, linkString) => {
        if (err && (err.code === "EISDIR" || err.code === "UNKNOWN" || err.message?.includes("illegal operation on a directory"))) {
          const e = new Error(`EINVAL: invalid argument, readlink '${path}'`);
          e.code = "EINVAL";
          e.errno = -4071;
          e.syscall = "readlink";
          e.path = path;
          return callback(e);
        }
        return callback(err, linkString);
      });
    };
  }

  if (origReadlinkSync) {
    targetFs.readlinkSync = function (path, options) {
      try {
        return origReadlinkSync.call(targetFs, path, options);
      } catch (err) {
        if (err && (err.code === "EISDIR" || err.code === "UNKNOWN" || err.message?.includes("illegal operation on a directory"))) {
          const e = new Error(`EINVAL: invalid argument, readlink '${path}'`);
          e.code = "EINVAL";
          e.errno = -4071;
          e.syscall = "readlink";
          e.path = path;
          throw e;
        }
        throw err;
      }
    };
  }

  if (origMkdir) {
    targetFs.mkdir = function (path, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = undefined;
      }
      return origMkdir.call(targetFs, path, options, (err, made) => {
        if (err && (err.code === "EPERM" || err.code === "EEXIST") && fs.existsSync(path)) {
          return callback(null, path);
        }
        return callback(err, made);
      });
    };
  }

  if (origMkdirSync) {
    targetFs.mkdirSync = function (path, options) {
      try {
        return origMkdirSync.call(targetFs, path, options);
      } catch (err) {
        if (err && (err.code === "EPERM" || err.code === "EEXIST") && fs.existsSync(path)) {
          return path;
        }
        throw err;
      }
    };
  }
}

patchFs(fs);

if (fsPromises) {
  const origPromisesReadlink = fsPromises.readlink;
  if (origPromisesReadlink) {
    fsPromises.readlink = async function (path, options) {
      try {
        return await origPromisesReadlink.call(fsPromises, path, options);
      } catch (err) {
        if (err && (err.code === "EISDIR" || err.code === "UNKNOWN" || err.message?.includes("illegal operation on a directory"))) {
          const e = new Error(`EINVAL: invalid argument, readlink '${path}'`);
          e.code = "EINVAL";
          e.errno = -4071;
          e.syscall = "readlink";
          e.path = path;
          throw e;
        }
        throw err;
      }
    };
  }

  const origPromisesMkdir = fsPromises.mkdir;
  if (origPromisesMkdir) {
    fsPromises.mkdir = async function (path, options) {
      try {
        return await origPromisesMkdir.call(fsPromises, path, options);
      } catch (err) {
        if (err && (err.code === "EPERM" || err.code === "EEXIST") && fs.existsSync(path)) {
          return path;
        }
        throw err;
      }
    };
  }
}

if (fs.promises && fsPromises) {
  fs.promises.readlink = fsPromises.readlink;
  fs.promises.mkdir = fsPromises.mkdir;
}
