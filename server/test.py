import numpy
import pandas
import math
import json
from keras.utils import np_utils
from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json
#setUp Decoder as well
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("model.h5")
print("Loaded model from disk")
# cfg = loaded_model.get_config()
# actFunc = cfg[len(cfg)-1]['config']['activation']

with open("lib.json") as json_data:
    lib_data = json.load(json_data)
# evaluate loaded model on test data
input= numpy.array([4, 0, 2, 1, 1, 1, 0, 1, 0, 2, 1, 1, 0, 2, 2, 0, 0, 0, 1, 0, 3, 1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0]).reshape(1,35)
loaded_model.compile(loss=lib_data['lossType'], optimizer='adam', metrics=['accuracy'])
score = loaded_model.predict(input, batch_size=150, verbose=0)
maxIndex = numpy.argmax(score[0])
result = lib_data['decoder'][maxIndex.astype('str')]
print(result)

# print "%s: %.2f%%" % (loaded_model.metrics_names[1], score[0]*100)