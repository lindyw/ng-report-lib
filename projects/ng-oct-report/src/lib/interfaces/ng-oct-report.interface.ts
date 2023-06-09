// incoming raw data interface
export interface CombinedDeviation {
    id: string,
    tenant_id: string,
    category: string | null,
    type: 'group' | 'tenant' | null,
    baseline_id: string,
    name: string,
    group_name: string | null,
    user_id: string | null,
    deviation_detect_time: string,
    deviation_resolve_time: string | null,
    baseline_created: string,
}

// formatted data interface
export interface Header {
    date: {
        start: string
        end: string
    },
    tenant: string
    icon?: string
}

export type SourceType = 'microsoft-event' | 'sway-deviation';
export interface TopAlert {
    source_type: SourceType
    severity: Severity
    timestamp: string
    actor: string | null
    description: string
    country?: string
}
export interface Baseline {
    id: string
    spec_id: string
    tenant_id: string
    group_id?: string | null
    user_id?: string | null
    template_item_id?: string | null
    created: string
    type: string
    schema: any
}

export interface BaselinePostureCountsByDate {
    [date: string]: {
        deviating: number;
        compliant: number | null;
        monitored: number | null;
    }
}


export interface CurrentPostureCount {
    not_deviated: number | null
    has_deviated: number
}

export interface TopBaselineDeviation {
    severity: Severity
    timestamp: string
    category: string
    name: string
}

export type PSA = 'cwm' | 'datto' | 'halo';

export enum PSA_Name {
    cwm = 'ConnectWise',
    datto = 'Datto',
    halo = 'Halo'
}
export interface TicketCount {
    psa: PSA,
    created: number
    resolved: number
    all_time_opening: number
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

export interface BaselineDeviation {
    category: string | null
    type: 'group' | 'tenant' | null
    name: string
    baseline_id?: string
    group_name?: string,
    user_id?: string,
    user_name?: string,
    timelineElements: TimelineElement[]
}

export interface GroupBaselineDeviation {
    [b_name: string]: {
        [g_name: string]: {
            [user_name: string]: BaselineDeviation[];
        };
    };
}

export interface Category {
    category: string
    type: 'group' | 'tenant'
    name: string
}

type Severity = 'critical' | 'danger' | 'warning';

export interface TimelineElement {
    status: 'created' | 'deviation' | 'remediated'
    date: Date
}