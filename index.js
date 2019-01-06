const AWS = require('aws-sdk')
AWS.config.setPromisesDependency(Promise)

const s3 = new AWS.S3()

const bucketName = 'sandbox-amazon-s3-glacier--' + new Date() / 1

const main = async () => {
  console.log('creating Bucket: ' + bucketName)
  await s3.createBucket({ Bucket: bucketName }).promise()
  console.log(await s3.listObjects({ Bucket: bucketName }).promise())
  await s3
    .putObject({
      Bucket: bucketName,
      Body: 'hello',
      Key: 'hello.txt',
      StorageClass: 'GLACIER'
    })
    .promise()

  console.log(await s3.listObjects({ Bucket: bucketName }).promise())
  await s3.deleteBucket({ Bucket: bucketName }).promise()
}

main()
