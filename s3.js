require('dotenv').config()
require('dotenv')
const AWS = require('aws-sdk')
const fs = require('fs')

const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET;
const region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET_NAME;


AWS.config.update({region: region});

const s3 = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey
})

function uploadFile(file) {

    let fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream
    }
    return s3.upload(uploadParams).promise()
}

function getFileStream(filename) {
    const downloadParams = {
        Bucket: bucketName,
        Key: filename,
    }
  
    let fileStream = s3.getObject(downloadParams).createReadStream()
    return fileStream
  }

exports.uploadFile = uploadFile
exports.getFileStream = getFileStream