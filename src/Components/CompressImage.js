// imageCompressionUtil.js
import Pica from 'pica';

const pica = Pica();

const compressImage = async (file, maxSizeKB = 100) => {
  const maxSizeBytes = maxSizeKB * 1024;

  const createImageBitmap = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target.result;
      };

      reader.onerror = (error) => {
        reject(new Error('Failed to read file'));
      };

      img.onload = () => {
        resolve(img);
      };

      img.onerror = (error) => {
        reject(new Error('Failed to load image for compression'));
      };

      reader.readAsDataURL(file);
    });
  };

  try {
    const img = await createImageBitmap(file);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let width = img.width;
    let height = img.height;

    const calculateNewDimensions = () => {
      const scaleFactor = Math.sqrt(maxSizeBytes / (width * height));
      width *= scaleFactor;
      height *= scaleFactor;
    };

    calculateNewDimensions();

    canvas.width = width;
    canvas.height = height;

    await pica.resize(img, canvas);

    let quality = 0.9; // Start with a high quality
    let blob;

    const compress = async () => {
      blob = await pica.toBlob(canvas, file.type, quality);
      if (blob.size <= maxSizeBytes) {
        const compressedFile = new File([blob], file.name, { type: file.type });
        return compressedFile;
      } else {
        calculateNewDimensions();
        canvas.width = width;
        canvas.height = height;
        await pica.resize(img, canvas);
        quality -= 0.1;
        if (quality < 0.1) {
          throw new Error(`Unable to compress image under the desired size. Current size: ${blob.size} bytes`);
        } else {
          console.log(`Reducing quality to: ${quality}`);
          return compress();
        }
      }
    };

    return await compress();
  } catch (error) {
    console.error('Image compression error:', error);
    throw error;
  }
};

export default compressImage;
