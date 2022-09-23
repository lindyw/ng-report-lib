export const baselines = [
    {
        "id": "6d7b0089-665d-4834-8d7b-8a2598168561",
        "spec_id": "bb8bc954-f2b7-47cd-a573-c32ff070c765",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:57:25.581Z",
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
        "id": "870b659a-9aaa-4b2d-ae8a-c82a77aa34fe",
        "spec_id": "28b6a57f-6354-4af9-9049-35b5c68dba63",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "b1e89870-36b5-4b2d-906e-728edc61bf14",
        "spec_id": "610ddde4-3425-4422-891c-f1f5c2138c42",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:57:25.824Z",
        "schema": {
            "type": "object",
            "properties": {
                "OutlookMobileEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "cb71f89b-647b-4999-ba06-81c449890fef",
        "spec_id": "14381c7b-d7c4-477b-80df-a8d4224817f5",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:57:25.902Z",
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
        "id": "9b1f668f-f5b5-474c-88aa-9cc2e7a721c5",
        "spec_id": "0fe85f1d-9f97-4c32-9dcc-f193157aaff7",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:57:26.043Z",
        "schema": {
            "type": "object",
            "properties": {
                "SmtpClientAuthenticationDisabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "40698706-b2d5-4eaf-b59a-dcbf7289f398",
        "spec_id": "0fe85f1d-9f97-4c32-9dcc-f193157aaff7",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "87fc5b57-9e70-41ad-b942-5a395f789f71",
        "user_id": null,
        "type": "group",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "properties": {
                "SmtpClientAuthenticationDisabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "541fa8a8-1a7b-4380-8e97-9388f997640d",
        "spec_id": "1b19da18-38e2-44d0-b8e1-8df244835afa",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "UnifiedAuditLogIngestionEnabled"
            ],
            "properties": {
                "UnifiedAuditLogIngestionEnabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "dc171364-9665-4606-83c2-05a532ef64f1",
        "spec_id": "99709d24-c28d-42dc-b38c-9016627ab920",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "338e28f8-ea22-4ab9-801c-3a114ced68fd",
        "spec_id": "48a52db1-d1cd-4808-9e5b-741722b95af4",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "PreventExternalUsersFromResharing"
            ],
            "properties": {
                "PreventExternalUsersFromResharing": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "230785da-ee6d-4b6f-b311-ff70a92d15f0",
        "spec_id": "5ffd683c-5701-4929-8af0-f9f8166c7f4d",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "properties": {
                "isEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "ee84390c-094d-47a1-9c31-70f4f4839a37",
        "spec_id": "c220cb19-5a1f-4ca6-98be-a6daa2081dd9",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "not": {
                "contains": {
                    "type": "object",
                    "properties": {
                        "displayName": {
                            "type": "string",
                            "const": "Enforce MFA for Admins (Octiga Conditional Access)"
                        }
                    }
                }
            },
            "type": "array"
        }
    },
    {
        "id": "7aa01d45-669d-42f7-b899-ae59ee1f8bca",
        "spec_id": "5c0d913b-cb63-4838-bb6c-f9d3ac8871e4",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [],
            "properties": {
                "AutoForwardEnabled": {
                    "type": "boolean"
                }
            }
        }
    },
    {
        "id": "edd2989f-60f2-41ac-9f8e-b5f5c014ab6f",
        "spec_id": "610ddde4-3425-4422-891c-f1f5c2138c42",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "71ec9ebd-d96c-4e16-aea1-b3cbd52e353c",
        "user_id": null,
        "type": "group",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "properties": {
                "OutlookMobileEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "eaef40a7-3148-44d1-adfc-cab6101db2d4",
        "spec_id": "8338c8f2-7ec4-4cc0-a2ed-788531bb60e4",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "0ea6cdad-6c41-415c-a499-df456d5861ae",
        "spec_id": "1a2aa687-70ce-420f-b412-9fe814eaa6db",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "c580e080-b234-4b97-a4e8-3e4348e487f9",
        "spec_id": "6e8ae2a7-d346-4d05-8cbd-2d38c2dc413b",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "273c5eca-8e27-4dbf-99a9-40978dd26dbe",
        "spec_id": "324ee0d2-9d5b-41d1-9387-2cb447c56ccc",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "RequireAnonymousLinksExpireInDays"
            ],
            "properties": {
                "RequireAnonymousLinksExpireInDays": {
                    "type": "number",
                    "const": 150
                }
            }
        }
    },
    {
        "id": "cee8fa5d-3b24-44c6-9923-9811a44dfd73",
        "spec_id": "0fe85f1d-9f97-4c32-9dcc-f193157aaff7",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "2f05c140-3961-4a96-8c7a-813157b399d1",
        "user_id": null,
        "type": "group",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "SmtpClientAuthenticationDisabled"
            ],
            "properties": {
                "SmtpClientAuthenticationDisabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "e3626af2-1153-4f07-a440-fe55949c04f6",
        "spec_id": "a0d417de-eabd-4851-bc45-288792100489",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:57:25.680Z",
        "schema": {
            "type": "object",
            "required": [
                "OWAEnabled"
            ],
            "properties": {
                "OWAEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "f048b254-c4c4-4b23-afca-917b13afce7b",
        "spec_id": "990d6dd4-67a3-43b8-89e9-eef5e8c50d72",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
                        "type": "string",
                        "const": "robert.mcfeely@octiga.com"
                    },
                    "EnableInternalSenderAdminNotifications": {
                        "type": "boolean",
                        "const": false
                    }
                }
            }
        }
    },
    {
        "id": "428e2bd0-d067-4e54-9ae6-e82282ae4341",
        "spec_id": "6397180a-8d44-466e-ae54-998241b4d157",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "e307dc0c-9521-44ae-a5a9-7d64775a0800",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T15:13:42.837Z",
        "schema": {
            "type": "object",
            "properties": {
                "EwsEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "2a2e3070-ce1f-4d7d-a1f4-54d740398570",
        "spec_id": "e3e88cdd-688e-4df7-8f35-ac3b13f0c373",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "passwordValidityPeriodInDays": {
                        "type": "number",
                        "const": 90
                    },
                    "passwordNotificationWindowInDays": {
                        "type": "number",
                        "const": 90000
                    }
                }
            }
        }
    },
    {
        "id": "81c5a4ff-e20c-4ca3-9ef2-48422e92cb0b",
        "spec_id": "2b89c7ab-4812-4c2a-b023-913c2533d955",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "d109b5b4-24c6-4791-b400-3ea214188aa3",
        "spec_id": "62eb2fab-46d1-46e6-9b22-6b6341b42de0",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T15:14:39.531Z",
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
        "id": "c167fd6f-db43-4d2b-85c9-eeba8764c627",
        "spec_id": "535f0c58-517f-4b4b-9379-8012bfe8c900",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "2f05c140-3961-4a96-8c7a-813157b399d1",
        "user_id": null,
        "type": "group",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "PopEnabled"
            ],
            "properties": {
                "PopEnabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "a1e3472b-7568-472c-bb5b-06540cb3f04a",
        "spec_id": "0fe85f1d-9f97-4c32-9dcc-f193157aaff7",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "71ec9ebd-d96c-4e16-aea1-b3cbd52e353c",
        "user_id": null,
        "type": "group",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "SmtpClientAuthenticationDisabled"
            ],
            "properties": {
                "SmtpClientAuthenticationDisabled": {
                    "type": "boolean",
                    "const": false
                }
            }
        }
    },
    {
        "id": "c7a485d3-aadd-4fdb-a5c9-ff234cdcb743",
        "spec_id": "0fe85f1d-9f97-4c32-9dcc-f193157aaff7",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "1ddeea54-6868-487d-aed7-b1d0b278a733",
        "user_id": null,
        "type": "group",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "object",
            "required": [
                "SmtpClientAuthenticationDisabled"
            ],
            "properties": {
                "SmtpClientAuthenticationDisabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    },
    {
        "id": "7b5bef3e-0b41-4690-ac6d-22d49433f720",
        "spec_id": "d5cb6d6c-95cb-41b0-99ec-fa594edc3e7a",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
                        "const": false
                    }
                }
            }
        }
    },
    {
        "id": "8880cf25-6e78-4535-85c1-ff15d877ce53",
        "spec_id": "c29c3a82-158f-45d8-a5dd-f2d8d8510126",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
        "schema": {
            "type": "array",
            "contains": {
                "type": "object",
                "required": [
                    "Identity",
                    "PasswordHistory",
                    "PasswordExpiration",
                    "MinPasswordComplexCharacters",
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
                        "const": 1
                    },
                    "PasswordExpiration": {
                        "type": "string",
                        "const": "Unlimited"
                    },
                    "AllowSimplePassword": {
                        "type": "boolean",
                        "const": true
                    },
                    "MaxInactivityTimeLock": {
                        "type": "string",
                        "const": "Unlimited"
                    },
                    "DeviceEncryptionEnabled": {
                        "type": "boolean",
                        "const": false
                    },
                    "RequireDeviceEncryption": {
                        "type": "boolean",
                        "const": false
                    },
                    "AlphanumericPasswordRequired": {
                        "type": "boolean",
                        "const": false
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
        "id": "442021c0-a2a4-4d67-bc38-d8871042a3d4",
        "spec_id": "331bff98-70b9-4a8c-95c0-5caf686f5f5a",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-08-03T10:39:29.355Z",
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
        "id": "6acdf59a-d948-4d6a-90a4-a235ab56e56c",
        "spec_id": "535f0c58-517f-4b4b-9379-8012bfe8c900",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:56:07.260Z",
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
        "id": "7ecb5515-17d8-49ef-85f8-e73f32827c39",
        "spec_id": "5c07efa8-6bee-4fd9-8389-1e540dee3508",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": null,
        "user_id": null,
        "type": "tenant",
        "created": "2022-09-08T14:56:07.062Z",
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
        "id": "9486f190-aab1-4bb4-9cb7-1ea94cc0f7e0",
        "spec_id": "6397180a-8d44-466e-ae54-998241b4d157",
        "tenant_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "template_item_id": null,
        "group_id": "b7453564-2f58-4ad6-b7ba-c6e35e8de6bb",
        "user_id": null,
        "type": "group",
        "created": "2022-09-08T14:56:07.140Z",
        "schema": {
            "type": "object",
            "properties": {
                "EwsEnabled": {
                    "type": "boolean",
                    "const": true
                }
            }
        }
    }
]