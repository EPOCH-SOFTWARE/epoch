"""Serve the prototype at http://localhost:3460 with caching disabled, so every edit shows on refresh.

Run: python3 prototype/serve.py
"""

import functools
import http.server
import pathlib

PORT = 3460


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    handler = functools.partial(NoCacheHandler, directory=str(pathlib.Path(__file__).parent))
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as server:
        print(f"EPOCH prototype on http://localhost:{PORT}")
        server.serve_forever()


if __name__ == "__main__":
    main()
