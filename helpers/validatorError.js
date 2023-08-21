const validatorError = err => {
    if (!err) return null;
    const errors = Object.values(err);
    let result = '';
    if (Array.isArray(errors)) {
      const firstIndex = errors[0];
      result = firstIndex ? firstIndex[0] : null;
    }
    return result;
  };
  
  export default validatorError;
  