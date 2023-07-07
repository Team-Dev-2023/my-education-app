function createNewListSectionPut(
  listSectionPut,
  uuidLectureChange,
  nameValueChange,
  value
) {
  let listSectionPutClone = JSON.parse(JSON.stringify(listSectionPut));
  if (listSectionPutClone) {
    for (const section of listSectionPutClone) {
      if (section.lectures) {
        const lecture = section.lectures.find(
          (l) => l.uuid === uuidLectureChange
        );
        if (lecture && nameValueChange === "description") {
          lecture.description = value;

          break;
        }
        if (lecture && nameValueChange === "name") {
          lecture.name = value;
          break;
        }
        if (lecture && nameValueChange === "url") {
          lecture.url = value;
          break;
        }
        if (lecture && nameValueChange === "preview") {
          lecture.preview = value;
          break;
        }
      }
    }
  }
  return listSectionPutClone;
}
export default createNewListSectionPut;
