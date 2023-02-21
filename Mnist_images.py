import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D

mnist = keras.datasets.mnist

def get_random_images(num_images):
    # Load the dataset
    _, (test_images, test_labels) = mnist.load_data()

    # Select random images
    random_indices = tf.random.shuffle(
        tf.range(test_images.shape[0]))[:num_images]
    images = tf.gather(test_images, random_indices)
    labels = tf.gather(test_labels, random_indices)

    return (images.numpy(), labels.numpy())
