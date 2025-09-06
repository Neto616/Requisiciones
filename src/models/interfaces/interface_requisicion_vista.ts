export interface IRequisicionVista {
    newView(user_id: number, requisicion_id: string): Promise<void>;
    isUserSeeRequisicion(user_id: number, requisicion_id: string): Promise<boolean>;
}