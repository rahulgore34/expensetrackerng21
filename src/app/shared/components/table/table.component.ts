import { Component, input } from '@angular/core';

export interface TableColumn {
  key: string;
  header: string;
}

export type TableCellValue = string | number | boolean | null | undefined;
export type TableRow = object;

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  readonly columns = input.required<readonly TableColumn[]>();
  readonly rows = input.required<readonly TableRow[]>();

  trackByColumn(index: number, column: TableColumn): string {
    return `${column.key}-${index}`;
  }

  trackByRow(index: number): number {
    return index;
  }

  getCellValue(row: TableRow, key: string): TableCellValue {
    return (row as Record<string, TableCellValue>)[key];
  }
}
