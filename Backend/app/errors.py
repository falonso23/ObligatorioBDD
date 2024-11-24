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