var im = require("imagemagick");

async function compressImage(imagePath) {
    const path = imagePath.split("/");
    const fileName = path[path.length - 1];
    const newPath = imagePath.replace(fileName, "compressed_" + fileName);
    return new Promise((resolve, reject) => {
        im.convert(
            [imagePath, "-resize", "50%", newPath],
            function (err, stdout) {
                if (err) {
                    reject(err);
                }
                resolve(newPath);
            }
        );
    });
}

module.exports = { compressImage };
