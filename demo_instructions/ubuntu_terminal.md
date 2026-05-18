# Ubuntu Terminal - Sample Instructions

_Note: If you ran the application on a non-default port, change the links accordingly._

## 1. Minify JSON

```
curl -X POST http://localhost:8080/api/json/minify \
     -H "Content-Type: application/json" \
     -d '{"hello":      "world", "test": true}'
```

## 2. Beautify JSON

```
curl -X POST http://localhost:8080/api/json/beautify \
     -H "Content-Type: application/json" \
     -d '{"hello":"world","nested":{"key":"value"}}'
```

## 3. Whitelist Filter

```
curl -X POST "http://localhost:8080/api/json/filter/whitelist?keys=name,role" \
     -H "Content-Type: application/json" \
     -d '{"name": "Jan", "age": 25, "role": "admin"}'
```

## 4. Blacklist Filter (Remove Keys)

```
curl -X POST "http://localhost:8080/api/json/filter/blacklist?keys=name" \
     -H "Content-Type: application/json" \
     -d '{"name": "Jan", "age": 25, "role": "admin"}'
```

## 5. Compare / Diff JSON

```
curl -X POST "http://localhost:8080/api/json/diff?jsonInputB=%7B%22age%22%3A21%2C%22role%22%3A%22engineer%22%7D" \
     -H "Content-Type: application/json" \
     -d '{"name": "Jan", "age": 20}'
```