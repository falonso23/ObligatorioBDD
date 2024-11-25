from flask import jsonify
import traceback

def handleError(e):
    error_type = type(e).__name__
    stack_trace = traceback.format_exc() 
    return jsonify({
        'error': error_type,
        'message': str(e),
        'stack_trace': stack_trace
    }), 500

def throwError(message):
    return jsonify({
        'error': "Custom",
        'message': message,
    }), 400

def generateNewId(last_id):
    splitted = last_id.split("-")
    last_number = int(splitted[1])
    new_number = str(last_number+1)
    new_id = splitted[0] + "-" +(5-len(new_number))*"0" + new_number
    return new_id