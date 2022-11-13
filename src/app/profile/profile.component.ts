import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {NoteService} from "../_services/note.service";
import {MatDialog} from "@angular/material/dialog";
import {EditNoteComponent} from "../edit-note/edit-note.component";
import {AddEditorComponent} from "../add-editor/add-editor.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  notes: any[] = [];

  constructor(private token: TokenStorageService, private noteService: NoteService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.noteService.getNotes().subscribe({
      next: data => {
        console.log(data);
        this.notes = data;
      }
    })
  }

  deleteNote(id: number, index: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: data => {
        console.log(data);
        delete this.notes[index];
      },
      error: err => {
        console.log(err)
      }
    });
  }

  openEditNote(id: number, index: number): void {
    const dialogRef =  this.matDialog.open(EditNoteComponent, {
      width: '250px',
      data: this.notes[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edited note: ");
      if (result) {
        this.noteService.updateNote(result).subscribe({
          next: res => {
            this.notes[index] = res
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  openCreateNewNote(): void {
    const dialogRef = this.matDialog.open(EditNoteComponent, {
      width: '250px',
      data: {name: null, content: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("New note")
      if (result) {
        this.noteService.createNote(result).subscribe({
          next: newNote => {
            this.notes.push(newNote)
          },
          error: err => {
            console.log(err);
          }
        })
      }
    })
  }

  openAddEditorDialog(id: number, index: number) {
    const dialogRef = this.matDialog.open(AddEditorComponent, {
      width: '250px',
      data: {name: this.notes[index], editor: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteService.addEditor(id, result).subscribe({
          next: response => {
            console.log(response);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

}
