from flask import Flask
from flask import request
import json
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)

@app.route('/slots', methods=['POST'])
def get_slots():
    input_content = request.get_json()
    print(input_content)
    return jsonify(input_content)

@app.route('/intents', methods=['POST'])
def get_intents():
    input_content = request.get_json()
    print(input_content)
    return jsonify(input_content)


if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)

# env\Scripts\activate
# set FLASK_DEBUG=TRUE
# flask run