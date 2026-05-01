import urllib.request
import json
import urllib.error

url = 'http://127.0.0.1:8000/api/accounts/register/'
data = json.dumps({"username": "new_user_123", "email": "new@test.com", "password": "password123"}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')

try:
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
