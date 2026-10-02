# Local AI review

The prototype has two explicit actions. Sample preview extracts labelled fields in the browser. Review with AI sends the current document through the local Python server to OpenAI. The API key never enters the page.

## Connect it locally

From the repository root, install the Python dependency:

```sh
python3 -m pip install -r prototype/requirements.txt
```

Stop the existing prototype server on port 3460. Then run this in zsh. Paste the key at the hidden prompt, not in chat or into the command itself:

```zsh
read -rs 'OPENAI_API_KEY?OpenAI API key: '
print
export OPENAI_API_KEY
python3 prototype/serve.py
```

Open http://localhost:3460/document-demo.html and select Review with AI. The default model is `gpt-5-mini`; set `OPENAI_MODEL` before starting the server to use another compatible Responses model with structured output and low reasoning effort. Environment files are not loaded automatically.

The ready message means a key and SDK are present. A successful review verifies the actual connection. Invalid credentials, unavailable models or billing limits produce a visible error. The browser never quietly replaces an AI error with sample results.

## What to verify with the real model

1. Run the complete, missing-owner and conflicting-date samples. Check every cited source.
2. Try prose: `The project is Intake. Ada Lovelace owns the delivery. The target is Friday.`
3. Remove the owner and confirm the model leaves it missing. Try conflicting targets and confirm both remain visible.
4. Edit while a review is loading. Results for the previous text must not appear.

No live provider call has been verified yet because a key was not available during implementation. Automated checks use controlled responses and do not establish model quality.

## Implementation and limits

- `prototype/document_api.py` calls the [Responses API with structured output](https://developers.openai.com/api/docs/guides/structured-outputs). It checks exact source quotes, cited line numbers and that extracted values appear in those quotes. This verifies textual evidence, not the model's interpretation or completeness.
- The key is read from the server environment. Document bodies are not logged or persisted. Requests set `store=False`; this does not promise zero provider retention.
- One request runs at a time. Input is limited to 10,000 characters, with a 45-second provider timeout and no automatic provider retries. An aborted browser request can still complete on the provider and incur usage.
- `serve.py` binds to loopback and checks Host and Origin. This development endpoint needs production hosting, access controls and usage budgeting before public deployment.

## Checks without a key

```sh
node --test 'prototype/tests/*.test.js'
python3 -m unittest discover -s prototype/tests -p 'test_*.py'
node docs/handoff/tools/demo-check.mjs
```

The browser check requires the prototype server. Follow the rest of [README.md](README.md) for the full site check.
