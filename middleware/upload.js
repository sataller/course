const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment');
const aws = require('aws-sdk');
const keys = require('../config/keys');

const s3 = new aws.S3({
    accessKeyId: keys.aws.accessKeyID,
    secretAccessKey: keys.aws.secretAccessKey,
    Bucket: keys.aws.bucketName,
});

module.exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: keys.aws.bucketName,
        acl: 'public-read',
        key: function (req, file, cb) {
            const date = moment().format('DDMMYYYY-HHmmss_SSS');
            cb(null, `${date}-${file.originalname}`);
        },
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
        fileFilter: function (req, file, cb) {
            fileFilter(file, cb);
        },
    }),
}).single('image');

const fileFilter = (file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false, "Images only!");
    }
};