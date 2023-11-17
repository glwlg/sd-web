const fs = require('fs');
const dotenv = require('dotenv');

// 读取环境变量
dotenv.config();
const sdHost = process.env.SD_HOST;
const sdHost = process.env.SD_AUTH;

// 读取nginx.conf文件
fs.readFile('nginx/nginx.conf', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    // 替换nginx.conf文件中的占位符
    const result = data.replace(/SD_HOST_PLACEHOLDER/g, sdHost);

    // 写回nginx.conf文件
    fs.writeFile('nginx/nginx.conf', result, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
    });
});