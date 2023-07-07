const lecturersTotalLength = (lecturers) => {
  const length = lecturers.reduce((acc, cur) => (acc += cur.videoDuration), 0);
  return `${Math.floor(length / 3600)}hr ${Math.floor(
    (length % 3600) / 60,
  )}min`;
};

const sectionTotalLength = (sections) => {
  let sumLength = 0;
  for (let index = 0; index < sections.length; index++) {
    const lectures = sections[index].lectures;
    for (let element of lectures) {
      sumLength += element.videoDuration;
    }
  }
  return `${Math.floor(sumLength / 3600)}h ${Math.floor(
    (sumLength % 3600) / 60,
  )}m`;
};

export { lecturersTotalLength, sectionTotalLength };
