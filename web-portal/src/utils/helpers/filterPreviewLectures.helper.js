export const filterPreviewLectures = (sections) => {
  let result = [];
  for (let index = 0; index < sections.length; index++) {
    const lectures = sections[index].lectures;
    for (let i = 0; i < lectures.length; i++) {
      const item = lectures[i];
      if (item.preview === true) {
        result.push({
          uuid: item.uuid,
          preview: item.preview,
          name: item.name,
          url: item.url,
          duration:
            ("0" + Math.floor(item.videoDuration)).slice(-2) +
            ":" +
            ("0" + (item.videoDuration % 60)).slice(-2),
        });
      }
    }
  }
  return result;
};
