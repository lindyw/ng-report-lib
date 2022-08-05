export interface Header {
    date: {
        start: string
        end: string
    },
    tenant: string
}

export interface TopAlert {
    severity: Severity
    timestamp?: string
    user?: string
    description: string

}

type Severity = 'critical' | 'danger' | 'warning';