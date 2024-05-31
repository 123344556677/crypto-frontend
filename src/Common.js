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