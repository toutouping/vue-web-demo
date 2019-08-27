export function checkDataType (data) {
  const typeString = Object.prototype.toString.call(data);

  return typeString.slice(8, -1);
}
