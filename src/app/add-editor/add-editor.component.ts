import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-editor',
  templateUrl: './add-editor.component.html',
  styleUrls: ['./add-editor.component.css']
})
export class AddEditorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
