import AWS from "aws-sdk";
import { settings } from "../config/settings.js";
export class AwsUploadService {
    static async uploadFileWithContent(fileName, fileContent) {
        AWS.config.update({
            accessKeyId: settings.awsBucketCredentials.accessKeyId,
            secretAccessKey: settings.awsBucketCredentials.secretAccessKey,
        });
        const bucketName = settings.awsBucketCredentials.bucketName;
        const params = {
            Bucket: `${bucketName}/${settings.environment}/user-profiles`,
            Key: fileName,
            Body: fileContent,
            contentType: "text/plain",
        };
        const s3 = new AWS.S3();
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err)
                    reject(err);
                resolve(data.Location);
            });
        });
    }
}
