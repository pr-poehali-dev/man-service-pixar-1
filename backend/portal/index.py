import json
import os
import psycopg2

CATEGORIES = ['master', 'parts', 'sto', 'tire', 'tow']
STATUSES = ['pending', 'approved']
KEYS = ['id', 'category', 'name', 'address', 'phone', 'work_hours', 'description', 'status', 'contact_name']

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}


def respond(status: int, data) -> dict:
    return {'statusCode': status, 'headers': HEADERS, 'body': json.dumps(data, ensure_ascii=False, default=str)}


def esc(value, limit: int = 500) -> str:
    return str(value or '').strip()[:limit].replace("'", "''")


def handler(event: dict, context) -> dict:
    """Каталог грузового портала: публичный список, заявки на добавление и модерация администратором"""
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
    select = f"SELECT {', '.join(KEYS)} FROM {table}"
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    def rows_to_list(rows):
        return [dict(zip(KEYS, r)) for r in rows]

    if method == 'GET':
        cur.execute(f"{select} WHERE status = 'approved' ORDER BY name")
        companies = rows_to_list(cur.fetchall())
        for c in companies:
            c.pop('contact_name', None)
        conn.close()
        return respond(200, {'companies': companies})

    body = json.loads(event.get('body') or '{}')
    action = body.get('action', '')

    if method == 'POST' and action == 'submit':
        category = body.get('category', '')
        name = str(body.get('name', '')).strip()
        phone = str(body.get('phone', '')).strip()
        if category not in CATEGORIES or not name or not phone:
            conn.close()
            return respond(400, {'error': 'Укажите категорию, название и телефон'})
        cur.execute(
            f"INSERT INTO {table} (category, name, address, phone, work_hours, description, status, contact_name) "
            f"VALUES ('{category}', '{esc(name, 200)}', '{esc(body.get('address'), 300)}', '{esc(phone, 50)}', "
            f"'{esc(body.get('work_hours'), 200)}', '{esc(body.get('description'), 1000)}', 'pending', "
            f"'{esc(body.get('contact_name'), 200)}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.close()
        return respond(201, {'id': new_id, 'status': 'pending'})

    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password or body.get('password') != admin_password:
        conn.close()
        return respond(401, {'error': 'Нет доступа'})

    if method == 'POST' and action == 'list':
        cur.execute(f"{select} ORDER BY CASE WHEN status = 'pending' THEN 0 ELSE 1 END, created_at DESC")
        companies = rows_to_list(cur.fetchall())
        conn.close()
        return respond(200, {'companies': companies})

    if method == 'POST':
        category = body.get('category', '')
        name = str(body.get('name', '')).strip()
        if category not in CATEGORIES or not name:
            conn.close()
            return respond(400, {'error': 'Укажите категорию и название'})
        cur.execute(
            f"INSERT INTO {table} (category, name, address, phone, work_hours, description, status) "
            f"VALUES ('{category}', '{esc(name, 200)}', '{esc(body.get('address'), 300)}', '{esc(body.get('phone'), 50)}', "
            f"'{esc(body.get('work_hours'), 200)}', '{esc(body.get('description'), 1000)}', 'approved') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.close()
        return respond(201, {'id': new_id})

    if method == 'PUT':
        company_id = int(body.get('id', 0))
        category = body.get('category', '')
        name = str(body.get('name', '')).strip()
        status = body.get('status', 'approved')
        if category not in CATEGORIES or not name or not company_id or status not in STATUSES:
            conn.close()
            return respond(400, {'error': 'Укажите категорию и название'})
        cur.execute(
            f"UPDATE {table} SET category='{category}', name='{esc(name, 200)}', address='{esc(body.get('address'), 300)}', "
            f"phone='{esc(body.get('phone'), 50)}', work_hours='{esc(body.get('work_hours'), 200)}', "
            f"description='{esc(body.get('description'), 1000)}', status='{status}' WHERE id={company_id}"
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
