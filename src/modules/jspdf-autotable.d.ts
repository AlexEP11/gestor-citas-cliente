// src/@types/jspdf-autotable.d.ts
import { jsPDF } from "jspdf";

declare module "jspdf-autotable" {
    interface AutoTableOptions {
        head?: any[][];
        body?: any[][];
        startY?: number;
        styles?: any;
        headStyles?: any;
        margin?: { top?: number; left?: number; right?: number; bottom?: number };
        // Puedes agregar más propiedades según sea necesario
    }

    export function autoTable(doc: jsPDF, options: AutoTableOptions): void;
}
