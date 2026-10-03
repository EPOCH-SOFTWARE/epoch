"""Server boundary tests. No API key or network calls required."""
import json
import pathlib
import sys
import unittest
from types import SimpleNamespace
from unittest.mock import Mock

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from document_api import ReviewError, review_document, validate_review

DOCUMENT = '📄 Handover\nProject: Intake\nOwner: Ada Lovelace\nTarget: Friday\nTarget: Monday'


def response_fields():
    return {
        'project': {'status': 'found', 'values': ['Intake'], 'sources': [{'line': 2, 'quote': 'Project: Intake'}]},
        'owner': {'status': 'found', 'values': ['Ada Lovelace'], 'sources': [{'line': 3, 'quote': 'Owner: Ada Lovelace'}]},
        'target': {'status': 'conflict', 'values': ['Friday', 'Monday'], 'sources': [
            {'line': 4, 'quote': 'Target: Friday'}, {'line': 5, 'quote': 'Target: Monday'}]},
    }


class ReviewTests(unittest.TestCase):
    def test_exact_evidence_and_browser_offsets(self):
        fields = validate_review(DOCUMENT, response_fields())
        source = fields['owner']['sources'][0]
        self.assertEqual(source['start'], 28)
        self.assertEqual(source['end'], 47)
        self.assertEqual(fields['owner']['value'], 'Ada Lovelace')
        self.assertIsNone(fields['target']['value'])

    def test_missing_field_can_have_no_sources(self):
        fields = response_fields()
        fields['owner'] = {'status': 'missing', 'values': [], 'sources': []}
        self.assertEqual(validate_review(DOCUMENT, fields)['owner']['status'], 'missing')

    def test_rejects_invented_or_mislocated_evidence(self):
        for patch in [{'quote': 'Owner: Nobody'}, {'line': 2}, {'line': True}, {'quote': ''}]:
            fields = response_fields()
            fields['owner']['sources'][0].update(patch)
            with self.subTest(patch=patch), self.assertRaises(ReviewError):
                validate_review(DOCUMENT, fields)

    def test_rejects_values_absent_from_evidence(self):
        fields = response_fields()
        fields['owner']['values'] = ['A different owner']
        with self.assertRaises(ReviewError):
            validate_review(DOCUMENT, fields)

    def test_rejects_inconsistent_status_and_invalid_shapes(self):
        for patch in [{'status': 'found'}, {'status': 'missing'}, {'values': ['Friday']},
                      {'sources': []}, {'status': 'made-up'}, {'values': 'Friday'}]:
            fields = response_fields()
            fields['target'].update(patch)
            with self.subTest(patch=patch), self.assertRaises(ReviewError):
                validate_review(DOCUMENT, fields)
        with self.assertRaises(ReviewError):
            validate_review(DOCUMENT, [])

    def test_provider_request_and_success(self):
        client = Mock()
        client.responses.create.return_value = SimpleNamespace(status='completed', output_text=json.dumps(response_fields()))
        result = review_document(DOCUMENT, client=client, model='gpt-5-mini')
        request = client.responses.create.call_args.kwargs
        self.assertFalse(request['store'])
        self.assertTrue(request['text']['format']['strict'])
        self.assertEqual(request['model'], 'gpt-5-mini')
        self.assertEqual(request['input'], DOCUMENT)
        self.assertEqual(result['project']['value'], 'Intake')

    def test_rejects_incomplete_refused_or_invalid_response(self):
        for status, output in [('incomplete', '{}'), ('completed', ''), ('completed', 'not json')]:
            client = Mock()
            client.responses.create.return_value = SimpleNamespace(status=status, output_text=output)
            with self.subTest(status=status, output=output), self.assertRaises(ReviewError):
                review_document(DOCUMENT, client=client)

    def test_provider_failures_do_not_expose_private_error_text(self):
        for code, expected in [(401, 503), (403, 503), (429, 429), (500, 502)]:
            client = Mock()
            problem = RuntimeError('private request content')
            problem.status_code = code
            client.responses.create.side_effect = problem
            with self.subTest(code=code), self.assertRaises(ReviewError) as caught:
                review_document(DOCUMENT, client=client)
            self.assertEqual(caught.exception.status, expected)
            self.assertNotIn('private request content', str(caught.exception))
        client.responses.create.side_effect = TimeoutError('private request content')
        with self.assertRaises(ReviewError) as caught:
            review_document(DOCUMENT, client=client)
        self.assertEqual(caught.exception.status, 504)

    def test_crlf_and_repeated_quotes_resolve_to_the_cited_line(self):
        document = 'Owner: Ada Lovelace\r\nOwner: Ada Lovelace'
        fields = {key: {'status': 'missing', 'values': [], 'sources': []} for key in ('project', 'owner', 'target')}
        fields['owner'] = {'status': 'found', 'values': ['Ada Lovelace'], 'sources': [{'line': 2, 'quote': 'Owner: Ada Lovelace'}]}
        source = validate_review(document, fields)['owner']['sources'][0]
        self.assertEqual(document[source['start']:source['end']], source['quote'])
        self.assertEqual(source['start'], 21)

    def test_input_limits_before_calling_provider(self):
        client = Mock()
        for document in ['', '  ', None, 'x' * 10001]:
            with self.subTest(document=str(document)[:10]), self.assertRaises(ReviewError):
                review_document(document, client=client)
        client.responses.create.assert_not_called()


if __name__ == '__main__':
    unittest.main()
