import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() {}

  public uploadVideo(file): Promise<any> {
      return new Promise((resolve, reject) => {
        const contentType = file.type;
        const bucket = new S3(
          {
            accessKeyId: environment.aws.accessKeyId,
            secretAccessKey: environment.aws.secretAccessKey,
            region: environment.aws.region
          }
        );
        const params = {
          Bucket: environment.aws.S3VideosBucket,
          Key: file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
        };
        return bucket.upload(params, (err, data) => {
          if (err) {
            console.log('There was an error uploading your file: ', err);
            reject(err);
          }
          console.log('Successfully uploaded file.', data);
          resolve(data);
        });

      });
  }
}
