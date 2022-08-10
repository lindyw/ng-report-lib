export interface Header {
    date: {
        start: string
        end: string
    },
    tenant: string
}

export interface TopAlert {
    severity: Severity
    timestamp: string
    actor: string
    description: string
}

export interface TopBaseline {
    severity: Severity
    timestamp: string
    catagory: string
    name: string
}  

type Severity = 'critical' | 'danger' | 'warning';

export interface TimelineElement {
    status:'created' | 'deviation' | 'remediated'
    date: Date
}