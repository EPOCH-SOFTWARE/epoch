"""Exercise the local HTTP boundary without contacting OpenAI."""
import functools
import http.client
import http.server
import json
import os
import pathlib
import sys
import threading
import unittest
from unittest.mock import patch

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from serve import NoCacheHandler, REVIEW_SLOT
from document_api import ReviewError


class ServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(NoCacheHandler, directory=str(pathlib.Path(__file__).resolve().parents[1]))
        cls.server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def request(self, body=None, origin=None, path='/api/document-review', method='POST', content_type='application/json'):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port, timeout=5)
        headers = {'Content-Type': content_type}
        if origin:
            headers['Origin'] = origin
        connection.request(method, path, body=body, headers=headers)
        response = connection.getresponse()
        result = (response.status, response.read(), response.getheader('Cache-Control'))
        connection.close()
        return result

    def test_status_without_credentials(self):
        with patch.dict(os.environ, {'OPENAI_API_KEY': ''}):
            status, body, cache = self.request(method='GET')
        self.assertEqual(status, 200)
        self.assertFalse(json.loads(body)['available'])
        self.assertEqual(cache, 'no-store')

    def test_success(self):
        with patch('serve.review_document', return_value={'project': 'verified'}) as review:
            status, body, _ = self.request(json.dumps({'document': 'Project: Intake'}))
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body)['fields']['project'], 'verified')
        review.assert_called_once_with('Project: Intake')

    def test_rejects_cross_origin_and_bad_content_type_before_model(self):
        with patch('serve.review_document') as review:
            self.assertEqual(self.request('{}', origin='https://another-site.example')[0], 403)
            self.assertEqual(self.request('{}', content_type='text/plain')[0], 415)
        review.assert_not_called()

    def test_bad_json_oversize_unknown_route_and_invalid_document(self):
        for body in ['{bad', '[]', '{}', '{"document":null}', '{"document":""}', '{"document": "' + 'x' * 10001 + '"}']:
            with self.subTest(body=body[:20]):
                self.assertEqual(self.request(body)[0], 400)
        self.assertEqual(self.request('x' * 70000)[0], 413)
        self.assertEqual(self.request('{}', path='/api/not-real')[0], 404)

    def test_missing_key_and_timeout_have_safe_errors(self):
        with patch.dict(os.environ, {'OPENAI_API_KEY': ''}):
            status, body, _ = self.request('{"document":"Project: Intake"}')
        self.assertEqual(status, 503)
        self.assertIn('sample preview', json.loads(body)['error'])
        with patch('serve.review_document', side_effect=ReviewError('Please try again.', 504)):
            self.assertEqual(self.request('{"document":"Project: Intake"}')[0], 504)

    def test_concurrent_reviews_are_limited(self):
        REVIEW_SLOT.acquire()
        try:
            with patch('serve.review_document') as review:
                self.assertEqual(self.request('{"document":"Project: Intake"}')[0], 429)
                review.assert_not_called()
        finally:
            REVIEW_SLOT.release()

    def test_foreign_host_is_rejected(self):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port, timeout=5)
        connection.request('POST', '/api/document-review', '{}', {'Host': 'another-site.example', 'Content-Type': 'application/json'})
        response = connection.getresponse()
        self.assertEqual(response.status, 403)
        response.read()
        connection.close()

    def test_serves_page_but_not_backend_or_hidden_files(self):
        self.assertEqual(self.request(method='GET', path='/document-demo.html')[0], 200)
        for path in ['/serve.py', '/document_api.py', '/.env', '/tests/test_document_api.py']:
            with self.subTest(path=path):
                self.assertEqual(self.request(method='GET', path=path)[0], 404)


if __name__ == '__main__':
    unittest.main()
