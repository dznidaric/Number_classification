import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D

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

# Evaluate the model on the test set
test_loss, test_acc = model.evaluate(test_images,  test_labels, verbose=2)

# Save the model
model.save('number_classification_model')

# Function for classifying a single image
def classify_image(image):
    # Load the model
    model = keras.models.load_model('number_classification_model')
    
    # Preprocess the image
    image = image / 255.0
    image = tf.expand_dims(image, axis=0)
    image = tf.expand_dims(image, axis=-1)
    
    # Make the prediction
    prediction = model.predict(image)
    class_id = tf.argmax(prediction[0]).numpy()
    
    return class_id

# Function for getting random images from the MNIST dataset
def get_random_images(num_images):
    # Load the dataset
    _, (test_images, test_labels) = mnist.load_data()
    
    # Select random images
    random_indices = tf.random.shuffle(tf.range(test_images.shape[0]))[:num_images]
    images = tf.gather(test_images, random_indices)
    labels = tf.gather(test_labels, random_indices)
    
    return (images.numpy(), labels.numpy())
