import { ImageFileData } from '../types/base/image-file-data';
import { loadImageToCanvas } from './canvas.helpers';
import { Utils } from './utils';

const CORS__PROXY_URL: string = 'https://cors-anywhere.herokuapp.com/';

export function saveFile(fileData: ImageFileData) {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const downloadLink: HTMLAnchorElement = document.createElement('a');
  loadImageToCanvas(fileData.imageData, canvas);
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = fileData.fileName + '.png';
  downloadLink.click();
}

export function showFileUploadDialog(): Promise<ImageFileData> {
  return new Promise<ImageFileData>((resolve, reject) => {
    const fileInput: HTMLInputElement = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (fileUploadEvent: any) => {
      const uploadedFile: File = fileUploadEvent.target.files[0];
      const fileName: string = getFileNameWithoutExtension(uploadedFile.name);
      getImageDataFromUpload(
        uploadedFile,
        (imageData: ImageData) => {
          resolve({ imageData, fileName });
        },
        reject
      );
    };
    fileInput.click();
  });
}

export function submit(fileData: ImageFileData) {
  const utils = new Utils();
  let fileInfo!: File;
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  loadImageToCanvas(fileData.imageData, canvas);
  canvas.toBlob((blob) => {
    fileInfo = new File([blob as Blob], fileData.fileName, {
      type: blob?.type,
    });
    utils.setImageFile(fileInfo);
  });
}

export function readImageDataFromFile(imageFile: File): Promise<ImageData> {
  return new Promise<ImageData>((resolve, reject) => {
    getImageDataFromUpload(imageFile, resolve, reject);
  });
}

export function readImageDataFromUrl(imageUrl: string): Promise<ImageData> {
  return new Promise<ImageData>((resolve, reject) => {
    loadImageFromUrl(imageUrl, resolve, reject);
  });
}

export function getFileNameWithoutExtension(fileName: string): string {
  if (fileName.includes('.')) {
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  }

  return fileName;
}

function getImageDataFromUpload(
  uploadedFile: File,
  callback: (imageData: ImageData) => void,
  errorCallback: (reason: string) => void
) {
  const fileReader: FileReader = new FileReader();

  fileReader.onload = (progress: any) => {
    const imgUrl: string = progress.target.result as string;

    loadImageFromUrl(imgUrl, callback, errorCallback);
  };

  fileReader.readAsDataURL(uploadedFile);
}

function loadImageFromUrl(
  imgUrl: string,
  callback: (imageData: ImageData) => void,
  errorCallback: (reason: string) => void
) {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const image: HTMLImageElement = new Image();

  if (imgUrl.startsWith('http')) {
    image.src = CORS__PROXY_URL + imgUrl; // It's a web URL, so we need to access it through a proxy to avoid CORS errors
  } else {
    image.src = imgUrl; // It's a data URL, so we can access it directly
  }

  image.setAttribute('crossOrigin', '');
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    const context: CanvasRenderingContext2D = canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    context.drawImage(image, 0, 0);

    const imageData: ImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );
    callback(imageData);
  };
  image.onerror = () => {
    errorCallback('Something went wrong, are you sure you pasted an image?');
  };
}
