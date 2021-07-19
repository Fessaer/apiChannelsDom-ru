const keyInObject = (object, key) => {
  try {
    if (typeof object[key] !== 'undefined') {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
export default keyInObject;
