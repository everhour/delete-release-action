# Delete Release Action

This action deletes release and corresponding tag by tag name.

## Inputs

### `tag_name`

**Required** The name of the tag. For example: `issue-4334`

## Outputs

No output 

## Example usage

```yml
uses: everhour/delete-release-action@v2.0.0
with:
  tag_name: ${{ github.ref }}
```

## Test

```bash
GITHUB_TOKEN=your-token GITHUB_REPOSITORY=everhour/some-repo INPUT_TAG_NAME=issue-1234 node index.js
```
