1. Creación de snippets
- Ctrl + Shift + P
    - Configure Snippets
    - Escoger apartado deseado (en este caso es markdown, por lo que se escoge: markdown.json)
```json
{
  "HTML Anchor Tag": {
    "prefix": "anchor",
    "body": [
      "<a name=\"$1\"></a>"
    ],
    "description": "Insert an HTML anchor"
  },
  "Markdown Section Link": {
    "prefix": "sectionlink",
    "body": [
      "[$1](#$2)"
    ],
    "description": "Insert a markdown link to a section"
  }
}

```