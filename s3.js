require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
require('fs')


const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET;
const region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new S3({
    region, 
    accessKey,
    secretKey
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