import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';
import { PythonShell } from 'python-shell';

@Injectable()
export class ClassificationService {
    private model: tf.LayersModel;

    async loadModel(): Promise<void> {
        this.model = await tf.loadLayersModel('../../../number_classification_model/saved_model.pb');
    }

    async getRandomImages(): Promise<any> {
        const options = {
          mode: "text" as "text",
          pythonPath: 'C:/Users/Domagoj/AppData/Local/Programs/Python/Python36', // path to  Python 3 installation
          scriptPath: '../../../', // path to your Python script
          args: ['6'], // number of images to select
        };
    
        const pyshell = new PythonShell('Mnist_images.py', options);
    
        let images = [];
    
        pyshell.on('message', (message) => {
          images.push(Buffer.from(message, 'base64'));
        });
    
        return new Promise((resolve, reject) => {
          pyshell.on('close', (code, signal) => {
            if (code === 0) {
              resolve(images);
            } else {
              reject(new Error(`Python script exited with code ${code}`));
            }
          });
        });
      }

    async classifyImage(imageBuffer: Buffer): Promise<number> {
        // Load the image buffer
        const imageTensor = tf.node.decodeImage(imageBuffer);

        // Preprocess the image
        const preprocessedImage = tf.tidy(() => {
            // Convert the image to grayscale
            const grayscaleImage = imageTensor.mean(2);

            // Resize the image to the input shape of the model
            const resizedImage = grayscaleImage.resizeBilinear([28, 28]);

            // Expand the dimensions to match the input shape of the model
            const expandedImage = resizedImage.expandDims(0).expandDims(-1);

            // Normalize the pixel values to be between 0 and 1
            return expandedImage.toFloat().div(255);
        });

        // Make the prediction
        const predictions = this.model.predict(preprocessedImage) as tf.Tensor;
        const classId = predictions.argMax(1).dataSync()[0];

        // Dispose the tensors
        imageTensor.dispose();
        preprocessedImage.dispose();
        predictions.dispose();

        return classId;
    }
}
