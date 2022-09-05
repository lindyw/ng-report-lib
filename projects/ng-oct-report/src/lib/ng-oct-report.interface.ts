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
    actor: string | null
    description: string
}

export interface TopBaseline {
    severity: Severity
    timestamp: string
    category: string
    name: string
}

export interface TopUser {
    actor: string,
    alerts: TopAlert[]
    counts?: {
        critical: number
        danger: number
        warning: number
        info: number
    }
}

export interface Baseline {
    category: string
    name: string
    timelineElements: TimelineElement[]
}

export interface Category {
    category: string
    name: string
}

type Severity = 'critical' | 'danger' | 'warning';

export interface TimelineElement {
    status: 'created' | 'deviation' | 'remediated'
    date: Date
}