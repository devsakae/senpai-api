
const getLanguage = phoneid => {
  switch (phoneid) {
    case phoneid.startsWith("1"):
      return "en";
    
    case phoneid.startsWith("54"):
      return ""

    default:
      return "pt-br";
    
  }
}

module.exports = {
  getLanguage
}