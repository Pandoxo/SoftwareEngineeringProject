# Postman - Sample Instructions

_Note: If you ran the application on a non-default port, change the links accordingly._

## 1. Minify JSON

* Method: POST

* URL: http://localhost:8080/api/json/minify

* Body (raw -> JSON):

```
    {
        "hello":      "world",
        "test": true
    }
```

## 2. Beautify JSON

* Method: POST

* URL: http://localhost:8080/api/json/beautify

* Body (raw -> JSON):

```
    {"hello":"world","nested":{"key":"value"}}
```

## 3. Whitelist Filter

* Method: POST

* URL: http://localhost:8080/api/json/filter/whitelist

* Params Tab: Add Key "keys" with Value "name,role"

* Body (raw -> JSON):

```
    {
        "name": "Jan",
        "age": 25,
        "role": "admin"
    }
```

## 4. Blacklist Filter (Remove Keys)

* Method: POST

* URL: http://localhost:8080/api/json/filter/blacklist

* Params Tab: Add Key "keys" with Value "name"

* Body (raw -> JSON):

```
    {
        "name": "Jan",
        "age": 25,
        "role": "admin"
    }
```

## 5. Compare / Diff JSON

* Method: POST

* URL: http://localhost:8080/api/json/diff

* Params Tab: Add Key jsonInputB with Value {"age":21,"role":"engineer"}

* Select the Value -> EncodeURlComponent

* Body (raw -> JSON):

```
    {
        "name": "Jan",
        "age": 20
    }
```