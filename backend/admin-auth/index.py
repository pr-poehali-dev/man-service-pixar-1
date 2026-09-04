import json
import os


def handler(event: dict, context) -> dict:
    """Проверяет пароль администратора и открывает доступ к админ-панели"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_data = json.loads(event.get('body') or '{}')
    password = body_data.get('password', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')

    if admin_password and password == admin_password:
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True})
        }

    return {
        'statusCode': 401,
        'headers': headers,
        'body': json.dumps({'success': False, 'error': 'Неверный пароль'})
    }
