/**
 * Zustandsobjekt des Kontaktformulars.
 *
 * Liegt bewusst NICHT in der Datei mit "use server": ein Server-Actions-Modul
 * darf ausschließlich asynchrone Funktionen exportieren. Ein Konstanten-Export
 * von dort kommt im Client als undefined an, und das Formular stirbt beim
 * ersten Rendern.
 */
export type EnquiryState = {
  status: "idle" | "ok" | "error";
  message: string;
  /** Feldname zu Fehlermeldung. Wird unter dem jeweiligen Feld ausgegeben. */
  fieldErrors: Record<string, string>;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
