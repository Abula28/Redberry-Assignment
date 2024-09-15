export const imgToBinary = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Read as base64
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString().split(",")[1]; // Strip the metadata part
        resolve(base64String); // Resolve only the base64 string
      } else {
        reject("Error converting image to base64");
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
