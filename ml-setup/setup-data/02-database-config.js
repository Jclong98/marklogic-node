export default {
    "triple-index": true,
    "uri-lexicon": true,
    "collection-lexicon": true,
    "range-element-index": [
        {
            "scalar-type": "int",
            "namespace-uri": "",
            "localname": "id",
            "collation": "http://marklogic.com/collation/",
            "range-value-positions": false,
            "invalid-values": "reject"
        },
        {
            "scalar-type": "string",
            "namespace-uri": "",
            "localname": "first_name",
            "collation": "http://marklogic.com/collation/",
            "range-value-positions": true,
            "invalid-values": "reject"
        },
        {
            "scalar-type": "string",
            "namespace-uri": "",
            "localname": "last_name",
            "collation": "http://marklogic.com/collation/",
            "range-value-positions": true,
            "invalid-values": "reject"
        }
    ]
}