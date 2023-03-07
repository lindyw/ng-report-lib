
type PSA = 'cwm' | 'datto' | 'halo';

interface TicketCount {
    psa: PSA,
    opened: number
    resolved: number
}
export const ticket_counts: TicketCount[] = [
    { psa: 'cwm', opened: 3, resolved: 2 },
    { psa: 'datto', opened: 0, resolved: 4 }
]
