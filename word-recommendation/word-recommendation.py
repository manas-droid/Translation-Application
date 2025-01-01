import fasttext
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/words/recommendation', methods=['GET'])
def word_suggestion():
    lang = request.args.get('lang')
    word = request.args.get('word')

    try: 
        if lang == None or word == None or lang == '' or word == '':
            raise AttributeError("Incorrect query parameter")

        model = fasttext.load_model(f'cc.{lang}.300.bin')
        related_words = model.get_nearest_neighbors(word, k=20)
        related_words = sorted(related_words, key=lambda x: x[0])
        related_words = [word for _, word in related_words]
        related_words = related_words[:4]
        return jsonify({
            "related_words" : related_words
        }), 200
    except (FileNotFoundError, ValueError) :
        return jsonify({"error": "Language not supported", "errorType":"LanguageNotSupport"}), 404
    except AttributeError as ae:
        return jsonify({"error": ae.args[0], "errorType":"IncorrectQuery"})
    except Exception:
        return jsonify({"error": "Something went wrong", "errorType": "Unknown"}), 400
        





if __name__ == '__main__':
    # Specify the custom port here (e.g., 8080)
    app.run(debug=True, host='0.0.0.0', port=8080)
