import path from 'path';
import fs from 'fs';
import * as glob from 'glob';
import { fileURLToPath } from 'url'

const directoryPath = './src' // 要修改文件后缀的目录
const oldExt = '.js'
const newExt = '.ts'

const __filename = fileURLToPath(
    import.meta.url)

const __dirname = path.dirname(__filename)
/**
 * 根据文件路径通配符获取所有匹配到的文件列表
 * @param {string} root 查找文件的根目录
 * @param {array|string} patterns 文件路径通配符
 */
function getFilesByGlob(root, patterns) {
    if (!Array.isArray(patterns)) {
        patterns = [patterns];
    }

    console.time('匹配文件列表');
    const a = patterns.reduce((result, pattern) => {
        return result.concat(glob.sync(pattern, { root }));
    }, []);
    console.timeEnd('匹配文件列表');
    return a;
}
console.log(path.resolve(__dirname, directoryPath));
const files = getFilesByGlob(path.resolve(__dirname, directoryPath), ['./src/**/*.js']);
console.log(files);

files.forEach(function(file) {
    if (path.extname(file) === oldExt) {
        const oldPath = file
        // const newPath = path.join(directoryPath, path.basename(file, oldExt) + newExt)
        const newPath = file.replace(oldExt, newExt);
        fs.rename(oldPath, newPath, function(err) {
            if (err) {
                console.log('Unable to rename file: ' + err)
            } else {
                console.log('File renamed from ' + oldPath + ' to ' + newPath)
            }
        })
    }
});

// fs.readdir(directoryPath, (err, files) => {
//   if (err) {
//     return console.log('Unable to scan directory: ' + err)
//   }
// files.forEach(function (file) {
//   if (path.extname(file) === oldExt) {
//     const oldPath = path.join(directoryPath, file)
//     const newPath = path.join(directoryPath, path.basename(file, oldExt) + newExt)
//     fs.rename(oldPath, newPath, function (err) {
//       if (err) {
//         console.log('Unable to rename file: ' + err)
//       } else {
//         console.log('File renamed from ' + oldPath + ' to ' + newPath)
//       }
//     })
//   }
// })
// })