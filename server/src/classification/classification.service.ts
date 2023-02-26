import { Injectable, Logger } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';
import { Tensor3D } from '@tensorflow/tfjs-node';
import { PythonShell } from 'python-shell';
import { MnistData } from 'src/data';

const modelPath = '../number_classification_model';
@Injectable()
export class ClassificationService {
  private model: tf.LayersModel;

  constructor() {
  }

  async loadModel() {
    if (this.model) {
      return this.model;
    }
    this.model = await tf.loadLayersModel(`file://${modelPath}/model.json`);
    return this.model;
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

  async getImageExamples() {
    const data = new MnistData();
    await data.load();

    const canvasList: any = [];

    // Get the examples
    const examples = data.nextTestBatch(20);
    const numExamples = examples.xs.shape[0];

    // Create a canvas element to render each example
    for (let i = 0; i < numExamples; i++) {
      const imageTensor = tf.tidy(() => {
        // Reshape the image to 28x28 px
        return examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([28, 28, 1]);
      }) as Tensor3D;

      const canvas = document.createElement('canvas');
      canvas.width = 28;
      canvas.height = 28;
      await tf.browser.toPixels(imageTensor, canvas);
      canvasList.push(canvas);

      imageTensor.dispose();
    }
    return canvasList;
  }


  async classifyImage(imageBuffer: Buffer): Promise<number> {
    if (!this.model) {
      await this.loadModel();
    }
    // Load the image buffer
    const imageTensor = tf.node.decodeImage(imageBuffer, 3) as tf.Tensor3D;
    const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [28, 28]);
    const grayscaleImageTensor = resizedImageTensor.mean(-1, true);
    const preprocessedImageTensor = grayscaleImageTensor.expandDims(0);

    // Make the prediction
    const predictions = this.model.predict(preprocessedImageTensor) as tf.Tensor;
    const classifiedNumber = predictions.argMax(1).dataSync()[0];

    // Dispose the tensors
    imageTensor.dispose();
    resizedImageTensor.dispose();
    grayscaleImageTensor.dispose();
    preprocessedImageTensor.dispose();
    predictions.dispose();

    return classifiedNumber;
  }
}
