from flask import Flask
from flask import request
import json
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)

@app.route('/time', methods=['GET','POST'])
def get_slot_values():
    if request.method == "POST":
        content = request.get_json()
        print(content)
        return jsonify(content)

if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)

# env\Scripts\activate
# set FLASK_DEBUG=TRUE
# flask run