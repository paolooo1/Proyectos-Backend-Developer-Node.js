import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp"; // # Para cambiar el tamaño de las imagen,gif,etc

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920; //Para el tamaño de la imagen

const processImg = async () => {
  try {
    const files = await fse.readdir(inputFolder); // * En la variable file se van a almacenar los directorio de las imagenes que estan en la carpeta "src"(inpurFolder)
    for (const file of files) {
      let inputPath = `${inputFolder}/${file}`; // Ruta de la img que sera optimizada
      let ouputPath = `${outputFolder}/${file}`; // Ruta a la cual se va a mandar la img optimizada

      await sharp(inputPath).resize(targetWidth).toFile(ouputPath); // Cambiamos el tamaño ed la imagen y enviamos a la ruta de "ouputPath"

      await imagemin([ouputPath], {
        //ruta de carpeta donde se pondran los archivos
        destination: outputFolder,
        plugins: [
          imageminJpegtran({ quality: 80 }), //Comprime imagen JPG a una calidad de 80%
          imageminPngquant(), //Comprime imagen PNG con los valores prederteminados del modulo
          imageminSvgo(), //Comprime imagen SVG con los valores prederteminados del modulo
          imageminWebp({ quality: 80 }), //Comprime imagen WebP a una calidad de 80%
          imageminGifsicle({}), //Comprime los GIF con los valores prederteminados del modulo
        ],
      });
      console.log(`Se ha optimizado la imagen: ${file}`);
    }
  } catch (error) {
    console.log(error);
  }
};

processImg();
