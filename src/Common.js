import storage from "./Api/firebase";
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";

export const setLocalStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const refreshPage=()=>{
  window.location.reload(false)
}
export const logOut=()=>{
  window.location.href = "/";
  localStorage.clear();
}

export const roundToOneDecimal = (value) => {
    if (!isNaN(value) && value.toString().includes('.')) {
      return Math.round(value * 10) / 10;
    }
    return value;
  };

export function WaitingAnimation() {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adding a semi-transparent background for better visual effect
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    pointerEvents: 'none', // Make the entire screen non-clickable
  };

  const iframeStyle = {
    width: '300px',
    height: '300px',
    pointerEvents: 'auto', // Allow interaction with the iframe if necessary
    border: 'none', // Remove default iframe border
  };

  return (
    <div style={overlayStyle}>
      <iframe
        title="Loading"
        src="https://lottie.host/embed/aa525350-5554-4aa2-b2df-3a6010c0425f/MGxAPzcSl9.json"
        style={iframeStyle}
      />
    </div>
  );
}
export const MAX_FILE_SIZE = 100 * 1024;

export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

export const uploadImageToFirebase = async (base64Video) => {
  const fileName = Date.now() + '.jpg';
  const fileRef = ref(storage, fileName);

  try {
    const snapshot = await uploadString(fileRef, base64Video, 'data_url');
    console.log('Uploaded a blob or file!', snapshot);

    // Get the URL of the uploaded image location
    const url = await getDownloadURL(fileRef);
    console.log(url, "Firebase URL");

    return url;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error; // Optionally re-throw the error for handling elsewhere
  }
};