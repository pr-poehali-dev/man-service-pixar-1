import json
import os
import psycopg2

CATEGORIES = ['master', 'parts', 'sto', 'tire', 'tow']

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}


def respond(status: int, data) -> dict:
    return {'statusCode': status, 'headers': HEADERS, 'body': json.dumps(data, ensure_ascii=False, default=str)}


def esc(value) -> str:
    return str(value or '').replace("'", "''")


def handler(event: dict, context) -> dict:
    """Каталог грузового портала: просмотр компаний и управление ими из админки"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    table = f'{schema}.portal_companies'
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    if method == 'GET':
        cur.execute(
            f"SELECT id, category, name, address, phone, work_hours, description "
            f"FROM {table} ORDER BY name"
        )
        rows = cur.fetchall()
        keys = ['id', 'category', 'name', 'address', 'phone', 'work_hours', 'description']
        conn.close()
        return respond(200, {'companies': [dict(zip(keys, r)) for r in rows]})

    body = json.loads(event.get('body') or '{}')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password or body.get('password') != admin_password:
        conn.close()
        return respond(401, {'error': 'Нет доступа'})

    if method == 'POST':
        category = body.get('category', '')
        name = body.get('name', '').strip()
        if category not in CATEGORIES or not name:
            conn.close()
            return respond(400, {'error': 'Укажите категорию и название'})
        cur.execute(
            f"INSERT INTO {table} (category, name, address, phone, work_hours, description) "
            f"VALUES ('{category}', '{esc(name)}', '{esc(body.get('address'))}', '{esc(body.get('phone'))}', "
            f"'{esc(body.get('work_hours'))}', '{esc(body.get('description'))}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.close()
        return respond(201, {'id': new_id})

    if method == 'PUT':
        company_id = int(body.get('id', 0))
        category = body.get('category', '')
        name = body.get('name', '').strip()
        if category not in CATEGORIES or not name or not company_id:
            conn.close()
            return respond(400, {'error': 'Укажите категорию и название'})
        cur.execute(
            f"UPDATE {table} SET category='{category}', name='{esc(name)}', address='{esc(body.get('address'))}', "
            f"phone='{esc(body.get('phone'))}', work_hours='{esc(body.get('work_hours'))}', "
            f"description='{esc(body.get('description'))}' WHERE id={company_id}"
        )
        conn.close()
        return respond(200, {'success': True})

    if method == 'DELETE':
        company_id = int(body.get('id', 0))
        cur.execute(f"DELETE FROM {table} WHERE id={company_id}")
        conn.close()
        return respond(200, {'success': True})

    conn.close()
    return respond(405, {'error': 'Method not allowed'})
