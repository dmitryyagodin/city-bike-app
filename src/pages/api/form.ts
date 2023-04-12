// help source: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
// https://www.youtube.com/watch?v=Zpz7RUcVPrs&t=868s
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import * as csv from 'fast-csv';
import fs from 'fs';
import prisma from '@db';

type RequestWithFile = NextApiRequest & {
  file: Express.Multer.File;
};

const options = {
  objectMode: true,
  ignoreEmpty: true,
  discardUnmappedColumns: true,
  renameHeaders: true,
  headers: [
    undefined,
    'stationId',
    'name',
    undefined,
    undefined,
    'address',
    undefined,
    'city',
    undefined,
    undefined,
    'capacity',
    'latitude',
    'longitude',
  ],
}; // import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public',
    filename: (req, file, callback) => callback(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single('csv-file');
apiRoute.use(uploadMiddleware);

apiRoute.post((req: RequestWithFile, res: NextApiResponse) => {
  uploadCsv('public/' + req.file.filename);

  res.status(200).json({ data: 'success' });
});

function uploadCsv(path: string) {
  const stream = fs.createReadStream(path);
  let csvDataColl: Station[] = [];

  const fileStream = csv
    .parse(options)
    .on('data', async (data) => {
      csvDataColl.push(data);

      if (csvDataColl.length === 50) {
        const res = await prisma.station.createMany({
          data: csvDataColl,
        });
        csvDataColl = [];
      }
    })
    .on('end', async () => {
      const res = await prisma.station.createMany({
        data: csvDataColl,
      });
    });

  stream.pipe(fileStream);
}

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
