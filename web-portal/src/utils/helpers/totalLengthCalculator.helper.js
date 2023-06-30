export const lecturersTotalLength = (lecturers) =>
  lecturers.reduce((acc, cur) => (acc += cur.videoDuration), 0);

export const sectionTotalLength = (sections) =>
  sections.reduce(async (acc, cur) => {
    const lecturesLength = await lecturersTotalLength(cur.lecturers);
    return (acc += lecturesLength);
  }, 0);
