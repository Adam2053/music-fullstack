const parseRange = (rangeHeader, fileSize) => {
  const byteRange = rangeHeader.replace(/bytes=/, "").split("-");
  const start = parseInt(byteRange[0], 10);
  const end = byteRange[1] ? parseInt(byteRange[1], 10) : fileSize - 1;

  //validate range
  if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
    return null;
  }
  return { start, end };
};

export default parseRange;

