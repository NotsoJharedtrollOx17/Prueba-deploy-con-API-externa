from flask import Flask, request, jsonify
from flask_cors import CORS

def create_app():
    frontend_deploy = '' # TODO change it to the proper frontend deployment URL 

    app = Flask(__name__)
    CORS(app, origins=['http://127.0.0.1:5173', frontend_deploy])

    @app.route('/')
    def index():
        return "<h1>Prueba de conexión a Backend con deploy de frontend en gh-pages<h1>"
    
    @app.route('/test', methods=['GET'])
    def test():
        return jsonify("API.test()")
    
    @app.route('/data_upload', methods=['POST'])
    def data_upload():
        try:
            item = request.json['item']

            return jsonify("API.data_upload()" + item), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 400

    return app

# Run the Flask app
if __name__ == '__main__':
    app = create_app()
    app.run()