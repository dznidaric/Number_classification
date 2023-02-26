import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D
import tensorflowjs as tfjs

# Load the dataset
mnist = keras.datasets.mnist
(train_images, train_labels), (test_images, test_labels) = mnist.load_data()

# Add a channel dimension to the images
train_images, train_labels = train_images[..., tf.newaxis], train_labels
test_images, test_labels = test_images[..., tf.newaxis], test_labels

# Preprocess the data
train_images = train_images / 255.0
test_images = test_images / 255.0

# Define the model
model = keras.Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10)
])

# Compile the model
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Train the model
model.fit(train_images, train_labels, epochs=10)

tfjs.converters.save_keras_model(model, 'number_classification_model')