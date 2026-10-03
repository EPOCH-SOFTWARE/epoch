"""Serve the prototype at http://localhost:3460 with caching disabled.

Run: python3 prototype/serve.py
Optional AI review: set OPENAI_API_KEY in the server environment.
"""
import functools
import http.server
import importlib.util
import json
import os
import pathlib
import threading
from urllib.parse import unquote, urlsplit

from document_api import ReviewError, review_document

PORT = 3460
REVIEW_SLOT = threading.BoundedSemaphore(1)


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_json(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            self.close_connection = True

    def local_request(self):
        host = self.headers.get('Host', '')
        port = self.server.server_port
        allowed = {f'localhost:{port}', f'127.0.0.1:{port}'}
        origin = self.headers.get('Origin')
        return host in allowed and (origin is None or origin == f'http://{host}')

    def do_GET(self):
        if urlsplit(self.path).path == '/api/document-review':
            if not self.local_request():
                self.send_json(403, {'error': 'Use the local prototype to review a document.'})
                return
            available = bool(os.environ.get('OPENAI_API_KEY', '').strip()) and importlib.util.find_spec('openai') is not None
            self.send_json(200, {'available': available})
            return
        super().do_GET()

    def send_head(self):
        # Only browser assets are served. Backend files and hidden files stay local.
        path = pathlib.PurePosixPath(unquote(urlsplit(self.path).path))
        if any(part.startswith('.') for part in path.parts) or (path.suffix not in {
                '.html', '.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.woff', '.woff2'} and str(path) != '/'):
            self.send_error(404)
            return None
        return super().send_head()

    def do_POST(self):
        if urlsplit(self.path).path != '/api/document-review':
            self.send_json(404, {'error': 'Review endpoint not found.'})
            return
        if not self.local_request():
            self.send_json(403, {'error': 'Use the local prototype to review a document.'})
            return
        if self.headers.get_content_type() != 'application/json':
            self.send_json(415, {'error': 'Send the document as JSON.'})
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
        except ValueError:
            length = 0
        if not 0 < length <= 65536:
            self.send_json(413, {'error': 'The document request is too large or empty.'})
            return
        try:
            self.connection.settimeout(10)
            payload = json.loads(self.rfile.read(length))
        except (ValueError, UnicodeError, TimeoutError):
            self.send_json(400, {'error': 'The document request could not be read.'})
            return
        if not isinstance(payload, dict) or set(payload) != {'document'}:
            self.send_json(400, {'error': 'Include one document to review.'})
            return
        if not REVIEW_SLOT.acquire(blocking=False):
            self.send_json(429, {'error': 'A review is already running. Please try again shortly.'})
            return
        try:
            fields = review_document(payload['document'])
            self.send_json(200, {'fields': fields})
        except ReviewError as problem:
            self.send_json(problem.status, {'error': str(problem)})
        finally:
            REVIEW_SLOT.release()


def main():
    handler = functools.partial(NoCacheHandler, directory=str(pathlib.Path(__file__).parent))
    with http.server.ThreadingHTTPServer(('127.0.0.1', PORT), handler) as server:
        print(f'EPOCH prototype on http://localhost:{PORT}', flush=True)
        server.serve_forever()


if __name__ == '__main__':
    main()
