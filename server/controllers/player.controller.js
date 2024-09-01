import parseRange from "../utils/parseRange.js";
import path from "node:path";
import fs from "node:fs";
import parseRangeFunc from "../utils/parseRange.js";
import getMimeType from "../utils/getMimeType.js";

export const play = () => {};

export const uploadFile = async (req, res) => {
  const file = req.files[0];
  const headers = req.headers;
  console.log(file, headers);
};

export const streamAudio = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join("./audio", filename);

    // check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: "File does not exist",
      });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const mimeType = getMimeType(filePath);

    if (range) {
      const parseRange = parseRangeFunc(range, fileSize);

      if (!parseRange) {
        return res.status(416).json({
          error: "Requested range not satisfiable",
        });
      }

      const { start, end } = parseRange;
      const chunkSize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Type": mimeType,
        "Content-Length": chunkSize,
        "Cache-Control": "no-cache",
      };
      res.writeHead(206, headers);
      fileStream.pipe(res);
    } else {
      const headers = {
        "Content-Type": mimeType,
        "Content-Length": fileSize,
        "Cache-Control": "no-cache",
      };
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error", err);
  }
};
