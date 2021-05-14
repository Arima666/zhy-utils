export default function getDirNameFromPath(path: string) {
  const pathArr = path.split('\\');
  return pathArr[pathArr.length - 1];
}
