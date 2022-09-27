export const baselines = [
    {
        "id": "6f6bb139-7b8d-40d7-a2a8-683e7d83fdd5",
        "spec_id": "05d81169-c437-495b-955d-2905a3e608af",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "RecipientLimitPerDay",
                    "RecipientLimitInternalPerHour",
                    "NotifyOutboundSpam",
                    "BccSuspiciousOutboundMail",
                    "Identity",
                    "RecipientLimitExternalPerHour",
                    "ActionWhenThresholdReached"
                ],
                "properties": {
                    "Identity": {
                        "type": "string",
                        "const": "Default"
                    },
                    "NotifyOutboundSpam": {
                        "type": "boolean",
                        "const": true
                    },
                    "RecipientLimitPerDay": {
                        "type": "number",
                        "const": 0
                    },
                    "BccSuspiciousOutboundMail": {
                        "type": "boolean",
                        "const": true
                    },
                    "ActionWhenThresholdReached": {
                        "type": "string",
                        "const": "BlockUserForToday"
                    },
                    "NotifyOutboundSpamRecipients": {
                        "type": "array",
                        "items": {
                            "enum": [
                                "robert.mcfeely@octiga.com"
                            ],
                            "type": "string"
                        },
                        "maxItems": 1,
                        "minItems": 1,
                        "uniqueItems": true
                    },
                    "RecipientLimitExternalPerHour": {
                        "type": "number",
                        "const": 0
                    },
                    "RecipientLimitInternalPerHour": {
                        "type": "number",
                        "const": 0
                    },
                    "BccSuspiciousOutboundAdditionalRecipients": {
                        "type": "array",
                        "items": {
                            "enum": [
                                "robert.mcfeely@octiga.com"
                            ],
                            "type": "string"
                        },
                        "maxItems": 1,
                        "minItems": 1,
                        "uniqueItems": true
                    }
                }
            }
        }
    },
    {
        "id": "75a0243a-7a38-45ff-9d83-a2f43a13f693",
        "spec_id": "6c9f5fae-4343-47cf-a1fe-cdb6f6e58cf7",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "Enabled",
                    "IsDefault"
                ],
                "properties": {
                    "Enabled": {
                        "type": "boolean",
                        "const": true
                    },
                    "IsDefault": {
                        "type": "boolean",
                        "const": true
                    }
                }
            }
        }
    },
    {
        "id": "d1b1154e-5ff6-412e-a01d-4a0a56e059c4",
        "spec_id": "978c5244-2444-419f-b749-6d6ddd956ebc",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "PreventExternalUsersFromResharing": {
                    "type": "boolean"
                }
            }
        }
    },
    {
        "id": "6d451515-a726-40b3-8794-e7d81d940945",
        "spec_id": "c4a1e85d-dfbf-4b48-8e33-78068781cab2",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "LegacyAuthProtocolsEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "3612df49-9b87-41cb-bcbb-abdff0f54e3b",
        "spec_id": "b0c03f95-5ac9-440e-bcb0-45ad5913b72c",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "passwordValidityPeriodInDays": {
                        "type": "number",
                        "const": 2147483643
                    },
                    "passwordNotificationWindowInDays": {
                        "type": "number",
                        "const": null
                    }
                }
            }
        }
    },
    {
        "id": "fc0b193b-5976-4250-9d7c-4863fb71bf6c",
        "spec_id": "9fe92a75-bd3c-472a-8258-6ed9c86cf9a8",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "required": [
                "ActiveSyncEnabled"
            ],
            "properties": {
                "ActiveSyncEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "8996208e-5e2e-42f0-8eeb-f1f7e792f91c",
        "spec_id": "e4a6879f-509d-49c1-a682-33fb140e8a53",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "ImapEnabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "b501f2f8-9983-42bd-a944-236949181943",
        "spec_id": "dd9838a7-39e0-450f-ba96-fa91607d8afc",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "PopEnabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "4ec9386e-fc46-4138-a71a-9a0aea60fe8f",
        "spec_id": "7f43d06f-0a19-496d-b138-2a4b66beb29b",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "MAPIEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "d096bcaa-efbb-49e7-9a2d-ace5b4840f31",
        "spec_id": "3912c8ed-87de-4b5b-8188-88971b3252df",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "EnableFileFilter",
                    "Identity"
                ],
                "properties": {
                    "Identity": {
                        "type": "string",
                        "const": "Default"
                    },
                    "EnableFileFilter": {
                        "type": "boolean",
                        "const": true
                    }
                }
            }
        }
    },
    {
        "id": "2b04a1c1-7c3b-4fdb-b1a7-6acfafbe72e4",
        "spec_id": "73d3f4b8-acf7-41c2-b3bb-a863b1df937f",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "SmtpClientAuthenticationDisabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "edbf8084-ca95-4c6b-8af6-439c0411062a",
        "spec_id": "65119903-a99d-4ccd-aac1-39e018e14514",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "Identity",
                    "PasswordHistory",
                    "PasswordExpiration",
                    "MinPasswordComplexCharacters",
                    "MinPasswordLength",
                    "MaxInactivityTimeLock",
                    "RequireDeviceEncryption",
                    "DeviceEncryptionEnabled",
                    "AlphanumericPasswordRequired",
                    "AllowSimplePassword",
                    "PasswordEnabled"
                ],
                "properties": {
                    "Identity": {
                        "type": "string",
                        "const": "Default"
                    },
                    "PasswordEnabled": {
                        "type": "boolean",
                        "const": false
                    },
                    "PasswordHistory": {
                        "type": "number",
                        "const": 5
                    },
                    "MinPasswordLength": {
                        "type": "number",
                        "const": 8
                    },
                    "PasswordExpiration": {
                        "type": "string",
                        "const": "Unlimited"
                    },
                    "AllowSimplePassword": {
                        "type": "boolean",
                        "const": false
                    },
                    "MaxInactivityTimeLock": {
                        "type": "string",
                        "const": "Unlimited"
                    },
                    "DeviceEncryptionEnabled": {
                        "type": "boolean",
                        "const": true
                    },
                    "RequireDeviceEncryption": {
                        "type": "boolean",
                        "const": true
                    },
                    "AlphanumericPasswordRequired": {
                        "type": "boolean",
                        "const": null
                    },
                    "MinPasswordComplexCharacters": {
                        "type": "number",
                        "const": 1
                    }
                }
            }
        }
    },
    {
        "id": "380484f4-ca13-45d4-ac70-a93f00f802b2",
        "spec_id": "9ca3f54b-6196-419c-9e29-32fc73aa6055",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "AutoForwardEnabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "787cd67e-51d4-45b8-a069-bf7902bf0407",
        "spec_id": "c16ff0ba-1665-490c-a0de-b2da9cc5172c",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "OAuth2ClientProfileEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "91d3316a-3fa8-4202-bb7d-61a76fae06d4",
        "spec_id": "a0139f7f-96f7-490b-85f9-621efbb161b2",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "EnableInternalSenderAdminNotifications",
                    "Identity"
                ],
                "properties": {
                    "Identity": {
                        "type": "string",
                        "const": "Default"
                    },
                    "InternalSenderAdminAddress": {
                        "type": "string"
                    },
                    "EnableInternalSenderAdminNotifications": {
                        "type": "boolean",
                        "const": true
                    }
                }
            }
        }
    },
    {
        "id": "7d5af9dc-114e-47a1-a64b-4b51f973500d",
        "spec_id": "ceff7d33-8f29-40fa-bac6-00695450fbb6",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "EnableFirstContactSafetyTips",
                    "AuthenticationFailAction",
                    "SpoofQuarantineTag",
                    "EnableSpoofIntelligence",
                    "EnableViaTag",
                    "EnableUnauthenticatedSender",
                    "Identity",
                    "IsDefault"
                ],
                "properties": {
                    "Identity": {
                        "type": "string",
                        "const": "Office365 AntiPhish Default"
                    },
                    "IsDefault": {
                        "type": "boolean",
                        "const": true
                    },
                    "EnableViaTag": {
                        "type": "boolean",
                        "const": true
                    },
                    "SpoofQuarantineTag": {
                        "type": "string",
                        "const": "AdminOnlyAccessPolicy"
                    },
                    "EnableSpoofIntelligence": {
                        "type": "boolean",
                        "const": true
                    },
                    "AuthenticationFailAction": {
                        "type": "string",
                        "const": "Quarantine"
                    },
                    "EnableUnauthenticatedSender": {
                        "type": "boolean",
                        "const": true
                    },
                    "EnableFirstContactSafetyTips": {
                        "type": "boolean",
                        "const": true
                    }
                }
            }
        }
    },
    {
        "id": "43b34770-1fcd-44c2-b133-d21a5174b073",
        "spec_id": "392d0705-435a-4ab5-bf42-db5592c25e84",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "grantControls",
                    "displayName",
                    "conditions",
                    "state"
                ],
                "properties": {
                    "state": {
                        "type": "string",
                        "const": "enabled"
                    },
                    "conditions": {
                        "type": "object",
                        "required": [
                            "clientAppTypes",
                            "users"
                        ],
                        "properties": {
                            "users": {
                                "type": "object",
                                "properties": {
                                    "IncludeUsers": {
                                        "type": "string",
                                        "const": "all"
                                    },
                                    "excludeUsers": {
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "20f2fa48-82ca-4092-8856-3612b84cf1cb",
                                                "2264a497-a54f-45b6-bdc0-05460f431760",
                                                "b7420cab-adfb-46aa-b46a-2db98a90c800",
                                                "7cad160d-688b-446d-9244-0b3a7800418a",
                                                "b86b7c18-eff7-4ce2-a4b9-0c3968a01573"
                                            ],
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "clientAppTypes": {
                                "type": "array",
                                "items": {
                                    "enum": [
                                        "exchangeActiveSync",
                                        "other"
                                    ]
                                }
                            }
                        }
                    },
                    "displayName": {
                        "type": "string",
                        "const": "Octiga Generated Disable Legacy Auth"
                    },
                    "grantControls": {
                        "type": "object",
                        "properties": {
                            "operator": {
                                "type": "string",
                                "const": "OR"
                            },
                            "builtInControls": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "const": "block"
                                },
                                "maxItems": 1
                            }
                        }
                    }
                }
            }
        }
    },
    {
        "id": "a575130d-a76a-4caf-b73d-92105e26d93f",
        "spec_id": "a39eefd6-c1fe-4d0b-bae2-159c49b8a6e8",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "required": [
                "OWAEnabled"
            ],
            "properties": {
                "OWAEnabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "4551eae0-8db2-466d-bf39-0fdee99dd462",
        "spec_id": "050dbb48-a902-41b7-997a-a8cffe60a5d6",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "required": [
                "OutlookMobileEnabled"
            ],
            "properties": {
                "OutlookMobileEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "cc5e8705-2524-4fb4-bf5a-9832ea96062b",
        "spec_id": "fdfc368d-e099-4590-a70d-666632baacd3",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "required": [
                "EwsEnabled"
            ],
            "properties": {
                "EwsEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "cf05097a-e019-4e50-ba24-e697b7a4ff47",
        "spec_id": "6a1b077c-c9b9-49fb-b4a4-69761166f86d",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "required": [
                "RequireAnonymousLinksExpireInDays"
            ],
            "properties": {
                "RequireAnonymousLinksExpireInDays": {
                    "type": "number",
                    "const": 149
                }
            }
        }
    },
    {
        "id": "02a3a52e-15c2-4da2-9a70-2e428284a1a9",
        "spec_id": "05cda756-320a-44bd-8d33-c5ded363cb18",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "AuditDisabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "46a1c791-9356-4c9d-a787-08725b9c9536",
        "spec_id": "01432b84-8f98-4670-b167-13e492634761",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-27T08:05:12.480Z",
        "schema": {
            "type": "object",
            "properties": {
                "UnifiedAuditLogIngestionEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    }
]