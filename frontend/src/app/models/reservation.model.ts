export interface Reservation {
    name: string;
    email: string;
    date: string;
    time: string;
    people: number;
    message: string;
}  

export interface ReservationResponse {
    success: boolean;
    data: Reservation[];
}