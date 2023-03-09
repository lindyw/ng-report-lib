
type PSA = 'cwm' | 'datto' | 'halo';

interface TicketCount {
    psa: PSA,
    created: number
    resolved: number
    all_time_opening: number
}
export const ticket_counts: TicketCount[] = [
    { psa: 'cwm', created: 3, resolved: 2, all_time_opening: 24 }
]
