const AWS = require('aws-sdk');
const multer = require('multer');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: 'AKIAXYMZNWMA5NCGUH7K',
    secretAccessKey: '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',
  });
  

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: 'oramsys.com',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send({ message: 'File uploaded successfully!', url: data.Location });
  });
};

// Export middleware and controller
module.exports = {
  upload: upload.single('file'),
  uploadFile,
};
