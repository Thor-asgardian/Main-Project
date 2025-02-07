import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

from sklearn import preprocessing
from subprocess import check_output

from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import SGD
from sklearn.model_selection import StratifiedKFold

# Load dataset
data = pd.read_csv('data.csv')
print(data.head())

# Drop unnecessary columns
data = data.drop(['id', 'Unnamed: 32'], axis=1, errors='ignore')

# Encode diagnosis column
data['diagnosis'] = data['diagnosis'].map({'M': 1, 'B': 0})

# Standardize the data
datas = pd.DataFrame(preprocessing.scale(data.iloc[:, 1:]))
datas.columns = list(data.iloc[:, 1:].columns)
datas['diagnosis'] = data['diagnosis']

# Prepare training data
X = datas.drop('diagnosis', axis=1).values
Y = datas['diagnosis'].values

# Define the model
model = Sequential()
model.add(Dense(128, activation="relu", input_dim=X.shape[1]))
model.add(Dropout(0.25))
model.add(Dense(32, activation="relu"))
model.add(Dropout(0.25))
model.add(Dense(32, activation="relu"))
model.add(Dense(1, activation='sigmoid'))  # Binary classification output

# Compile the model
sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss="binary_crossentropy", optimizer=sgd, metrics=['accuracy'])

# Train the model
model.fit(X, Y, batch_size=5, epochs=10, validation_split=0.33)

# K-Fold Cross Validation
seed = 3
np.random.seed(seed)

k = 2
kfold = StratifiedKFold(n_splits=k, shuffle=True, random_state=seed)
cvscores = []

for train, test in kfold.split(X, Y):
    model.fit(X[train], Y[train], epochs=10, batch_size=10, verbose=0)
    scores = model.evaluate(X[test], Y[test], verbose=0)
    print("%s: %.2f%%" % (model.metrics_names[1], scores[1] * 100))
    cvscores.append(scores[1] * 100)

print("%d-fold cross-validation accuracy: %.2f%% (+/- %.2f%%)" % (k, np.mean(cvscores), np.std(cvscores)))